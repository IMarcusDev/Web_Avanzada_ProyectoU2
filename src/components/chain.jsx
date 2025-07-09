// Listado de Cadenas:
// String + (Time + seed) = hash
// El hash anterior se convierte en seed
import CryptoJS from "crypto-js";

const first_seed = 'ESPE';
export let current_seed = first_seed;

function generateHash(chain, seed, time) {
  const data = chain + seed + time;

  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

// Hash Component: table row
export function Hash({idx, chain, time}) {
  const hash = generateHash(chain, current_seed, time);
  const previousHashes = JSON.parse(localStorage.getItem("hashes")) || [];
  const updatedHashes = [...previousHashes, { id: idx, hash: hash }];
  localStorage.setItem("hashes", JSON.stringify(updatedHashes));

  const comp = <>
    <tr>
      <td>{chain}</td>
      <td>{current_seed}</td>
      <td>{time}</td>
      <td>{hash}</td>
    </tr>
  </>

  current_seed = hash;  // Actual hash is the seed for the future hash

  return comp;
}
