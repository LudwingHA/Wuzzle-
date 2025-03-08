import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import ProtectedRoutes from './ProtectedRoutes'
import GamePage from '../pages/Game/GamePage'
import { Preferences } from '../pages/preferences/Preferences'
import { UserInfo } from '../pages/preferences/components/UserInfo'
import UserSecurity from '../pages/preferences/components/UserSecurity'
import UserPrivacity from '../pages/preferences/components/UserPrivacity'


export const router = createBrowserRouter([
    {
        path:'/',
        element: <Home></Home>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/game',
        element: <ProtectedRoutes></ProtectedRoutes>,
        children: [{path: '/game', element: <GamePage></GamePage>}]
    },
    {
        path:'/preferences',
        element: <ProtectedRoutes></ProtectedRoutes>,
        children: [{path: '/preferences', element:<Preferences></Preferences>, children:[
            {
                index: true, element: <UserInfo></UserInfo>
            },
            {
                path: 'user-info', element: <UserInfo></UserInfo>
            },
            {
                path: 'security', elemente: <UserSecurity></UserSecurity>
            },
            {
                path: 'privacity', elemente: <UserPrivacity></UserPrivacity>
            }
        ]}]
    }

])