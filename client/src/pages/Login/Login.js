import { useState } from 'react'

import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import User from '../../utils/User'

import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    un: '',
    pw: ''
  })

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleRegister = event => {
    event.preventDefault()
    User.register({
      name: loginState.name,
      email: loginState.email,
      username: loginState.username,
      password: loginState.password

    })
      .then(() => {
        alert('User registered!')
        setLoginState({ ...loginState, name: '', email: '', username: '', password: '' })
      })
      .catch(err => console.error(err))
  }

  const handleLogin = event => {
    event.preventDefault()
    User.login({
      username: loginState.un,
      password: loginState.pw
    })
      .then(({ data }) => {
        localStorage.setItem('user', data)
        window.location = '/'
      })
      .catch(err => console.error(err))
  }
  return (
    <>
      <Form inline onSubmit={handleLogin}>
        <Container className="center brown">
        <h1 className="searchBox">Login</h1>
          <Row>
            <Col xs="3" sm="4">
              <FormGroup >
                <Label htmlFor='un'>Username</Label>
                <Input
                  type='text'
                  name='un'
                  value={loginState.un}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col xs="3" sm="4">
              <FormGroup>
                <Label htmlFor='pw' >Password</Label>
                <Input
                  type='password'
                  name='pw'
                  value={loginState.pw}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col xs="1"sm="2">
              <Button onClick={handleLogin}>
              Login</Button>
            </Col>
          </Row>
        </Container>

      </Form>



      
        <Container className="center brown reg">
        <h1 className = "searchBox">Register</h1>
           <Form inline onSubmit={handleRegister}>
        <div className = "searchBox">
          
              
                <Label htmlFor='name' >Name</Label>
                <input className ="d-block form-control form-control-lg"
                  type='text'
                  name='name'
                  value={loginState.name}
                  onChange={handleInputChange}
                />
                
              
              
              
              
            
                 <Label htmlFor='email'>Email-Address</Label>
                
                <input className ="d-block form-control form-control-lg"
                  type='email'
                  name='email'
                  value={loginState.email}
                  onChange={handleInputChange}
                />
                
                        
               <Label htmlFor='username'>Username</Label> 
               <input className ="d-block form-control form-control-lg"
                  type='text'
                  name='username'
                  value={loginState.username}
                  onChange={handleInputChange}
                /> 
                
              
              
              
              
                <Label htmlFor='password'>Password</Label>
                <input className ="d-block form-control form-control-lg"
                  type='password'
                  name='password'
                  value={loginState.password}
                  onChange={handleInputChange}
                />
                
              
              
          
          <Button className= "w-100" onClick={handleRegister}>Register</Button>
          
            </div>
           </Form>
        </Container>
      





    </>
  );
}

export default Login;