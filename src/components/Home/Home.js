import React from "react";
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../context/index';

import './Home.css';

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

const Home = () => {
    return (
      <AuthContext.Consumer>
        {context => {
          const {isLoggedIn} = context.state;
          return (
            <>
            {isLoggedIn ? (
              <Redirect to='/' />
            ) : (
            <>
            <Container className="home-container">
              <Row>
                <Col className="mt-4 ml-3 mr-4 mb-4">
                  <Card>
                    <h1 id="hero-title" className="ml-4 mt-4 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                    <CardBody>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit laoreet id donec ultrices tincidunt. Mattis enim ut tellus elementum sagittis vitae et.</p>
                      <Link to="/signup"><Button className="mt-2 mr-2 mb-2" color="primary"><span id="main-cta" className="m-4">Start for free</span></Button></Link>
                      <Link to="/signup"><Button className="mt-2 mr-2 mb-2" color="link"><span id="main-cta" className="m-4">Login now</span></Button></Link>                
                    </CardBody>
                  </Card>
                </Col>
                <Col className="m-4">
                  <img id="hero-image" src={require("../../assets/img/brand/home-hero.svg")} alt="brand-logo"/>
                </Col>
              </Row>
            </Container>
            </>
            )}
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Home;
