import React, { useState } from 'react';
import {Blocks} from '../components/blocks';
const initialChain = [
    {
        index: 0,
        data: 'Bloque génesis',
        previousHash: '0',
        nonce: 512,
        hash: '0000a1b2c3d4e5f6g7h8i9j0',
    },
    {
        index: 1,
        data: 'Transacción 1',
        previousHash: '0000a1b2c3d4e5f6g7h8i9j0',
        nonce: 123,
        hash: '0000b2c3d4e5f6g7h8i9j0a1',
    },
    
    {
        index: 2,
        data: 'Transacción 2',
        previousHash: '0000a1b2c3d4e5f6g7h8i9j0',
        nonce: 123,
        hash: '0000b2c3d4e5f6g7h8i9j0a1',
    }
];

export const Auditoria = () => {
    const [mostrarCadena, setMostrarCadena] = useState(false);
    const [mensajeValidado, setMensajeValidado] = useState('');

    const handleMostrarCadena = () => {
        setMostrarCadena(!mostrarCadena);
        setMensajeValidado('');
    };

    const handleValidar = () => {
        setMensajeValidado('✅ Cadena validada correctamente');
    };

    return (
        <div className="min-h-screen p-6" style={{  color: 'Black' }}>
            <div className="space-y-4">
                <h1 className="display-3">Auditoría de la Cadena</h1>
                <button
                    onClick={handleMostrarCadena}
                    className="px-4 py-2 mb-4 rounded"
                    style={{ backgroundColor: '#ffd670', color: '#333', marginRight: '1rem' }}
                >
                    {mostrarCadena ? 'Ocultar cadena' : 'Ver cadena'}
                </button>
                {mostrarCadena && (
                    <>
                        <button
                            onClick={handleValidar}
                            className="px-4 py-2 mb-6 rounded"
                            style={{ backgroundColor: '#FFA673', color: 'white' }}
                        >
                            Validar cadena
                        </button>
                        <div className="space-y-4 row">
                            <Blocks initialChain={initialChain}/>
                        </div>
                        {mensajeValidado && (
                            <div className="mt-3 text-green-800 text-xl fw-bold fst-italic">
                                {mensajeValidado}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}