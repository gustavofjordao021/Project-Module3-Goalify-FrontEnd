import React, { Component } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context";

import "./UserNavBar.css";

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class UserNavBar extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { userLogOut } = context;
          return (
            <Navbar
              className="navbar-horizontal navbar-dark bg-primary"
              expand="lg"
            >
              <Container>
                <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                  Primary Color
                </NavbarBrand>
                <button
                  aria-controls="navbar-primary"
                  aria-expanded={false}
                  aria-label="Toggle navigation"
                  className="navbar-toggler"
                  data-target="#navbar-primary"
                  data-toggle="collapse"
                  id="navbar-primary"
                  type="button"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <UncontrolledCollapse navbar toggler="#navbar-primary">
                  <div className="navbar-collapse-header">
                    <Row>
                      <Col className="collapse-brand" xs="6">
                        <Link to="/">
                          <img
                            alt="..."
                            src={require("../../../assets/img/brand/logo-goalify.svg")}
                          />
                        </Link>
                      </Col>
                      <Col className="collapse-close" xs="6">
                        <button
                          aria-controls="navbar-primary"
                          aria-expanded={false}
                          aria-label="Toggle navigation"
                          className="navbar-toggler"
                          data-target="#navbar-primary"
                          data-toggle="collapse"
                          id="navbar-primary"
                          type="button"
                        >
                          <span />
                          <span />
                        </button>
                      </Col>
                    </Row>
                  </div>
                  <Nav className="ml-lg-auto" navbar>
                    <NavItem>
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Discover <span className="sr-only">(current)</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav>
                      <NavLink role="button">
                        <Button color="danger" onClick={userLogOut}>
                          Logout
                        </Button>
                      </NavLink>
                      <DropdownMenu
                        aria-labelledby="navbar-primary_dropdown_1"
                        right
                      >
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </UncontrolledCollapse>
              </Container>
            </Navbar>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default UserNavBar;
