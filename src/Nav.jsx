import React from 'react'
import "./css/Nav.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Nav = () => {
  let navigate=useNavigate()
  let token=window.localStorage.getItem("token")
  let role=window.localStorage.getItem("role")
let handleClick=()=>{
  let token=window.localStorage.getItem('token')
  if(token){
    navigate("/home")
  }
  else{
    alert("Plz Login Then Explore");
    navigate("/login")
  }
}
let handleLogout=()=>{
  window.localStorage.clear()
  navigate("/")
}
  return (
    <div id="navbar">
      <li ><button onClick={handleClick}>Home</button></li>
      <li>{token?<button onClick={handleLogout}>Logout</button>:<button><Link to={"/login"} >Login</Link></button>}</li>
      <li><button >Gallery</button></li>
      {role==="ROLE_ADMIN"?<li><button ><Link to={'/adminDashboard'}>Admin DashBoard</Link></button></li>:<li></li>}
    {/* <div><button >Logout</button></div> */}
    </div>
  )
}

export default Nav
