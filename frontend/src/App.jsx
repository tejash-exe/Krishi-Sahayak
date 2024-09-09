import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Bottomnavbar from './components/Bottomnavbar.jsx'

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet/>
      </div>
      <Bottomnavbar/>
    </>
  )
}

export default App
