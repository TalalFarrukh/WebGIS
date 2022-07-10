import React from 'react'
import {Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useLocation} from 'react-router-dom'

const Header = () => {

  const location = useLocation()

  const kmlDownload = (e) => {
    e.preventDefault()

    var form = document.createElement("form");
    form.method = "POST";
    form.action = "http://localhost:8080/geoserver/wfs?";
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "request";
    input.value = "GetFeature";
    form.appendChild(input);

    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "service";
    input.value = "WFS";
    form.appendChild(input);

    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "version";
    input.value = "1.0.0";
    form.appendChild(input);

    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "outputFormat"
    input.value = "kml";
    form.appendChild(input);

    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "typeName";
    input.value = 'webProject:store';
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

  }

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              {location.pathname==='/Home/' ? <LinkContainer to='/'><Navbar.Brand className='center-navbar'>Product Tracker</Navbar.Brand></LinkContainer>
               : location.pathname==='/Admin/' ? <LinkContainer to='/Admin/'><Navbar.Brand className='center-navbar'>Product Tracker</Navbar.Brand></LinkContainer> 
               : null}
              
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>

              <Nav className='ms-auto'>
                <NavDropdown title='Download Shops' id='basic-nav-dropdown'>
                  <Button variant="outline-primary" type='button' onClick={kmlDownload}><NavDropdown.Item>KML format</NavDropdown.Item></Button>
                </NavDropdown>
              </Nav>

              <Nav className='ms-auto'>
                {location.pathname==='/Admin/' ? <LinkContainer to='/'><Nav.Link><i className='fas fa-user'></i>Logout</Nav.Link></LinkContainer> :
                location.pathname==='/Home/' ? <LinkContainer to='/storeowner/login'><Nav.Link><i className='fas fa-user'></i>Login as Store Owner</Nav.Link></LinkContainer>
                : null}
              </Nav>

              </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header