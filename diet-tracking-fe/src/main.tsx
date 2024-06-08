import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import Foods from './pages/Foods'
import Diary from './pages/Diary/Diary'
import Register from './pages/Register'
import AuthContext from './contexts/AuthContext'
import Middleware from './libs/middleware'
import Login from './pages/Login'
import CreateFood from './pages/CreateFood'
import Profile from './pages/Profile'
import Bmi from './pages/Bmi'

// seluruh routing ditaruh pada router
const router = createBrowserRouter([{
  path: "/",
  element: <Middleware.Public><Home/></Middleware.Public>
},{
  path: "/history",
  element: <Middleware.Auth><History/></Middleware.Auth>
},{
  path: "/foods",
  element: <Middleware.Auth><Foods/></Middleware.Auth>
},{
  path: "/diary",
  element: <Middleware.Auth><Diary/></Middleware.Auth>
},{
  path: "/register",
  element: <Middleware.Guest><Register/></Middleware.Guest>
},{
  path: "/login",
  element: <Middleware.Guest><Login/></Middleware.Guest>
},{
  path: "/createfood",
  element: <Middleware.Auth><CreateFood/></Middleware.Auth>
},{
  path: "/profile",
  element: <Middleware.Auth><Profile/></Middleware.Auth>
},{
  path: "/bmi",
  element: <Bmi/>
}])

// gunakan RouterProvider lalu masukkan value dari router
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext>

    <RouterProvider router={router}/>
    </AuthContext>
  </React.StrictMode>,
)