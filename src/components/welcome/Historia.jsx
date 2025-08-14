import { useState, useEffect } from 'react';

export function Historia() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timeline = [
    {
      year: "2022",
      title: "El Comienzo",
      description: "Carlos y Juan se conocieron durante la nivelación. Al ser de la misma carrera, empezaron a conversar y forjar una amistad.",
      icon: "bi-people",
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2022",
      title: "Primeras Colaboraciones",
      description: "Carlos comparte clase con Mateo. En una de las materias se sugirió hacer grupos y les tocó trabajar juntos.",
      icon: "bi-lightbulb",
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2022-2023",
      title: "Expansión del Equipo",
      description: "Juan conoció a Marcos a través de un proyecto en Fundamentos de la Programación. Mateo también formó grupo con Marcos en Fundamentos de Ingeniería de Software.",
      icon: "bi-diagram-3",
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2023-2024",
      title: "Consolidación",
      description: "El grupo se consolidó y reforzó su vínculo teniendo las mismas clases desde 3er Semestre, trabajando juntos en múltiples proyectos.",
      icon: "bi-award",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className={`historia-container ${isVisible ? 'visible' : ''}`}>
      <div className="historia-header">
        <h2 className="historia-title">Nuestra Historia</h2>
        <p className="historia-subtitle">
          El camino que nos llevó a convertirnos en un equipo sólido
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {timeline.map((step, index) => (
          <div
            key={index}
            className={`timeline-item ${currentStep >= index ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.3}s` }}
            onMouseEnter={() => setCurrentStep(index)}
          >
            <div className="timeline-marker">
              <div className={`timeline-icon bg-gradient-to-br ${step.color}`}>
                <i className={`bi ${step.icon}`}></i>
              </div>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-card">
                <div className="timeline-year">{step.year}</div>
                <h3 className="timeline-step-title">{step.title}</h3>
                <p className="timeline-description">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="historia-footer">
        <div className="footer-card">
          <div className="footer-icon">
            <i className="bi bi-rocket-takeoff"></i>
          </div>
          <div className="footer-content">
            <h3>El Presente</h3>
            <p>
              Hoy somos un equipo consolidado, trabajando juntos en proyectos innovadores 
              como esta aplicación blockchain, aplicando todo lo aprendido en nuestro camino académico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}