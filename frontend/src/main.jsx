import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
//npm run dev
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
    
  </BrowserRouter>

)
