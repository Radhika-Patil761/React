import React from 'react'
import './admin.css'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <>
    <div id="sidebar">
      <li><h4>Admin Dashboard</h4></li>
     <li><Link to="/adminDashboard/home">Home</Link></li>   
     <li><Link to="/adminDashboard/addAcademyMan">Add Academy Manager</Link></li>
     <li><Link to="/adminDashboard/ViewAcademyMan">View Academy Manager</Link></li>
     <li><Link to="/adminDashboard/ViewAcademy">View Academy</Link></li>
  
     <li><Link to="/adminDashboard/ViewBranch">View Branch</Link></li>
     <li><Link to="/adminDashboard/ViewCourse">View Course</Link></li>
    </div>
    </>
  )
}

export default AdminSidebar
