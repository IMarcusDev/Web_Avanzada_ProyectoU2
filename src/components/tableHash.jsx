import { useState, useEffect } from "react";
import { Hash } from "./chain";
import '../styles/chain.css';

const first_seed = 'ESPE';

export function HashTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showStats, setShowStats] = useState(false);
  const [hashChain, setHashChain] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data'))?.rows || [];
    setData(storedData);
    setFilteredData(storedData);
    generateHashChain(storedData);
  }, []);

  const generateHashChain = (dataArray) => {
    let currentSeed = first_seed;
    const chain = [];
    
    dataArray.forEach((element, index) => {
      const hashData = {
        ...element,
        index,
        previousHash: currentSeed,
        hash: generateHashForChain(element.text, currentSeed, element.time)
      };
      
      chain.push(hashData);
      currentSeed = hashData.hash;
    });
    
    setHashChain(chain);
    
    localStorage.setItem('hashes', JSON.stringify(chain.map(h => ({ id: h.index, hash: h.hash }))));
  };

  const generateHashForChain = (chain, seed, time) => {
    const data = chain + seed + time;
    return btoa(data).replace(/[^a-zA-Z0-9]/g, '').substring(0, 64).toLowerCase();
  };

  useEffect(() => {
    let filtered = hashChain.filter(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = sortBy === 'time' ? parseInt(a.time) : a.text;
      const bVal = sortBy === 'time' ? parseInt(b.time) : b.text;
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [hashChain, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearAllData = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las cadenas?')) {
      localStorage.removeItem('data');
      localStorage.removeItem('hashes');
      setData([]);
      setFilteredData([]);
      setHashChain([]);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blockchain_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const addRandomData = () => {
    const randomTexts = [
      'Transacción aleatoria', 'Nuevo bloque', 'Datos de prueba', 
      'Operación blockchain', 'Hash generado', 'Bloque validado'
    ];
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    const newTime = Date.now().toString();
    
    const currentData = JSON.parse(localStorage.getItem('data')) || { rows: [] };
    currentData.rows.push({ text: randomText, time: newTime });
    localStorage.setItem('data', JSON.stringify(currentData));
    
    setData(currentData.rows);
    generateHashChain(currentData.rows);
  };

  const stats = {
    total: filteredData.length,
    avgTime: filteredData.length > 0 
      ? (filteredData.reduce((sum, item) => sum + parseInt(item.time), 0) / filteredData.length).toFixed(0)
      : 0,
    oldestTime: filteredData.length > 0 
      ? Math.min(...filteredData.map(item => parseInt(item.time)))
      : 0,
    newestTime: filteredData.length > 0 
      ? Math.max(...filteredData.map(item => parseInt(item.time)))
      : 0
  };

  return (
    <div className="hash-container">
      <div className="hash-header">
        <h3 className="display-3">Listado de Cadenas Generadas</h3>
        <div className="hash-toolbar">
          <div className="search-container">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Buscar cadenas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="toolbar-buttons">
            <button 
              onClick={() => setShowStats(!showStats)}
              className="btn btn-info"
              title="Ver estadísticas"
            >
              <i className="bi bi-graph-up"></i>
            </button>
            <button 
              onClick={addRandomData}
              className="btn btn-success"
              title="Agregar datos aleatorios"
            >
              <i className="bi bi-plus-lg"></i>
            </button>
            <button 
              onClick={exportData}
              className="btn btn-primary"
              title="Exportar datos"
            >
              <i className="bi bi-download"></i>
            </button>
            <button 
              onClick={clearAllData}
              className="btn btn-danger"
              title="Limpiar todo"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      {showStats && (
        <div className="stats-panel">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-link-45deg"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Cadenas</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-clock"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.avgTime}</div>
                <div className="stat-label">Tiempo Promedio</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {stats.oldestTime ? new Date(parseInt(stats.oldestTime)).toLocaleDateString() : 'N/A'}
                </div>
                <div className="stat-label">Más Antigua</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-calendar-plus"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {stats.newestTime ? new Date(parseInt(stats.newestTime)).toLocaleDateString() : 'N/A'}
                </div>
                <div className="stat-label">Más Reciente</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-light">
            <tr>
              <th 
                onClick={() => handleSort('text')}
                className="sortable-header"
              >
                Cadena 
                <i className={`bi bi-arrow-${sortBy === 'text' ? (sortOrder === 'asc' ? 'up' : 'down') : 'up-down'}`}></i>
              </th>
              <th>Semilla</th>
              <th 
                onClick={() => handleSort('time')}
                className="sortable-header"
              >
                Tiempo 
                <i className={`bi bi-arrow-${sortBy === 'time' ? (sortOrder === 'asc' ? 'up' : 'down') : 'up-down'}`}></i>
              </th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {console.log(filteredData)}
            {filteredData.length > 0 ? (
              filteredData.map((element, i) => (
                <tr key={`chain-${element.index || i}`}>
                  <td className="chain-text">{element.text}</td>
                  <td className="seed-text">{element.previousHash}</td>
                  <td className="time-text">{element.time}</td>
                  <td className="hash-text">{element.hash}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  <div className="no-data-content">
                    <i className="bi bi-inbox"></i>
                    <p>No hay cadenas para mostrar</p>
                    <button onClick={addRandomData} className="btn btn-outline-primary btn-sm">
                      Agregar datos de ejemplo
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="hash-footer">
          <div className="results-info">
            Mostrando {filteredData.length} de {data.length} resultados
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      )}
    </div>
  );
}