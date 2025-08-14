import { useState } from 'react';

export function TableEstudiantes() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: "L00433566",
      name: "Diego Mateo",
      surname: "Sosa Flores",
      age: 20,
      location: "Alangasí",
      email: "mateo.sosa@espe.edu.ec",
      phone: "+593 99 123 4567",
      semester: "6to",
      gpa: 8.5,
      status: "active"
    },
    {
      id: "L00433732",
      name: "Marcos David",
      surname: "Escobar Vela",
      age: 20,
      location: "San Pedro de Taboada",
      email: "marcos.escobar@espe.edu.ec",
      phone: "+593 98 765 4321",
      semester: "6to",
      gpa: 8.8,
      status: "active"
    },
    {
      id: "L00433793",
      name: "Juan Carlos",
      surname: "Granda Arcos",
      age: 20,
      location: "Puente 9",
      email: "juan.granda@espe.edu.ec",
      phone: "+593 97 654 3210",
      semester: "6to",
      gpa: 9.0,
      status: "active"
    },
    {
      id: "L00080877",
      name: "Carlos Isaac",
      surname: "Ñato Caiza",
      age: 20,
      location: "Cuendina",
      email: "carlos.nato@espe.edu.ec",
      phone: "+593 96 543 2109",
      semester: "6to",
      gpa: 8.7,
      status: "active"
    }
  ];

  return (
    <div className="students-container">
      <div className="students-header">
        <h2 className="students-title">Información del Equipo</h2>
        <p className="students-subtitle">
          Datos académicos y de contacto de los miembros del proyecto
        </p>
      </div>

      <div className="students-controls">
        <div className="search-container">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar por nombre, ID o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="stats-summary">
          <div className="summary-item">
            <span className="summary-number">{students.length}</span>
            <span className="summary-label">Estudiantes</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(1)}
            </span>
            <span className="summary-label">Promedio GPA</span>
          </div>
        </div>
      </div>

      <div className="students-grid">
        {students.map((student, index) => (
          <div
            key={student.id}
            className="student-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="student-header">
              <div className="student-avatar">
                <span>{student.name.charAt(0)}{student.surname.charAt(0)}</span>
              </div>
              <div className="student-basic">
                <h3 className="student-name">{student.name} {student.surname}</h3>
                <p className="student-id">{student.id}</p>
              </div>
              <div className="student-status">
                <span className={`status-indicator ${student.status}`}></span>
              </div>
            </div>

            <div className="student-details">
              <div className="detail-row">
                <div className="detail-item">
                  <i className="bi bi-calendar3"></i>
                  <span>{student.age} años</span>
                </div>
                <div className="detail-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>{student.location}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <i className="bi bi-envelope"></i>
                  <span>{student.email}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <i className="bi bi-telephone"></i>
                  <span>{student.phone}</span>
                </div>
                <div className="detail-item">
                  <i className="bi bi-book"></i>
                  <span>{student.semester} Semestre</span>
                </div>
              </div>

              <div className="gpa-section">
                <div className="gpa-label">GPA Actual</div>
                <div className="gpa-value">{student.gpa}</div>
                <div className="gpa-bar">
                  <div 
                    className="gpa-fill" 
                    style={{ width: `${(student.gpa / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="student-actions">
              <button className="action-btn">
                <i className="bi bi-envelope"></i>
                Contactar
              </button>
              <button className="action-btn">
                <i className="bi bi-person-lines-fill"></i>
                Perfil
              </button>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="no-results">
          <i className="bi bi-search"></i>
          <p>No se encontraron estudiantes que coincidan con la búsqueda</p>
        </div>
      )}
    </div>
  );
}