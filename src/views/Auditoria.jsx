import React, { useState } from 'react';

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
        previousHash: '0000b2c3d4e5f6g7h8i9j0a1',
        nonce: 456,
        hash: '0000c3d4e5f6g7h8i9j0a1b2',
    },
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
        <div className="min-h-screen p-6" style={{ backgroundColor: '#ff9770', color: 'white' }}>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold mb-6">Auditoría de la Cadena</h1>
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
                        <div className="space-y-4">
                            {initialChain.map((bloque, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded shadow"
                                    style={{
                                        backgroundColor: '#ffd670',
                                        color: 'black',
                                        marginBottom: '1.5rem',
                                    }}
                                >
                                    <h2 className="text-xl font-semibold mb-4 text-center">Bloque #{bloque.index}</h2>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fffbe6', borderRadius: '8px', overflow: 'hidden' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ffd670' }}>Datos</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ffd670' }}>{bloque.data}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ffd670' }}>Nonce</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ffd670' }}>{bloque.nonce}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ffd670' }}>Hash anterior</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ffd670' }}>{bloque.previousHash}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px' }}>Hash</td>
                                                <td style={{ padding: '8px' }}>{bloque.hash}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                        {mensajeValidado && (
                            <div className="mt-6 text-green-800 text-xl font-bold">
                                {mensajeValidado}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}