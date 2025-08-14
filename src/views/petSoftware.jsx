import { useState, useEffect } from "react";
import petSoft from "../assets/images/mascota_carrera.png";
import { DescSoftware } from "../components/descSoftware";
import { LaborField } from "../components/laborField";
import { ProfessionalProfile } from "../components/ProfessionalProfile";
import "../styles/petSoftware.css";

export const PetSoftware = () => {
    const [activeSection, setActiveSection] = useState('mission');
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimateIn(true), 100);
    }, []);

    const sections = {
        mission: {
            title: "Misión",
            icon: "bi-target",
            content: "Formar académicos y profesionales de excelencia en el área de Ingeniería de Software; generar, aplicar y difundir el conocimiento y proponer e implementar alternativas de solución a problemas de interés público en sus zonas de influencia."
        },
        vision: {
            title: "Visión", 
            icon: "bi-eye",
            content: "Líder en la gestión del conocimiento y de la Tecnología en el área de Ingeniería de Software en el Sistema de Educación Superior, con reconocimiento Internacional y referente de práctica de valores éticos, cívicos y de servicio a la sociedad."
        },
        profile: {
            title: "Perfil Profesional",
            icon: "bi-person-check",
            content: "El Ingeniero de Software de la ESPE es un profesional capaz de diseñar, desarrollar y gestionar soluciones informáticas que aporten valor, empleando metodologías ágiles y tecnologías de vanguardia."
        },
        field: {
            title: "Campo Ocupacional",
            icon: "bi-briefcase",
            content: [
                "Desarrollo de software (frontend y backend)",
                "Arquitectura de software",
                "QA / Testing",
                "DevOps",
                "Gestión de proyectos TI",
                "Investigación y docencia"
            ]
        }
    };

    const stats = [
        { number: "15+", label: "Años de Experiencia", icon: "bi-calendar-check" },
        { number: "500+", label: "Graduados", icon: "bi-mortarboard" },
        { number: "95%", label: "Empleabilidad", icon: "bi-graph-up-arrow" },
        { number: "4.8/5", label: "Satisfacción", icon: "bi-star-fill" }
    ];

    return (
        <div className={`pet-software-container ${animateIn ? 'animate-in' : ''}`}>
            <section className="hero-section">
                <div className="hero-content">
                    <div className="mascot-container">
                        <div className="mascot-glow"></div>
                        <img src={petSoft} alt="Mascota de software" className="mascot-image"/>
                        <div className="mascot-particles">
                            <div className="particle"></div>
                            <div className="particle"></div>
                            <div className="particle"></div>
                            <div className="particle"></div>
                        </div>
                    </div>
                    <div className="hero-text">
                        <h1 className="hero-title">Ingeniería de Software</h1>
                        <p className="hero-subtitle">Universidad de las Fuerzas Armadas ESPE</p>
                        <div className="hero-badge">
                            <i className="bi bi-award"></i>
                            <span>Acreditada Internacionalmente</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="stat-icon">
                                <i className={`bi ${stat.icon}`}></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="nav-section">
                <div className="nav-tabs">
                    {Object.entries(sections).map(([key, section]) => (
                        <button
                            key={key}
                            className={`nav-tab ${activeSection === key ? 'active' : ''}`}
                            onClick={() => setActiveSection(key)}
                        >
                            <i className={`bi ${section.icon}`}></i>
                            <span>{section.title}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="content-container">
                    <div className="content-header">
                        <div className="content-icon">
                            <i className={`bi ${sections[activeSection].icon}`}></i>
                        </div>
                        <h2>{sections[activeSection].title}</h2>
                    </div>
                    
                    <div className="content-body">
                        {activeSection === 'field' ? (
                            <div className="field-list">
                                {sections[activeSection].content.map((item, index) => (
                                    <div key={index} className="field-item">
                                        <div className="field-bullet">
                                            <i className="bi bi-check2-circle"></i>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="content-text">{sections[activeSection].content}</p>
                        )}
                    </div>
                </div>
            </section>

            <section className="tech-section">
                <h3>Tecnologías y Herramientas</h3>
                <div className="tech-grid">
                    {[
                        { name: "React", icon: "⚛️", color: "#61dafb" },
                        { name: "Node.js", icon: "🟢", color: "#68a063" },
                        { name: "Python", icon: "🐍", color: "#3776ab" },
                        { name: "Java", icon: "☕", color: "#ed8b00" },
                        { name: "Docker", icon: "🐳", color: "#0db7ed" },
                        { name: "AWS", icon: "☁️", color: "#ff9900" },
                        { name: "MongoDB", icon: "🍃", color: "#4db33d" },
                        { name: "Git", icon: "📝", color: "#f05032" }
                    ].map((tech, index) => (
                        <div key={index} className="tech-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="tech-icon" style={{ color: tech.color }}>
                                {tech.icon}
                            </div>
                            <span className="tech-name">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h3>¿Listo para comenzar tu carrera en Software?</h3>
                    <p>Únete a la próxima generación de ingenieros de software</p>
                    <div className="cta-buttons">
                        <button className="btn-primary">
                            <i className="bi bi-info-circle"></i>
                            Más Información
                        </button>
                        <button className="btn-secondary">
                            <i className="bi bi-telephone"></i>
                            Contactar
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};