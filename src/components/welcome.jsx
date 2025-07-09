// Bienvenida a la aplicación (index.html)
// Datos personales de cada integrante: fotos, breve descripción
// Copiar datos de anterior proyecto
import '../styles/welcome.css'
import { Historia } from './welcome/Historia';
import { Integrantes } from './welcome/Integrantes';
import { TableEstudiantes } from './welcome/TableEstudiantes';

export const Welcome = () => {
  return (
    <div class="bg-white integrantes">
      <Integrantes></Integrantes>
      <hr />
      <Historia></Historia>
      <TableEstudiantes></TableEstudiantes>
    </div>
  );
};
