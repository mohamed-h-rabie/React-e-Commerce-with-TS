import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";

const { headerContainer, headerLogo } = styles;

export default function Header() {
  return (
    <header>
      <div className={headerContainer}>
        <Nav.Link as={NavLink} to="/">
          <h1 className={headerLogo}>
            <span>Our</span>
            <Badge bg="info">eCom</Badge>
          </h1>
        </Nav.Link>
        <HeaderLeftBar />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="Login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
