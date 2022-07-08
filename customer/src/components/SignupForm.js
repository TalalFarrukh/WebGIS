import React from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const SignupForm = () => {

  const nv = useNavigate()

  const initialDetails = Object.freeze({username: '', password: ''})
  const [details, setDetails] = useState(initialDetails)

  const [signedUp, setSignedUp] = useState(false)

  const changeDetails = (e) => {
    setDetails({...details, [e.target.name]: e.target.value.trim()})
  }

  const submitDetails = (e) => {
    e.preventDefault(); setSignedUp(true)
    let user = details['username']; let pass = details['password']
    
    fetch('/create', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, pass})
    })
    .then(response => {return response.text()}) 
    .then(data => {alert(data)})
  }

  window.location = ''

  return (
    <Card border='info'>
    <Form>
        <h3 className='logsignHeader'>Signup</h3>
        <Form.Group className='logsignField'>
          <Form.Label><h5>Username</h5></Form.Label>
          <Form.Control name='username' type='text' onChange={changeDetails} />
        </Form.Group>
        
        <Form.Group className='logsignField'>
          <Form.Label><h5>Password</h5></Form.Label>
          <Form.Control name='password' type='password' onChange={changeDetails} />
        </Form.Group>

        <Button className='logsignButton' variant='dark' type='submit' onClick={submitDetails} >Submit</Button>
        {signedUp===true ? <Navigate to='/storeowner/login'/> && setSignedUp(false) : null}
        
    </Form> 

    <Card.Body>
      Already own a store? <LinkContainer to='/storeowner/login'><Card.Link>Click here</Card.Link></LinkContainer> to login!
    </Card.Body>

    </Card>
  )
}

export default SignupForm