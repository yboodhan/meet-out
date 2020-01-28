import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Input, Navbar, NavbarBrand, Nav as Navi, NavItem, NavLink, NavbarText} from 'reactstrap';

const Nav: React.FC = props => {
    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">MO ☀︎</NavbarBrand>
          
            <Form inline>
                <Col m={12}>
                    <Input type="text" placeholder="Search" autofocus="autofocus"/>
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