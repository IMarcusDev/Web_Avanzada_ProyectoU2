import { createRoot } from 'react-dom/client'
import { Login } from './views/Login.jsx'
import { HashTable } from './components/tableHash.jsx'
import { App } from './App.jsx'
import "./index.css"

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
  <App></App>
)
