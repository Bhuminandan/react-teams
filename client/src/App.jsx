import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Dashboard from './protectedRoutes/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {

  return (
    <div className='w-screen h-screen'>

      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/auth'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
