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
    newGoalForm: false,
  };

  toggleGoalFormOn() {
    this.setState({
      newGoalForm: true,
    });
  }

  toggleGoalFormOff(status) {
    status
      ? this.setState({
          newGoalForm: false,
        })
      : this.setState({
          newGoalForm: false,
        });
  }

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
                          {currentUser.goals.map((goal) => {
                            const { goalName } = goal;
                            return (
                              <Link to="/login">
                                <Button className="mt-2 mr-2 mb-2" color="link">
                                  <span id="main-cta" className="m-4">
                                    🎯 {goalName}
                                  </span>
                                </Button>
                              </Link>
                            );
                          })}
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
                          isShown={this.state.newGoalForm}
                          isDone={(status) =>
                            this.state.toggleGoalFormOff(status)
                          }
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
