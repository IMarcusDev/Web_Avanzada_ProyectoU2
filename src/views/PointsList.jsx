import {RowItems} from "../components/RowItems.jsx";

export const PointsList = () => {
    const names = ["Marcos", "Juan", "Carlos", "Mateo"];
    const surnames = ["Escobar", "Granda", "Ñato", "Sosa"];
    
    const chainData = JSON.parse(localStorage.getItem("hashes")) || [];
    
    const personas = chainData.map((element, idx) => {
        let numero = Math.floor(Math.random() * 4);
        return {
            id: idx,
            name: names[numero],
            surname: surnames[numero],
            point: 1,
            chain: element.hash
        };
    });

    return (
        <div className="Container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Punto</th>
                        <th>Cadena</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map(persona => (
                        <RowItems
                            key={persona.id}
                            id={persona.id}
                            name={persona.name}
                            surname={persona.surname}
                            point={persona.point}
                            chain={persona.chain}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
