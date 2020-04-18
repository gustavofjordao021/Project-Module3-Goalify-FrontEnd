import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/index";

import UserNavbar from "../Navbar/HomeNavBar/HomeNavBar";

import "./Login.css";

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
  Col,
} from "reactstrap";

const Login = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        const {
          formLogin: { username, password },
          errorMessage,
          successMessage,
          isLoggedIn,
        } = context.state;

        const { handleLoginInput, handleLoginSubmit } = context;
        return (
          <>
            {isLoggedIn ? (
              <Redirect to="/app" />
            ) : (
              <>
                <UserNavbar />
                <Container id="signup-container">
                  <Card
                    id="signup-card"
                    className="bg-secondary shadow border-0 "
                  >
                    <CardHeader className="bg-transparent brand-logo">
                      <div className="text-muted mt-2 mb-2 brand-logo">
                        <img
                          src={require("../../assets/img/brand/logo-goalify.svg")}
                          alt="brand-logo"
                        />
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <p>Login below</p>
                      </div>
                      <Form onSubmit={handleLoginSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="username"
                              name="username"
                              type="text"
                              value={username}
                              placeholder="Name"
                              autoComplete="username"
                              onChange={handleLoginInput}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              placeholder="Password"
                              autoComplete="current-password"
                              onChange={handleLoginInput}
                            />
                          </InputGroup>
                        </FormGroup>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span className="text-muted">Remember me</span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        {errorMessage ? (
                          <Alert color="danger">{errorMessage}</Alert>
                        ) : successMessage ? (
                          <Alert color="success">{successMessage}</Alert>
                        ) : (
                          <span></span>
                        )}
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            Login
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Container>
              </>
            )}
          </>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Login;
