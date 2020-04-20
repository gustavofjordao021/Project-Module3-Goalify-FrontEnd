import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../context/index";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalDetails from "../GoalDetails/GoalDetails";
import NewGoal from "../NewGoal/NewGoal";

import "./Application.css";

import {
  UncontrolledCollapse,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
} from "reactstrap";

class Application extends Component {
  state = {
    isGoalFormVisible: false,
    isGoalDetailsVisible: false,
  };

  toggleGoalFormOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isGoalFormVisible: true,
    }));
  };

  toggleGoalFormOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isGoalFormVisible: false,
    }));
  };

  toggleGoalDetailsOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isGoalDetailsVisible: true,
    }));
  };

  toggleGoalDetailsOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isGoalDetailsVisible: false,
    }));
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
                      <Card className="fixed-height bg-secondary shadow column-container">
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
                        <Container className="goal-container">
                          <UncontrolledCollapse toggler="#toggler">
                            {currentUser.goals.length > 0 ? (
                              currentUser.goals.map((goal, index) => {
                                const { goalName, _id } = goal;
                                return (
                                  <Link
                                    to={`/app/goal-details/${_id}`}
                                    key={index}
                                  >
                                    <Button
                                      className="mt-2 mr-2 mb-2"
                                      color="link"
                                      onClick={() => this.toggleGoalDetailsOn()}
                                    >
                                      <span
                                        id="main-cta"
                                        className="m-4"
                                        role="img"
                                        aria-label="goal"
                                      >
                                        🎯 {goalName}
                                      </span>
                                    </Button>
                                  </Link>
                                );
                              })
                            ) : (
                              <>
                                <div className="text-center text-muted m-4">
                                  <p className="m-0">
                                    You have no goals!{" "}
                                    <span role="img" aria-label="shocked">
                                      😱
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}
                          </UncontrolledCollapse>
                        </Container>
                        <div className="button-container mb-4">
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
                      <Card className="fixed-height bg-secondary shadow app-container">
                        {this.state.isGoalFormVisible ? (
                          <NewGoal isDone={this.toggleGoalFormOff} />
                        ) : this.state.isGoalDetailsVisible ? (
                          <GoalDetails isDone={this.toggleGoalDetailsOff} />
                        ) : (
                          <>
                            <span className="text-center m-4">
                              <p className="text-muted card-text">
                                Select a goal on the left, or click below to
                                create a new goal
                              </p>
                              <Button
                                id="secondary-goal-add"
                                color="secondary"
                                className="align-items-center title"
                                onClick={() => this.toggleGoalFormOn()}
                              >
                                <span id="main-cta">Add New Goal</span>
                              </Button>
                            </span>
                          </>
                        )}
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
