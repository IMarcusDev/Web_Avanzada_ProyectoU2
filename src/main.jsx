import { createRoot } from 'react-dom/client'
import { Login } from './views/Login.jsx'
import { HashTable } from './components/tableHash.jsx'
import { App } from './App.jsx'
import "./index.css"
import "./styles/forms.css"

createRoot(document.getElementById('root')).render(
  <App></App>
)
