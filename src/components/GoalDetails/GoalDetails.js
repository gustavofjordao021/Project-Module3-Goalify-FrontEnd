import React, { Component } from "react";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import UpdateGoal from "../UpdateGoal/UpdateGoal";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./GoalDetails.css";

import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class GoalDetails extends Component {
  state = {
    goalName: "",
    goalDescription: "",
    goalDueDate: 0,
    goalTarget: 0,
    userGoals: [],
    errorMessage: "",
    successMessage: "",
    toggleGoalDetail: false,
    isGoalFormVisible: false,
  };

  componentWillMount = () => {
    GOAL_SERVICE.retrieveGoals()
      .then((responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        const correctDate = selectedGoal.goalDueDate.substring(0, 9);
        this.setState((prevState) => ({
          ...prevState,
          userGoals: responseFromServer.data,
          goalName: selectedGoal.goalName,
          goalDescription: selectedGoal.goalDescription,
          goalDueDate: correctDate,
          goalTarget: selectedGoal.goalTarget,
        }));
      })
      .catch((errorMessage) => console.log(errorMessage));
  };

  updateGoals = (key) => {
    let goal = this.state.userGoals.filter((goals) => goals._id === key)[0];
    this.setState((prevState) => ({
      ...prevState,
      goalName: goal.goalName,
      goalDescription: goal.goalDescription,
      goalDueDate: goal.goalDueDate.substring(0, 9),
      goalTarget: goal.goalTarget,
    }));
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
      toggleGoalDetail: true,
    }));
  };

  toggleGoalDetailsOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      toggleGoalDetail: false,
    }));
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { goalName, goalTarget, goalDueDate, toggleGoalDetail } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser } = context;
          const { currentUser, successMessage, errorMessage } = context.state;
          const userActions = currentUser.goals.filter(
            (goals) => goals._id === this.props.match.params.goalId
          )[0].goalActions;
          return (
            <>
              <UserNavBar />
              <Row className="app-container">
                <GoalSlider
                  userLoggedIn={currentUser}
                  passedDownToggleGoalForm={() => this.toggleGoalFormOn()}
                  passedDownGoalSelector={(key) => this.updateGoals(key)}
                />
                <Col className="col-8 mt-4 mr-4">
                  <Card className="fixed-height bg-secondary shadow app-container">
                    {this.state.isGoalFormVisible ? (
                      <NewGoal isDone={this.toggleGoalFormOff} />
                    ) : (
                      <Card
                        id="new-goal-form"
                        className="bg-secondary shadow border-0"
                      >
                        <CardHeader className="bg-transparent brand-logo">
                          {!toggleGoalDetail ? (
                            <div className="text-center details-container">
                              <div className="title-container mb-4">
                                <h2 className="title mr-3 mb-0">{goalName}</h2>
                                <i
                                  className="ni ni-settings mr-3"
                                  onClick={() => this.toggleGoalDetailsOn()}
                                />
                              </div>
                              <div className="details-container">
                                <p className="m-0 pt-2 pb-2 pl-4 pr-4">
                                  <i className="ni ni-calendar-grid-58 mr-3" />{" "}
                                  {goalDueDate}
                                </p>
                                <p className="m-0 pt-2 pb-2 pl-4 pr-4">
                                  <i className="ni ni-compass-04 mr-3" />{" "}
                                  {goalTarget}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <UpdateGoal
                              isDone={this.toggleGoalDetailsOff}
                              goalInfo={this.state}
                              updateGoalId={this.props.match.params}
                              syncUpdate={syncUser}
                            />
                          )}
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                          {currentUser ? (
                            userActions.length > 0 ? (
                              userActions.map((action, index) => {
                                console.log(action);
                              })
                            ) : (
                              <>
                                <div className="text-center text-muted m-4">
                                  <p className="m-0">
                                    You have no actions!{" "}
                                    <span role="img" aria-label="shocked">
                                      😱
                                    </span>
                                    <Button
                                      id="secondary-goal-add"
                                      color="secondary"
                                      className="align-items-center title"
                                      onClick={() => this.toggleGoalFormOn()}
                                    >
                                      <span id="main-cta">
                                        Create new action
                                      </span>
                                    </Button>
                                  </p>
                                </div>
                              </>
                            )
                          ) : (
                            <span></span>
                          )}
                          {/* {currentUser.goals.atoggleGoalDetail ? (
                            <div className="text-center details-container">
                              <div className="title-container mb-4">
                                <h2 className="title mr-3 mb-0">{goalName}</h2>
                                <i
                                  className="ni ni-settings mr-3"
                                  onClick={() => this.toggleGoalDetailsOn()}
                                />
                              </div>
                              <div className="details-container">
                                <p className="m-0 pt-2 pb-2 pl-4 pr-4">
                                  <i className="ni ni-calendar-grid-58 mr-3" />{" "}
                                  {goalDueDate}
                                </p>
                                <p className="m-0 pt-2 pb-2 pl-4 pr-4">
                                  <i className="ni ni-compass-04 mr-3" />{" "}
                                  {goalTarget}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <UpdateGoal
                              isDone={this.toggleGoalDetailsOff}
                              goalInfo={this.state}
                              updateGoalId={this.props.match.params}
                            />
                          )} */}
                        </CardBody>
                      </Card>
                    )}
                  </Card>
                </Col>
              </Row>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default GoalDetails;
