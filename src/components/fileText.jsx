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
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        // Simular proceso de carga
        setTimeout(() => {
            VerificarArchivo(archivo);
            VerificarTexto(texto);
            setIsLoading(false);
        }, 1000);
    }

    return(
        <div className="form-glass-container">
            <form onSubmit={onSubmit} className="form-glass">
                <h4 className="form-title display-4">INGRESO DE ARCHIVO</h4>
                
                <div className="input-group">
                    <label htmlFor="SubirArchivo" className="form-label">
                        Ingrese un archivo con la extensión (.pdf o .txt)
                    </label>
                    <input 
                        type="file" 
                        className="btn btn-secondary custom-file-label" 
                        accept=".txt, .pdf" 
                        onChange={(event) => setArchivo(event.target.files[0]?.name || '')}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="Comentario" className="form-label">
                        Ingrese un comentario:
                    </label>
                    <textarea 
                        className="form-control" 
                        placeholder="Ingrese un comentario" 
                        rows="8" 
                        onChange={(event) => setTexto(event.target.value)}
                        style={{
                            resize: 'vertical',
                            minHeight: '120px'
                        }}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loading-spinner"></span>}
                        {isLoading ? 'Procesando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    )
}