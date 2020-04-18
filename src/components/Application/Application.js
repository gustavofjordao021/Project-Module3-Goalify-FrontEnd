import React, { Component } from "react";
import { Redirect, Router, Switch, Link } from "react-router-dom";
import { AuthContext } from "../../context/index";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import NewGoal from "../Modals/NewGoal/NewGoal";

import "./Application.css";

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

class Application extends Component {
  state = {
    isGoalFormVisible: false,
  };

  toggleGoalFormOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isGoalFormVisible: true,
    }));
  };

  toggleGoalFormOff = () => {
    this.setState({
      isGoalFormVisible: false,
    });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { currentUser, isLoggedIn } = context.state;
          return (
            <>
              {!isLoggedIn ? (
                <Redirect to="/login" />
              ) : (
                <>
                  <UserNavBar />
                  <Row className="app-container">
                    <Col className="col-3 mt-4 ml-4 fixed-height">
                      <Card className="fixed-height bg-secondary shadow">
                        <CardHeader className="p-1">
                          <Row className="align-items-center">
                            <Col>
                              <Button
                                color="link"
                                id="toggler"
                                className="toggling-button"
                              >
                                <h2 className="mb-0 title">Goals</h2>
                                <i className="ni ni-bold-left"></i>
                              </Button>
                            </Col>
                          </Row>
                        </CardHeader>
                        <UncontrolledCollapse toggler="#toggler">
                          {currentUser.goals.length > 0 ? (
                            currentUser.goals.map((goal, index) => {
                              const { goalName } = goal;
                              return (
                                <Link to="/login" key={index}>
                                  <Button
                                    className="mt-2 mr-2 mb-2"
                                    color="link"
                                  >
                                    <span id="main-cta" className="m-4">
                                      🎯 {goalName}
                                    </span>
                                  </Button>
                                </Link>
                              );
                            })
                          ) : (
                            <>
                              <div className="text-center text-muted m-4">
                                <p className="m-0">You have no goals! 😱</p>
                              </div>
                            </>
                          )}
                        </UncontrolledCollapse>
                        <div className="center-container">
                          <div className="full-width ml-3 mr-3">
                            <hr className="ml-3 mr-3 mb-3 mt-2" />
                          </div>
                          <Button
                            color="primary"
                            className="align-items-center"
                            onClick={() => this.toggleGoalFormOn()}
                          >
                            <i className="ni ni-fat-add"></i>
                            <span id="main-cta">Add New Goal</span>
                          </Button>
                        </div>
                      </Card>
                    </Col>
                    <Col className="col-8 mt-4 mr-4">
                      <Card className="fixed-height shadow">
                        <NewGoal
                          isShown={this.state.isGoalFormVisible}
                          isDone={this.toggleGoalFormOff}
                        />
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Application;
