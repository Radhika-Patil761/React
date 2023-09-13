import React from 'react'
import {Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div>
      {/* <Link to={'/home'}>HOME</Link><br /> */}
      <Link to={'/signup'}>Signup</Link><br/>
      <Link to={'/login'}>Login</Link><br/>
    </div>
  )
}

export default Navbar
