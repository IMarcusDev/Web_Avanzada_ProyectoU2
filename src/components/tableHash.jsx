// src/components/tableHash.jsx
import { useState, useEffect } from "react";
import { blockchainService } from "../services/blockchainService";
import '../styles/chain.css';

export function HashTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    try {
      setLoading(true);
      const response = await blockchainService.getBlockchain();
      
      // Los datos ya vienen en el formato correcto desde tu API
      const blockchainData = response.chain || [];
      
      setData(blockchainData);
      setFilteredData(blockchainData);
      setError('');
    } catch (error) {
      console.error('Error loading blockchain:', error);
      setError('Error al cargar la blockchain. Verifique que el servidor esté funcionando.');
      
      // Fallback a datos locales si existen
      const localData = JSON.parse(localStorage.getItem('data'))?.rows || [];
      if (localData.length > 0) {
        setData(localData);
        setFilteredData(localData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = data.filter(item => 
      (item.data && item.data.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.hash && item.hash.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aVal, bVal;
      
      if (sortBy === 'timestamp') {
        aVal = a.timestamp || 0;
        bVal = b.timestamp || 0;
      } else if (sortBy === 'data') {
        aVal = a.data || '';
        bVal = b.data || '';
      } else {
        aVal = a[sortBy] || '';
        bVal = b[sortBy] || '';
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearAllData = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las cadenas?')) {
      try {
        // Limpiar datos locales
        localStorage.removeItem('data');
        localStorage.removeItem('hashes');
        
        // Recargar desde la API
        await loadBlockchain();
      } catch (error) {
        console.error('Error clearing data:', error);
      }
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

  const addRandomData = async () => {
    try {
      const randomTexts = [
        'Transacción aleatoria', 'Nuevo bloque', 'Datos de prueba', 
        'Operación blockchain', 'Hash generado', 'Bloque validado'
      ];
      const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
      
      const response = await blockchainService.createTextBlock(randomText);
      
      if (response.success) {
        await loadBlockchain(); // Recargar la blockchain
      } else {
        setError('Error al agregar datos aleatorios: ' + response.error);
      }
    } catch (error) {
      console.error('Error adding random data:', error);
      setError('Error al agregar datos aleatorios');
    }
  };

  const getStats = () => {
    if (filteredData.length === 0) return { total: 0, avgTime: 0, oldestTime: 0, newestTime: 0 };
    
    const timestamps = filteredData.map(item => item.timestamp).filter(t => t);
    
    return {
      total: filteredData.length,
      avgTime: timestamps.length > 0 
        ? (timestamps.reduce((sum, t) => sum + t, 0) / timestamps.length).toFixed(0)
        : 0,
      oldestTime: timestamps.length > 0 ? Math.min(...timestamps) : 0,
      newestTime: timestamps.length > 0 ? Math.max(...timestamps) : 0
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="hash-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loading-spinner" style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Cargando blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hash-container">
      <div className="hash-header">
        <h3 className="display-3">Listado de Cadenas Generadas</h3>
        
        {error && (
          <div className="error-banner" style={{
            backgroundColor: 'rgba(245, 87, 108, 0.1)',
            border: '1px solid rgba(245, 87, 108, 0.3)',
            color: '#721c24',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
            <button 
              onClick={loadBlockchain}
              style={{
                marginLeft: '1rem',
                padding: '0.25rem 0.75rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        )}
        
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
            <button 
              onClick={loadBlockchain}
              className="btn btn-info"
              title="Recargar"
            >
              <i className="bi bi-arrow-clockwise"></i>
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
                <div className="stat-label">Total Bloques</div>
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
                  {stats.oldestTime ? new Date(stats.oldestTime).toLocaleDateString() : 'N/A'}
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
                  {stats.newestTime ? new Date(stats.newestTime).toLocaleDateString() : 'N/A'}
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
                onClick={() => handleSort('data')}
                className="sortable-header"
              >
                Datos del Bloque
                <i className={`bi bi-arrow-${sortBy === 'data' ? (sortOrder === 'asc' ? 'up' : 'down') : 'up-down'}`}></i>
              </th>
              <th>Hash Anterior</th>
              <th 
                onClick={() => handleSort('timestamp')}
                className="sortable-header"
              >
                Timestamp
                <i className={`bi bi-arrow-${sortBy === 'timestamp' ? (sortOrder === 'asc' ? 'up' : 'down') : 'up-down'}`}></i>
              </th>
              <th>Hash del Bloque</th>
              <th>Nonce</th>
              <th>Índice</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((element, i) => (
                <tr key={`block-${element.index || i}`}>
                  <td className="chain-text">{element.data || 'Sin datos'}</td>
                  <td className="seed-text" title={element.previousHash}>
                    {element.previousHash ? 
                      `${element.previousHash.substring(0, 12)}...` : 
                      'N/A'
                    }
                  </td>
                  <td className="time-text">
                    {element.timestamp ? 
                      new Date(element.timestamp).toLocaleString() : 
                      'N/A'
                    }
                  </td>
                  <td className="hash-text" title={element.hash}>
                    {element.hash ? 
                      `${element.hash.substring(0, 12)}...${element.hash.substring(element.hash.length - 8)}` : 
                      'N/A'
                    }
                  </td>
                  <td className="nonce-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {element.nonce || 0}
                  </td>
                  <td className="index-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {element.index !== undefined ? element.index : i}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <i className="bi bi-inbox"></i>
                    <p>No hay bloques para mostrar</p>
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
            Mostrando {filteredData.length} de {data.length} bloques
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      )}
    </div>
  );
}