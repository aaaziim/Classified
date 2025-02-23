import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import routes from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HelmetProvider>
   <RouterProvider router={routes}>
   </RouterProvider >
   </HelmetProvider>
  </StrictMode>,
)
