import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/index";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import "./UserProfile.css";

import { Row, Col, Card, Button, CardHeader, CardBody } from "reactstrap";

class UserProfile extends Component {
  state = {
    isGoalFormVisible: false,
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
                      passedDownGoalSelector={(key) => this.updateGoals(key)}
                    />
                    <Col className="col-8 mt-4 mr-4">
                      <Card className="fixed-height bg-secondary shadow main-container">
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                          <div className="d-flex justify-content-between">
                            <div className="card-profile-image">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={currentUser.avatar}
                                />
                              </a>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <div className="text-center">
                            <h3>
                              Jessica Jones
                              <span className="font-weight-light">, 27</span>
                            </h3>
                            <div className="h5 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              Bucharest, Romania
                            </div>
                            <div className="h5 mt-4">
                              <i className="ni business_briefcase-24 mr-2" />
                              Solution Manager - Creative Tim Officer
                            </div>
                            <div>
                              <i className="ni education_hat mr-2" />
                              University of Computer Science
                            </div>
                            <hr className="my-4" />
                            <p>
                              Ryan — the name taken by Melbourne-raised,
                              Brooklyn-based Nick Murphy — writes, performs and
                              records all of his own music.
                            </p>
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Show more
                            </a>
                          </div>
                        </CardBody>
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

export default UserProfile;
