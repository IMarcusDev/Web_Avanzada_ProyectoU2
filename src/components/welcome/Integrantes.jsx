import imgSosa from '../../img/MateoSosa.jpg'
import imgEscobar from '../../img/MarcosEscobar.jpg'
import imgGranda from '../../img/JuanGranda.jpg'
import imgNato from '../../img/CarlosÑato.jpg'

export function Integrantes() {
  return <>
    <div class="container">
      <h2 class="t-1">Integrantes</h2>
      <div>
        <div class="row">
          <div class="col bg-light">
            <img class="rounded img-fluid w-100 h-auto" src={imgSosa} alt="Mateo Sosa" />
            <div class="h4 text-center">Mateo Sosa</div>
            <p class="biography">Nacido en el año 2004, siempre tuvo ganas de conocer el mundo, explorarlo y descubrir cómo es que se rige. Estudió en la escuela Global Kids, donde hizo buenos amigos pero, debido a la poca capacidad de comunicación entre personas de distintos lugares, se alejó de ellos. Se pasó al colegio Adventista Gedeón, donde volvió a reencontrarse con una amiga de la infancia y con quien mantiene contacto hasta día de hoy. A día de hoy, estudia en la Universidad de las Fuerzas Armadas ESPE, donde conoció a sus amigos presentes en esta página. Día a día intenta superarse a sí mismo, buscando nuevos retos y desafíos.</p>
          </div>
          <div class="col bg-secondary">
            <img class="rounded img-fluid w-100 h-auto" src={imgNato} alt="Carlos Ñato" />
            <div class="h4 text-center">Carlos Ñato</div>
            <p class="biography">Me llamo Carlos, soy estudiante de Ingeniería en Software en la ESPE. Me apasiona aprender cosas nuevas y resolver problemas mediante la programación. Mi objetivo es desarrollar software que ayude a las personas a automatizar tareas y mejorar el rendimiento en cualquier ámbito.
            Me gusta mucho la música, el cine y los videojuegos. En mi tiempo libre disfruto de leer libros de ciencia ficción y fantasía, así como también ver series y películas de esos géneros. Me gusta salir a pasear con mis amigos y disfrutar de la naturaleza. Espero poder seguir aprendiendo y creciendo en mi carrera profesional.</p>
        </div>
          <div class="col bg-light">
            <img class="rounded img-fluid w-100 h-auto" src={imgGranda} alt="JuanGranda" />
            <div class="h4 text-center">Juan Granda</div>
            <p class="biography">Soy Juan Carlos Granda Arcos, tengo 20 años y soy estudiante de Ingeniería en Software en la Universidad de las Fuerzas Armadas ESPE. Desde pequeño me ha gustado aprender cosas nuevas y resolver problemas. Me apasiona la programación y la tecnología, y espero poder contribuir al desarrollo de soluciones innovadoras en el futuro.
            Tengo una gran curiosidad por el mundo que me rodea y siempre estoy buscando nuevas formas de aprender y crecer. .
            </p>
          </div>
          <div class="col bg-secondary">
            <img class="rounded img-fluid w-100 h-auto" src={imgEscobar} alt="MarcosEscobar" />
            <div class="h4 text-center">Marcos Escobar</div>
            <p class="biography">Soy Marcos Escobar un joven que desde que está en bachillerato tenía una idea clara de que le gustaba aprender cosas incluso cuando tiene que complicarse la vida para eso. Logro entrar en la Universidad de las Fuerzas Armadas ESPE dónde conoció a personas increíbles que ahora son sus amigos, también hubieron cosas malas como ciertos problemas de salud pero eso le hizo entender lo importante que es vivir su vida el día a día, esforzarse por aprender pero sobre todo compartir un momento con nuestras personas a nuestro alrededor.</p>
          </div>
        </div>
      </div>
    </div>
  </>
}
