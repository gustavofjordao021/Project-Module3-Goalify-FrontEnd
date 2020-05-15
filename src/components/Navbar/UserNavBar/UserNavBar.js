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
          const { userLogOut, isUserLoggedIn } = context;
          const { currentUser } = context.state;
          return (
            <Navbar
              className="navbar-horizontal navbar-dark bg-primary"
              expand="lg"
            >
              <Container>
                <Link to="/app" className="navbar-nav navbar-brand">
                  <div className="center-logo">
                    <img
                      alt="reversed logo"
                      src={require("../../../assets/img/brand/logo-goalify-reverse.svg")}
                      className="mr-2"
                    />{" "}
                    <span className="hello-user" id="center-logo">
                      Goalify
                    </span>
                  </div>
                </Link>
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
                        <Link to="/app">
                          <img
                            alt="reversed logo"
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
                    {isUserLoggedIn ? (
                      <>
                        <NavItem className="mr-3">
                          <Link
                            to={"/app/user-profile"}
                            className="hello-user text-muted"
                          >
                            Welcome,
                            <span>
                              <img
                                src={currentUser.avatar}
                                className="avatar-sm rounded-circle m-2"
                                alt="user-logo"
                              />
                            </span>
                            <b>{currentUser.username}</b>
                          </Link>
                        </NavItem>
                      </>
                    ) : (
                      <span></span>
                    )}

                    <NavItem>
                      <Link to={"/app/user-profile"}>
                        <Button color="default" type="button">
                          Profile
                        </Button>
                      </Link>
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
