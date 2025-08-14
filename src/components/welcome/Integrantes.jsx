import { useState } from 'react';
import imgSosa from '../../img/MateoSosa.jpg';
import imgEscobar from '../../img/MarcosEscobar.jpg';
import imgGranda from '../../img/JuanGranda.jpg';
import imgNato from '../../img/CarlosÑato.jpg';

export function Integrantes() {
  const [selectedMember, setSelectedMember] = useState(null);

  const members = [
    {
      id: 1,
      name: "Mateo Sosa",
      fullName: "Diego Mateo Sosa Flores",
      role: "Desarrollador Frontend",
      image: imgSosa,
      bio: "Nacido en 2004, siempre tuvo ganas de conocer el mundo y explorarlo. Estudió en Global Kids y luego en el colegio Adventista Gedeón. Actualmente estudia en la ESPE donde conoció a sus compañeros de equipo.",
      skills: ["React", "JavaScript", "UI/UX Design"],
      location: "Alangasí",
      github: "@mateososa",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      name: "Carlos Ñato",
      fullName: "Carlos Isaac Ñato Caiza",
      role: "Desarrollador Backend",
      image: imgNato,
      bio: "Estudiante de Ingeniería en Software en la ESPE. Apasionado por aprender y resolver problemas mediante programación. Le gusta la música, cine y videojuegos.",
      skills: ["Node.js", "Python", "Databases"],
      location: "Cuendina",
      github: "@carlosnato",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      name: "Juan Granda",
      fullName: "Juan Carlos Granda Arcos",
      role: "Desarrollador Full Stack",
      image: imgGranda,
      bio: "Tiene 20 años y estudia Ingeniería en Software en la ESPE. Desde pequeño le gusta aprender cosas nuevas y resolver problemas. Apasionado por la programación y tecnología.",
      skills: ["Java", "React", "Spring Boot"],
      location: "Puente 9",
      github: "@juangranda",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      name: "Marcos Escobar",
      fullName: "Marcos David Escobar Vela",
      role: "DevOps Engineer",
      image: imgEscobar,
      bio: "Joven que desde bachillerato tenía clara su pasión por aprender. Estudia en la ESPE donde conoció a personas increíbles. Entiende la importancia de vivir el día a día y compartir momentos.",
      skills: ["Docker", "AWS", "CI/CD"],
      location: "San Pedro de Taboada",
      github: "@marcosescobar",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="team-container">
      <div className="team-header">
        <h2 className="team-title">Nuestro Equipo</h2>
        <p className="team-subtitle">
          Conoce a los desarrolladores detrás de este proyecto blockchain
        </p>
      </div>

      <div className="team-grid">
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`member-card ${selectedMember === member.id ? 'selected' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
          >
            <div className="member-image-container">
              <img src={member.image} alt={member.name} className="member-image" />
              <div className={`member-overlay bg-gradient-to-br ${member.color}`}>
                <div className="member-role">{member.role}</div>
              </div>
            </div>
            
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-location">
                <i className="bi bi-geo-alt"></i>
                {member.location}
              </p>
              
              <div className="member-skills">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>

              {selectedMember === member.id && (
                <div className="member-details">
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-links">
                    <a href="#" className="member-link">
                      <i className="bi bi-github"></i>
                      {member.github}
                    </a>
                    <a href="#" className="member-link">
                      <i className="bi bi-envelope"></i>
                      Contactar
                    </a>
                  </div>
                </div>
              )}
              
              <button className="expand-button">
                <i className={`bi ${selectedMember === member.id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}