import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";

function Navigation() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Navbar className="py-3" bg="primary" variant="dark" expand="lg">
      <Container className="mw-100 mx-3">
        <Navbar.Brand as={Link} to="/">
          $ Financial Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {context.user?._userId ? (
              <Nav.Link
                onClick={() => {
                  context.setUser({});
                  navigate("/Login");
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
