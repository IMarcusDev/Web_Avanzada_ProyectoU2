import { Hash } from "./chain"

import '../styles/chain.css'

// const current_time = Date.now().toString();

// localstorage.getitem('data'):
// Se espera: [{ text: 'Hola', time: '123456789' (Date.now().toString()) }]

export function HashTable() {
  const data = JSON.parse(localStorage.getItem('data')).rows;

  return <>
  <h3 className="display-3">Listado de Cadenas Generadas</h3>
  <table className="table table-striped table-hover table-bordered">
    <thead className="thead-light">
      <tr>
        <th>Cadena</th>
        <th>Semilla</th>
        <th>Tiempo</th>
        <th>Hash</th>
      </tr>
    </thead>
    <tbody>
      {data.map((element, i) => {
        return <Hash key={i} idx={i} chain={element.text} time={element.time}></Hash>
      })}
    </tbody>
  </table>
  </>
}