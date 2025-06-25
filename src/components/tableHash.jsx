import { Hash } from "./chain"

const current_time = Date.now().toString();

// localstorage.getitem('data'):
// Se espera: [{ text: 'Hola', time: '123456789' (Date.now().toString()) }]

export function HashTable() {
  const data = JSON.parse(localStorage.getItem('data')).rows;

  return <>
  <table>
    <thead>
      <tr>
        <th>Cadena</th>
        <th>Semilla</th>
        <th>Tiempo</th>
        <th>Hash</th>
      </tr>
    </thead>
    <tbody>
      {data.map((element, i) => {
        return <Hash key={i} chain={element.text} time={element.time}></Hash>
      })}
    </tbody>
  </table>
  </>
}