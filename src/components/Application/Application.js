import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../context/index";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalDetails from "../GoalDetails/GoalDetails";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import "./Application.css";

import { Row, Col, Card, Button } from "reactstrap";

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
                    <GoalSlider
                      userLoggedIn={currentUser}
                      passedDownToggleGoalForm={() => this.toggleGoalFormOn()}
                    />
                    <Col className="col-8 mt-4 mr-4">
                      <Card className="fixed-height bg-secondary shadow app-container">
                        {this.state.isGoalFormVisible ? (
                          <NewGoal isDone={this.toggleGoalFormOff} />
                        ) : this.state.isGoalDetailsVisible ? (
                          <GoalDetails
                            userLoggedIn={currentUser}
                            isDone={this.toggleGoalDetailsOff}
                          />
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
