import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import Foods from './pages/Foods'
import Diary from './pages/Diary/Diary'
import Register from './pages/Register'

// seluruh routing ditaruh pada router
const router = createBrowserRouter([{
  path: "/",
  element: <Home/>
},{
  path: "/history",
  element: <History/>
},{
  path: "/foods",
  element: <Foods/>
},{
  path: "/diary",
  element: <Diary/>
},{
  path: "/register",
  element: <Register/>
}])

// gunakan RouterProvider lalu masukkan value dari router
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)