import React from 'react';

const screenshots = [
    {
        src: '/', 
        title: 'Página de Inicio de Sesión',
        description: 'Aquí los usuarios pueden ingresar sus credenciales para acceder a la plataforma.',
    },
    {
        src: '',
        title: 'Cargar Archivo',
        description: 'Permite al usuario subir archivos para ser procesados por la aplicación.',
    },
    {
        src: '',
        title: 'Listado de Cadenas',
        description: 'Muestra todas las cadenas registradas en el sistema.',
    },

];

export const Documentation = () => (
    <div className="min-h-screen p-8" style={{ background: '#f8fafc' }}>
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#ff9770' }}>
            Documentación Visual de la Plataforma
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((shot, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
                    style={{ border: '2px solidrgb(160, 152, 133)' }}
                >
                    <h2 className="text-xl font-semibold mb-2" style={{ color: '#ffa673' }}>{shot.title}</h2>
                    <img
                        src={shot.src}
                        alt={shot.title}
                        className="mb-4 rounded"
                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', border: '1px solid #eee' }}
                    />
                    <p className="text-gray-700 text-center">{shot.description}</p>
                </div>
            ))}
        </div>
    </div>
);