// Listado de Cadenas:
// String + (Time + seed) = hash
// El hash anterior se convierte en seed
import CryptoJS from "crypto-js";

const first_seed = 'ESPE';

function generateHash(chain, seed, time) {
  const data = chain + seed + time;
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

// Hash Component: table row
export function Hash({ idx, chain, time, previousHash = first_seed }) {
  const currentSeed = previousHash || first_seed;
  const hash = generateHash(chain, currentSeed, time);
  const previousHashes = JSON.parse(localStorage.getItem("hashes")) || [];
  const existingHash = previousHashes.find(h => h.id === idx);
  
  if (!existingHash) {
    const updatedHashes = [...previousHashes, { id: idx, hash: hash }];
    localStorage.setItem("hashes", JSON.stringify(updatedHashes));
  }

  return (
    <tr>
      <td className="chain-text">{chain}</td>
      <td className="seed-text">{currentSeed}</td>
      <td className="time-text">{time}</td>
      <td className="hash-text">{hash}</td>
    </tr>
  );
}