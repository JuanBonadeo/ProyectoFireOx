import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Logo/Logo';
import '../NavBar/navbar.css';
import CartIcon from '../CartIcon/CartIcon';
import { Link } from 'react-router-dom';



function Header() {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar expand="xl" className="navBar dark fixed-top" data-bs-theme="light" expanded={expanded}>
      <Container className='mobileContainerNav'>
        <Logo className='logo'/>
        <div className="mobileContainerNavRight">
          <CartIcon className="mobile"/>
          <Navbar.Toggle  aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navLinks" onSelect={closeNavbar}>
            <Link to="/" className="primary" onClick={closeNavbar}>Inicio</Link>
            <Link to='/categoria/quemadores' className="primary" >Quemadores</Link>
            <Link to="/categoria/fogoneros" className="primary" onClick={closeNavbar}>Fogoneros</Link>
            <Link to="/categoria/tablas" className="primary" onClick={closeNavbar}>Tablas & Cuchillos</Link>
            <Link to="/categoria/parrillas" className="primary" onClick={closeNavbar}>Parrillas</Link>
            <Link to="/categoria/braseros" className="primary" onClick={closeNavbar}>Braseros</Link>
            <Link to="/categoria/ollas" className="primary" onClick={closeNavbar}>Cacerolas & Ollas</Link>
          </Nav>
        </Navbar.Collapse>
        <div className="desktopContainerNavRight">
          <CartIcon className="desktop" />
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
