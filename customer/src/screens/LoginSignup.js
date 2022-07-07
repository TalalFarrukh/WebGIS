import React from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import {useLocation} from 'react-router-dom'

const LoginSignup = () => {

  const location = useLocation()
  
  return (
    <div className='logsign'>
        {location.pathname==='/storeowner/login' ? <LoginForm /> : location.pathname==='/storeowner/signup' ? <SignupForm /> : null}
    </div>
  )
}

export default LoginSignup