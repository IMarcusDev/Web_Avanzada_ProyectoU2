import { useState } from "react";

function VerificarArchivo(nombreArchivo){
    
    if(nombreArchivo.trim().length === 0){
        alert("No se ah ingreso ningun archivo, intente de nuevo")
    }else{
        alert(`El archivo ${nombreArchivo} ingresado correctamente`)
    }
}

function VerificarTexto(texto){
    if(texto.trim().length === 0){
        alert("No se ingreso ningun texto, intente de nuevo")
    }else{
        alert(`Texto ${texto} ingresado correctamente`)
    }
}

export function ManejarCargaArchivo(){
    const [archivo,setArchivo] = useState('');
    const [texto,setTexto] = useState('');

    const onSubmit = (event)=>{
        event.preventDefault();
        VerificarArchivo(archivo);
        VerificarTexto(texto);
    }

    return(
        <>
            <div className="d-flex justify-content-center">
                <form onSubmit={onSubmit} className="p-4 border rounded bg-light">
                    <h4 className="display-4">INGRESO DE ARCHIVO</h4>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <label htmlFor="SubirArchivo">Ingrese un archivo con la extension (.pdf o .txt)</label>
                    </div>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <input type="file" className="btn btn-secondary custom-file-label" accept=".txt, .pdf" onChange={(event) => setArchivo(event.target.files[0].name)}/>
                    </div>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <label htmlFor="Comentario">Ingrese un comentario:</label>
                    </div>
                    <div className="input-group input-group-sm mb-3 d-flex justify-content-center">
                        <textarea className="input-group-text" placeholder="Ingrese un comentario" rows="14" cols="55" onChange={(event) => setTexto(event.target.value)}/>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" >Enviar</button>
                    </div>
                </form>
            </div>
            
        </>
    )
}


