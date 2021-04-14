import { useState, useEffect } from 'react'
import {
  Collapse,
  Navbar as NavigationBar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText

} from 'reactstrap'
import { Link } from 'react-router-dom'
import './AppBar.css'

const AppBar = () => {

  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)


  return (
    <>
      <NavigationBar color='light' light>
        <NavbarBrand href='/' className='mr-auto'>MemeMonarch</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className='mr-2' />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink>
                <Link to='/'>Home</Link>
                {/* <Link to='/week10-day04/' className='navLink'>Home</Link> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to='/Login'>Login</Link>
                {/* <Link to='/week10-day04/profile' className='navLink'>Profile</Link> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to='/Profile'>Profile</Link>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </NavigationBar>
    </>


  )

}

export default AppBar