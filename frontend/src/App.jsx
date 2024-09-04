import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
