import React from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  
  const initialDetails = Object.freeze({username: '', password: ''})
  const [details, setDetails] = useState(initialDetails)

  const changeDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value.trim() })
  }

  var owner = [{"owner_id":'',"username":"","password":"","store_exists":''}]
  var userStore = [{"store_id":'',"owner_id":'',"quantity":0,"price_per_unit":0,"name":"","geometry":"","st_x":0,"st_y":0}]
  const [correct, setCorrect] = useState(false)

  const [x, setX] = useState('')
  const [y, setY] = useState('')

  const submitDetails = (e) => {
    e.preventDefault()
    let user = details['username']; let pass = details['password']
   
    fetch('/userlogin', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, pass})
    })
    .then(response => { return response.json() }) 
    .then(data => { owner=data[0]; setX(data[0]) })
    .then(() => {
      if(owner) {
        let ownerid = owner.owner_id
        
        fetch('/ownerStore', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ownerid})
        }).then(response => { return response.json() })
          .then(data => { userStore=data[0]; setY(data[0]) })
          .then(() => setCorrect(true))
      }
      else console.log("Not working")
    })
  }

  const nv = useNavigate()
  
  window.location = '/'

  return (
    <Card border='info'>
    <Form>
        <h3 className='logsignHeader'>Login</h3>
        <Form.Group className='logsignField'>
          <Form.Label><h5>Username</h5></Form.Label>
          <Form.Control name='username' type='text' onChange={changeDetails} />
        </Form.Group>
        
        <Form.Group className='logsignField'>
          <Form.Label><h5>Password</h5></Form.Label>
          <Form.Control name='password' type='password' onChange={changeDetails} />
        </Form.Group>

        <Button className='logsignButton' variant='dark' type='submit' onClick={submitDetails} >Submit</Button>
        {correct===true ? nv('/Admin/', {state:{x,y}}) : null}
    </Form>

    <Card.Body>
      Not a Store Owner? <LinkContainer to='/storeowner/signup'><Card.Link>Click here</Card.Link></LinkContainer> to become one!
    </Card.Body>

    </Card>
  )
}

export default LoginForm