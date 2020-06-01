import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/index";

import "./ApplicationHome.css";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import { Row, Col, Card, Button } from "reactstrap";

class ApplicationHome extends Component {
  state = {
    isGoalFormVisible: false,
  };

  componentDidMount = () => {
    new Notification("Hi there!");
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
                      <Card className="fixed-height bg-secondary shadow main-container">
                        {this.state.isGoalFormVisible ? (
                          <NewGoal isDone={this.toggleGoalFormOff} />
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

export default ApplicationHome;
