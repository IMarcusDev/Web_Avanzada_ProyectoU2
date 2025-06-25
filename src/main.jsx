import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './components/login.jsx'
import { HashTable } from './components/tableHash.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Login></Login>
  <HashTable></HashTable>
  </>
)
