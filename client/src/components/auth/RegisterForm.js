import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { NavLink } from 'react-router-dom'
import { useState,useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContex'
import AlertMessage from '../layout/AlertMessage'
import Spinner from 'react-bootstrap/Spinner'; 


function RegisterForm (){

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //Context
  const {registerUser} = useContext(AuthContext)

  //Router
  // let navigate = useNavigate();

  //local storage
  const [registerForm,setRegisterForm] = useState({
    username:'',
    password:'',
    confirmPassword:''
  })

  //
  const [alert,setAlert] = useState(null);

  const {username, password, confirmPassword} = registerForm

  const onChangeRegisterForm = event => setRegisterForm({...registerForm,[event.target.name]:event.target.value})

  const register = async event =>{
    event.preventDefault()
    setIsLoggingIn(true);
    if(password !== confirmPassword)
    {
      setAlert({type:'danger', message:'Password do not match '})
      setTimeout(()=>setAlert(null),3000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if(!registerData.success){
        setAlert({type:'danger',message:registerData.message})
        setTimeout(() => setAlert(null),3000)
        setTimeout(() => setIsLoggingIn(false),3000)
      }
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <>
      <Form className='my-5' onSubmit={register}>
        <AlertMessage info={alert}/>
        <Form.Group className='my-3'>
        <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeRegisterForm} />
        </Form.Group>

        <Form.Group className='my-3'>
        <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangeRegisterForm} />
        </Form.Group>
        <Form.Group>
        <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' required value={confirmPassword} onChange={onChangeRegisterForm} />
        </Form.Group>

        <Button className='my-3' variant='success' type='submit' >Register</Button>
      </Form>
      {isLoggingIn ? (
        <div className='d-flex justify-content-center mt-2'>
          <Spinner animation='border' variant='info' />
        </div>
      ) : null}

      <p>Already have an account?
        <NavLink to='/login'>
          <Button variant='info' size='sm' className='ml-2'> Login</Button>
        </NavLink>
      </p>
    </>
  )
}

export default RegisterForm