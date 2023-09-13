import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance';


const AddBranch = () => {

  let [state,setState]=useState({
  address:"",
  city:"",
  phone:"",
  pincode:""
});

  let {id}=useParams();
  console.log(id);
  let token=localStorage.getItem('token');
console.log(token);

let  {address,city,phone,pincode}=state;

let navigate=useNavigate();
let  handleChange =(e)=>{
   console.log('handlechange');
   let {name,value}=e.target;
   setState({...state,[name]:value});
   console.log(state.city);
}
let handleSubmit= async (e)=>{
   console.log("enter");
   e.preventDefault();
  let payload={address,city,phone,pincode,id}
  console.log(payload.address);
  try{
await axiosInstance.post(`/branches/save?aid=${id}`,payload,{headers:{Authorization:`Bearer ${token}`}});
alert("branch added")
  navigate('/adminDashboard/viewBranch')
  }catch(error){
    console.log(error);
    alert("enter proper details to addBranch")
  }
}
  return (
    <div id="addBranch">
      <form action="" method="post">
        <legend >Add Branch Details</legend>
        <table>
          <tr>
            <td>Address: </td>
            <td><input type="text" name='address' onChange={handleChange} className='inputhw1' /></td>
          </tr>

          <tr>
            <td>City: </td>
            <td><input type="text" name='city'   onChange={handleChange} className='inputhw1'/></td>
          </tr>

          <tr>
            <td>Phone: </td>
            <td><input type="number" name='phone'  onChange={handleChange} className='inputhw1'/></td>
          </tr>

          <tr>
            <td>Pincode: </td>
            <td><input type="number" name='pincode'  onChange={handleChange} className='inputhw1'/></td>
          </tr>

          <tr>
            
            <td><button type='submit' onClick={handleSubmit}>Submit</button></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default AddBranch