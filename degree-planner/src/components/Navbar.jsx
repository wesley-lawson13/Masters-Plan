import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/">Masters Plan</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-primary" className="me-2">Add Plan</Button>
          <Button variant="outline-danger">Log Out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}