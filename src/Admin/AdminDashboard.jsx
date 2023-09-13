import React from 'react'
import './admin.css'
import AdminSidebar from "./AdminSidebar"
import AdminMainbar from './AdminMainbar'

const AdminDashboard = () => {
  return (
    <div id="dashboard">
      <div> <AdminSidebar/></div>
      <div><AdminMainbar/></div>
    </div>
  )
}

export default AdminDashboard
