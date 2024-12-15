import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextPorovider } from './contextApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextPorovider>
      <App />
    </ContextPorovider>
  </BrowserRouter>
  // </React.StrictMode>,
)
