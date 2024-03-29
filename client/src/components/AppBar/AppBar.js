import { useState, useEffect } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import User from '../../utils/User'
import './AppBar.css'
import Logo from '../../assets/images/monarch.gif'

const AppBar = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => {
    setIsOpen(false)
    localStorage.removeItem('scrollPos')
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('searchUser')
    window.location = '/login'
  }

  useEffect(() => {
    User.profile()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [])
//        this is where my send to route search and the search text that will be sent there goes.cd

  return (
    <Navbar color='light' light expand='md' className='navbarmargin' fixed='top'>
      <img id="logo" src={Logo} alt="King Pepe" />
      <Link to='/' className='link'>
        <NavbarBrand onClick= {close}>MemeMonarch</NavbarBrand>
      </Link>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          {
            !isLoggedIn &&
            <>
            <NavItem onClick={close}>
              <Link to='/login' className='link'>
                <NavLink>Register/Login</NavLink>
              </Link>
            </NavItem>
            <NavItem onClick= {close}>
              <Link to = '/search' className ='link'>
                <NavLink>Search</NavLink>
              </Link>
            </NavItem>
            </>

          }
          {
            isLoggedIn &&
            <>
              <NavItem onClick={close}>
                <Link to='/profile' className='link'>
                  <NavLink>My Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem onClick={close}>
                <Link to='/Upload' className='link'>
                  <NavLink>Upload</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink className='link' onClick={handleLogOut}>Log Out</NavLink>
              </NavItem>
              <NavItem onClick={close}>
                <Link to='/search' className='link'>
                  <NavLink>Search</NavLink>
                </Link>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>     

    </Navbar>
  )
}

export default AppBar