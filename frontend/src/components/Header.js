import { useDispatch, useSelector } from 'react-redux'

// Importing our components for our bootstrap navbar
import { Navbar, Nav, Container, Row, NavDropdown, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import React from 'react';

import { logout } from '../actions/userActions'

// Creating our header as a componant that react can use
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>MySHOP</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>

                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

// Exporting our Header function so that we can use it elsewhere
export default Header
