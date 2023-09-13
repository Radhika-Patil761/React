import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({Children}) => {
    if(window.localStorage.getItem("token")){
        return (
            <div>
              {children}
            </div>
          )
    }
    else{
        return <Navigate to={"/login"}/>
    }
  
}

export default ProtectedRoute
