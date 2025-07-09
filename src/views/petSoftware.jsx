import petSoft from "../assets/images/mascota_carrera.png";
import { DescSoftware } from "../components/descSoftware";
import { LaborField } from "../components/laborField";
import { ProfessionalProfile } from "../components/ProfessionalProfile";
import "../styles/petSoftware.css"

export const PetSoftware = () => {
    return(
        <>
          <div className="container">
            <div className="imgContainer">
                <img src={petSoft} alt="Mascota de software"></img>
            </div>
            <div className="desc-software">
              <DescSoftware></DescSoftware>
              <ProfessionalProfile></ProfessionalProfile>
              <LaborField></LaborField>
            </div>
          </div> 
        </>
    )
}