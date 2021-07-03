// Importing our components for our bootstrap navbar
import { Navbar, Nav, Container, Row, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import React from 'react';

// Creating our header as a componant that react can use
function Header() {
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

                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

// Exporting our Header function so that we can use it elsewhere
export default Header
