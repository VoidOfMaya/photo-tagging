import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotFound } from './components/404Page/notFound.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Home } from './components/homepage/homepage.jsx'

const router = createBrowserRouter([
  {
  path:'/', element: <App />,
  children: [
    {path:'/', element: <Home />}
  ],
  errorElement: <NotFound />},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
