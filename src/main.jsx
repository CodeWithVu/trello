import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Cấu hình react-router-dom
import { BrowserRouter } from 'react-router-dom'

//Cấu hình toast messages
import { ToastContainer } from 'react-toastify'

// Cấu hình redux store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <ToastContainer position="bottom-left" closeOnClick={true} />
    </StrictMode>
  </Provider>
)
