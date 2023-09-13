import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminMainbar = () => {
  return (
    <div id="mainbar">
    <h1>Welcome to Admin DashBoard</h1>
    <Outlet/>
    
    </div>
  )
}

export default AdminMainbar
