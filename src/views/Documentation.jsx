import React from 'react';
import LoginImg from '../assets/images/login.png';
import WelcomeImg from '../assets/images/welcome.png';
import UploadImg from '../assets/images/upload.png';
import ListImg from '../assets/images/list.png';
import AuditoriaImg from '../assets/images/Auditoria.png';
import ConfigImg from '../assets/images/config.png';
import LogoImg from '../assets/images/petSoftware.png';
import PointsImg from '../assets/images/pointsList.png';

const screenshots = [
    {
    title: 'Inicio de Sesión',
    src: LoginImg,
    description: 'Autenticación de usuarios para acceder a la red blockchain y sus funcionalidades.',
    },
    {
    title: 'Pantalla de Bienvenida',
    src: WelcomeImg,
    description: 'Presenta información general del sistema y del nodo actual conectado a la red.',
    },
    {
    title: 'Carga de Archivo',
    src: UploadImg,
    description: 'Interfaz para subir archivos que serán hashados y registrados como bloques en la cadena.',
    },
    {
    title: 'Listado de Cadenas',
    src: ListImg,
    description: 'Visualiza todos los bloques registrados, incluyendo su hash, timestamp y datos asociados.',
    },
    {
    title: 'Auditoría de Cadenas',
    src: AuditoriaImg,
    description: 'Permite verificar la integridad de la cadena mediante validación de hashes y enlaces.',
    },
    {
    title: 'Configuración de Dificultad',
    src: ConfigImg,
    description: 'Ajusta parámetros como el número de ceros requeridos en el hash para validar un bloque (proof of work).',
    },
    {
    title: 'Identidad Visual',
    src: LogoImg,
    description: 'Logotipo o mascota institucional que representa el sistema blockchain desarrollado.',
    },
    {
    title: 'Listado de Nodos',
    src: PointsImg,
    description: 'Muestra los nodos conectados a la red blockchain y su estado de sincronización.',
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
                    className="shadow-lg p-16 flex flex-col items-center rounded"
                    style={{ border: '2px solidrgb(160, 152, 133)',  padding:'20', paddingLeft: '16px'}}
                >
                    <h2 className="text-xl font-semibold mb-2 subtitulos" style={{ color: '#ffa673'}}>{shot.title}</h2>
                    <img
                        src={shot.src}
                        alt={shot.title}
                        className="mb-4 rounded col"
                        style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', border: '1px solid #eee' }}
                    />
                    <h5 className=" mb-5 text-gray-700 text-center ">{shot.description}</h5>
                </div>
            ))}
        </div> 
    </div>
);