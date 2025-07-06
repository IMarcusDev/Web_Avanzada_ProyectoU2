import { useState } from "react";

function ValidarNumeroCeros(ceros){
    if(ceros.trim().length === 0){
        alert("No se ingreso ningun número, intente de nuevo")
    }else{
        alert(`El número de ceros para la configuracion es: ${ceros}`)
    }
}


export function ManejarRellenoCeros(){

    const [ceros, setCeros] = useState('');
    const onSubmit = (event) => {
        event.preventDefault();
        ValidarNumeroCeros(ceros);
    } 

    return(
        <>
            <div className="d-flex justify-content-center" style={{ paddingTop: '30vh' }}>
                <form onSubmit={onSubmit} className="p-4 border rounded bg-light">
                    <p className="display-6">CONFIGURACIÓN DE NÚMEROS DE CEROS</p>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <label htmlFor="SubirArchivo">Ingrese el número de ceros que desea colocar</label>
                    </div>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <span class="input-group-text" id="basic-addon1">Número de ceros:</span>
                        <input type="number" class="form-control" placeholder="Ej:4" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => setCeros(event.target.value)}/>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" >Enviar</button>
                    </div>
                </form>
            </div>
        </>
    )
}