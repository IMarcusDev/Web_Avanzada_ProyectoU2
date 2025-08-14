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
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            ValidarNumeroCeros(ceros);
            setIsLoading(false);
        }, 800);
    } 

    return(
        <div className="zero-config-form">
            <form onSubmit={onSubmit} className="form-glass">
                <p className="form-title display-6">CONFIGURACIÓN DE NÚMEROS DE CEROS</p>
                
                <div className="input-group">
                    <label htmlFor="numeroCeros" className="form-label">
                        Ingrese el número de ceros que desea colocar
                    </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Número de ceros:
                        </span>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Ej: 4" 
                            aria-label="Numero de ceros" 
                            aria-describedby="basic-addon1" 
                            min="1"
                            max="10"
                            onChange={(event) => setCeros(event.target.value)}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loading-spinner"></span>}
                        {isLoading ? 'Configurando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    )
}