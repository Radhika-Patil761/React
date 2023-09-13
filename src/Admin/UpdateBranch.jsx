import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance';

const UpdateBranch = () => {

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
         console.log(handleChange);
         let {name,value}=e.target;
         setState({...state,[name]:value});
         console.log(state.city);
      }
      
      

      useEffect(()=>{

        let getDetails= async ()=>{
        
           let  {data}=await axiosInstance.get(`/branches/get/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        console.log(data.data);
        setState(data.data);
        console.log(state.email);
        }
        getDetails();
        
            },[])

      
      let handleSubmit= async (e)=>{
        try {
            console.log("enter");
        e.preventDefault();
       let payload= {address,city,phone,pincode,id}
       console.log(payload.address);
     await axiosInstance.put(`/branches/update/${id}`,payload,{headers:{Authorization:`Bearer ${token}`}});
     alert("branch added")
       navigate('/adminDashBoard/viewBranch')
        } catch (error) {
            console.log(error);
        }
     }

     
  return (
    <div id='UpdateBranch'>
      <form action="" method="post">
        <legend >Update Branch Details</legend>
        <table>
          <tr>
            <td>Address: </td>
            <td><input type="text" name='address' onChange={handleChange} className='inputhw'  value={address}/></td>
          </tr>

          <tr>
            <td>City: </td>
            <td><input type="text" name='city'   onChange={handleChange} className='inputhw' value={city}/></td>
          </tr>

          <tr>
            <td>Phone: </td>
            <td><input type="number" name='phone'  onChange={handleChange} className='inputhw' value={phone}/></td>
          </tr>

          <tr>
            <td>Pincode: </td>
            <td><input type="number" name='pincode'  onChange={handleChange} value={pincode}/></td>
          </tr>

          <tr>
            
            <td><button type='submit' onClick={handleSubmit}>Submit</button></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default UpdateBranch