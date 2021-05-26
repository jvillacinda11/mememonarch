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
        if (data === null) {
          alert('not valid password or username')
        }
        else {
          localStorage.setItem('user', data)
          window.location = '/'
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <>
      <Row className= 'justify-content-around'>
        <Col md='4' xs='12' className= 'center'>
          <h2>Login</h2>
          <br />
          <Row>
          <Form inline onSubmit={handleLogin}>
            <Col xs='12' md='12' className='inputLine'>
            <FormGroup >
              <Input
                type='text'
                name='un'
                value={loginState.un}
                onChange={handleInputChange}
                placeholder='Username'
              />
            </FormGroup>
            </Col>
            
            <Col md='12' xs= '12' className= 'inputLine'>
            <FormGroup>
              <Input
                type='password'
                name='pw'
                value={loginState.pw}
                onChange={handleInputChange}
                placeholder='Password'
              />
            </FormGroup>
            </Col>
            <br />
            <Col xs='12' md= '12'>
              <Button onClick={handleLogin}>
                Login</Button>
            </Col>
          </Form>
          </Row>
        </Col>

        <Col md= '6' xs= '12'className=' center'>
          <h2>Register</h2>
          <br />
          <Row>
            <Form inline onSubmit={handleRegister}>
              <Col md='12' xs='12' className='inputLine'>
              <FormGroup>
                  <Input
                    type='text'
                    name='name'
                    value={loginState.name}
                    onChange={handleInputChange}
                    placeholder='Name'
                  />
              </FormGroup>
              </Col>
              <Col md='12' xs='12' className='inputLine'>
              <FormGroup>
                  <Input
                    type='email'
                    name='email'
                    value={loginState.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                  />
              </FormGroup>
              </Col>
              <Col md='12' xs='12' className='inputLine'>
              <FormGroup>
                  <Input
                    type='text'
                    name='username'
                    value={loginState.username}
                    onChange={handleInputChange}
                    placeholder='Username'
                  />
              </FormGroup>
              </Col>
              <Col md='12' xs='12' className='inputLine'>
              <FormGroup>
                  <Input
                    type='password'
                    name='password'
                    value={loginState.password}
                    onChange={handleInputChange}
                    placeholder='Password'
                  />
              </FormGroup>
              </Col>
              <Col md='12' xs='12' className='inputLine'>
              <FormGroup>
                  <Button onClick={handleRegister}>Register</Button>
              </FormGroup>
              </Col>
            </Form>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Login;