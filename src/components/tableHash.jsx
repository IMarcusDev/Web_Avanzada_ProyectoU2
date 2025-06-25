import { Hash } from "./chain"

const current_time = Date.now().toString();

export function HashTable() {
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
      <Hash chain={'Hola'} time={current_time}></Hash>
      <Hash chain={'Hola'} time={current_time}></Hash>
      <Hash chain={'Hola'} time={current_time}></Hash>
    </tbody>
  </table>
  </>
}