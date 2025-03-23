import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import routes from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider.jsx'

import toast, { Toaster } from 'react-hot-toast';
import GlobalEventListener from './pages/Components/GlobalEventListener .jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  
  <GlobalEventListener>  {/* Wrap everything */}
        <RouterProvider router={routes} />
        <Toaster position="top-right" reverseOrder={false} />
      </GlobalEventListener>
  
  </AuthProvider>
  </StrictMode>,
)
