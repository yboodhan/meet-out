import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Decoded } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Input, Navbar, NavbarBrand, Nav as Navi, NavItem, NavLink } from 'reactstrap';

import Login from './Login'

interface NavProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Nav: React.FC<NavProps> = props => {

    // Logout
    const handleLogout = (e: FormEvent) => {
        e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
    }

    // Define links
    let links = (
        <Navi navbar>
            <NavbarBrand className="home-logo" href="/">MEET OUT</NavbarBrand>
            <Login />
        </Navi>
    )

    // Check user exists (select links)
    if (props.user) {
        links = (
        <Navi navbar>
            <NavbarBrand className="logo" href="/">MO</NavbarBrand>
            <Form inline>
                <Col m={12}>
                    <Input type="text" name="search" placeholder="Search" autofocus="autofocus"/>
                </Col>
                <Button size="sm" type="submit" color="secondary"><FontAwesomeIcon icon={faSearch}/></Button>
            </Form>

            <NavItem>
                <Link to="/profile">{props.user.firstname}</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Calendar</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Create</Link>
              </NavItem>
              <NavItem>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </NavItem>
        </Navi>
    )}

    return (
        <div>
        <Navbar color="light" light expand="md">

            {links}
            
        </Navbar>
      </div>
    )
}

export default Nav