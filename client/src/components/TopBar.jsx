import { useContext } from 'react';
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarText, NavbarToggle } from 'react-bootstrap';

import AuthContext from '../context/AuthProvider';

const TopBar = () => {
  const { auth } = useContext(AuthContext);

  console.log(auth);

  return (
    <Navbar bg='dark' variant='dark' expand="lg">
      <Container>
        <NavbarBrand>TaskFlow</NavbarBrand>
        <NavbarToggle />

        <NavbarCollapse>
          <Nav>
            <NavbarText>
              {auth.user?.name}
            </NavbarText>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
