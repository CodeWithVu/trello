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

// cấu hình redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StrictMode>
          <App />
          <ToastContainer position="bottom-left" closeOnClick={true} />
        </StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
