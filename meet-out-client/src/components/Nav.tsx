import React from 'react'
import { Link } from 'react-router-dom'
import { Decoded } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Input, Navbar, NavbarBrand, Nav as Navi, NavItem, NavLink, NavbarText} from 'reactstrap';

interface NavProps {
    user: Decoded | null,
    updateUser: (newToken: string) => void
}

const Nav: React.FC<NavProps> = props => {

    // Define links
    let links = (
        <h1>HI</h1>
    )

    // Check user exists (select links)
    if (props.user) {
        links = (
            <h1>LINK</h1>
        )
    }

    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">MO ☀︎</NavbarBrand>
          
            <Form inline>
                <Col m={12}>
                    <Input type="text" name="search" placeholder="Search" autofocus="autofocus"/>
                </Col>
                <Button size="sm" type="submit" color="secondary"><FontAwesomeIcon icon={faSearch}/></Button>
            </Form>

            <Navi navbar>
              <NavItem>
                <NavLink href="#">User Name</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem>
            </Navi>

        </Navbar>
      </div>
    )
}

export default Nav