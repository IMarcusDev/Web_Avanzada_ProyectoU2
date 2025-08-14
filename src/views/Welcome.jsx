import { useState, useEffect } from 'react';
import '../styles/welcome.css';
import { Historia } from '../components/welcome/Historia';
import { Integrantes } from '../components/welcome/Integrantes';
import { TableEstudiantes } from '../components/welcome/TableEstudiantes';

export const Welcome = () => {
  const [activeSection, setActiveSection] = useState('team');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  const sections = [
    { id: 'team', label: 'Equipo', icon: 'bi-people' },
    { id: 'history', label: 'Historia', icon: 'bi-clock-history' },
    { id: 'data', label: 'Información', icon: 'bi-table' }
  ];

  return (
    <div className={`welcome-container ${isLoaded ? 'loaded' : ''}`}>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Bienvenido al Proyecto Blockchain</h1>
            <p className="hero-subtitle">
              Desarrollado por estudiantes de Ingeniería en Software - ESPE
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Integrantes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2024</span>
                <span className="stat-label">Año</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">U2</span>
                <span className="stat-label">Proyecto</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Blockchain</h3>
              <p>Tecnología Segura</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nav-section">
        <div className="nav-container">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <i className={`bi ${section.icon}`}></i>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </section>
      
      <section className="content-section">
        <div className="content-container">
          {activeSection === 'team' && <Integrantes />}
          {activeSection === 'history' && <Historia />}
          {activeSection === 'data' && <TableEstudiantes />}
        </div>
      </section>
    </div>
  );
};