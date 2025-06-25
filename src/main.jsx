import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './components/login.jsx'
import { HashTable } from './components/tableHash.jsx'

// Testing
localStorage.setItem('data', JSON.stringify(
  {
    rows: [
      {
        text: 'Hola',
        time: '123456789',
      },
      {
        text: 'Chao',
        time: '123456780',
      },
    ]
  }
))

createRoot(document.getElementById('root')).render(
  <>
  <Login></Login>
  <HashTable></HashTable>
  </>
)
