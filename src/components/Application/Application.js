import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/index';

import './Application.css'

import {
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
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

const Application = () => {
    return (
        <AuthContext.Consumer>
        {context => {
          const {
            currentUser
          } = context.state;

          return (
            <> 
            <Navbar
            className="navbar-horizontal navbar-dark bg-primary"
            expand="lg"
            >
            <Container>
                <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
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
                            src={require("../../assets/img/brand/logo-goalify.svg")}
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
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                        Discover <span className="sr-only">(current)</span>
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                        Profile
                    </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav>
                    <NavLink
                        aria-expanded={false}
                        aria-haspopup={true}
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbar-primary_dropdown_1"
                        onClick={e => e.preventDefault()}
                        role="button"
                    >
                        Settings
                    </NavLink>
                    <DropdownMenu
                        aria-labelledby="navbar-primary_dropdown_1"
                        right
                    >
                        <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        >
                        Action
                        </DropdownItem>
                        <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        >
                        Another action
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        >
                        Something else here
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                </UncontrolledCollapse>
            </Container>
            </Navbar>
            <Row className="app-container">
                <Col className="col-3 mt-4 ml-4 fixed-height">
                    <Card className="fixed-height bg-secondary shadow">
                    <CardHeader className="p-1">
                        <Row className="align-items-center">
                            <Col>
                                <Button color="link" id="toggler"><h2 className="mb-0 title">Goals</h2></Button>
                                <img className="ml-9" id="icon" src={require("../../assets/img/icons/noun_go down_1921096 copy.png")}/>
                            </Col>
                        </Row>
                    </CardHeader>
                    <UncontrolledCollapse toggler="#toggler">
                        <Link to="/login"><Button className="mt-2 mr-2 mb-2" color="link"><span id="main-cta" className="m-4">🎯 Login now</span></Button></Link>
                    </UncontrolledCollapse>      
                    </Card>
                </Col>
                <Col className="col-8 mt-4 mr-4">
                    <Card className="fixed-height shadow">    
                    </Card>
                </Col>
            </Row>
            </>
            );
        }}
        </AuthContext.Consumer>
)};

export default Application;