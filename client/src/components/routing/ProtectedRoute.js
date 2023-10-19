import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContex'
import Spinner from 'react-bootstrap/Spinner'; 
import NavbarMenu from '../layout/NavbarMenu';


const ProtectedRoute = ({ element }) => {

    const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext)

    if(authLoading)
    return (
        <div className='spinner-container'>
                <Spinner animation='border' variant='info'/>
            </div>
    )
    
  return isAuthenticated ?(<>
        <NavbarMenu></NavbarMenu>
        {element}
  
    </>
    ):(
        <Navigate to='/login' replace />
    )
}

export default ProtectedRoute