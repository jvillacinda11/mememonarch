import { useState, useEffect } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from 'reactstrap'
import { Link } from 'react-router-dom'
import User from '../../utils/User'
import './AppBar.css'
import Logo from '../../assets/images/monarch.gif'

const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleLogOut = () => {
    localStorage.removeItem('user')
    window.location = '/login'
  }

  useEffect(() => {
    User.profile()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [])
  return (
    <Navbar color='light' light expand='md'>
      <img id="logo" src={Logo} alt="King Pepe" />
      <Link to='/' className='link'>
        <NavbarBrand>MemeMonarch</NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <InputGroup id="searchBar">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Search</InputGroupText>
            </InputGroupAddon>
            <Input />
          </InputGroup>
        </Nav>
        <Nav navbar>
          {
            !isLoggedIn &&
            <NavItem>
              <Link to='/login' className='link'>
                <NavLink>Register/Login</NavLink>
              </Link>
            </NavItem>
          }
          {
            isLoggedIn &&
            <>
              <NavItem>
                <Link to='/profile' className='link'>
                  <NavLink>My Profile</NavLink>
                </Link>
              </NavItem>
              {/* <NavItem>
                  <Link to='/' className='link'>
                    <NavLink>Home</NavLink>
                  </Link>
                </NavItem> */}
              <NavItem>
                <NavLink onClick={handleLogOut}>Log Out</NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppBar