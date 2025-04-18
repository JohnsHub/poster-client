import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

const NavigationBar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Poster</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-nav" />
        <Navbar.Collapse id="basic-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/"><FaHome /> Home</Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/login"><FaSignInAlt /> Login</Nav.Link>
                <Nav.Link as={Link} to="/register"><FaUserPlus /> Register</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={logout}><FaSignOutAlt /> Logout</Nav.Link>
                <Nav.Link disabled>Hi, @{auth.user.username}</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
