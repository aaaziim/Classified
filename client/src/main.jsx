import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import routes from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <HelmetProvider>
   <RouterProvider router={routes}>
   </RouterProvider >
   </HelmetProvider>
  </AuthProvider>
  </StrictMode>,
)
