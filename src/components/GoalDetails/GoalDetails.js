import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import UpdateGoal from "../UpdateGoal/UpdateGoal";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";
import NewAction from "../NewAction/NewAction";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./GoalDetails.css";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
} from "reactstrap";

class GoalDetails extends Component {
  state = {
    goalName: "",
    goalDueDate: 0,
    goalTarget: 0,
    userGoals: [],
    errorMessage: "",
    successMessage: "",
    toggleGoalDetail: false,
    isGoalFormVisible: false,
    isActionFormVisible: false,
  };

  componentWillMount = () => {
    GOAL_SERVICE.retrieveGoals()
      .then((responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        const correctDate = selectedGoal.goalDueDate.substring(0, 10);
        this.setState((prevState) => ({
          ...prevState,
          userGoals: responseFromServer.data,
          goalName: selectedGoal.goalName,
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
      goalDueDate: goal.goalDueDate.substring(0, 10),
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

  toggleActionFormOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isActionFormVisible: true,
    }));
  };

  toggleActionFormOff = () => {
    GOAL_SERVICE.retrieveGoals()
      .then((responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        const correctDate = selectedGoal.goalDueDate.substring(0, 10);
        this.setState((prevState) => ({
          ...prevState,
          userGoals: responseFromServer.data,
          goalName: selectedGoal.goalName,
          goalDescription: selectedGoal.goalDescription,
          goalDueDate: correctDate,
          goalTarget: selectedGoal.goalTarget,
          isActionFormVisible: false,
        }));
      })
      .catch((errorMessage) => console.log(errorMessage));
  };

  toggleGoalDetailsOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      toggleGoalDetail: true,
    }));
  };

  toggleGoalDetailsOff = () => {
    GOAL_SERVICE.retrieveGoals()
      .then((responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        const correctDate = selectedGoal.goalDueDate.substring(0, 10);
        this.setState((prevState) => ({
          ...prevState,
          userGoals: responseFromServer.data,
          goalName: selectedGoal.goalName,
          goalDescription: selectedGoal.goalDescription,
          goalDueDate: correctDate,
          goalTarget: selectedGoal.goalTarget,
          toggleGoalDetail: false,
        }));
      })
      .catch((errorMessage) => console.log(errorMessage));
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      goalName,
      goalTarget,
      goalDueDate,
      toggleGoalDetail,
      isActionFormVisible,
    } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser, isUserLoggedIn } = context;
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
                                    <h2 className="title mr-3 mb-0">
                                      {goalName}
                                    </h2>
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
                                  {...this.props}
                                  isDone={this.toggleGoalDetailsOff}
                                  goalInfo={this.state}
                                  updateGoalId={this.props.match.params}
                                  syncUpdate={isUserLoggedIn}
                                  syncUser={syncUser}
                                />
                              )}
                            </CardHeader>
                            <CardBody
                              className="px-lg-3 py-lg-3"
                              id="action-container"
                            >
                              {currentUser ? (
                                <>
                                  <Table hover>
                                    <thead>
                                      <tr>
                                        <th>Done?</th>
                                        <th>Action name</th>
                                        <th>Description</th>
                                        <th>Settings</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {currentUser.goals.filter(
                                        (goals) =>
                                          goals._id ===
                                          this.props.match.params.goalId
                                      )[0].goalActions.length > 0 ? (
                                        currentUser.goals
                                          .filter(
                                            (goals) =>
                                              goals._id ===
                                              this.props.match.params.goalId
                                          )[0]
                                          .goalActions.map((action, index) => {
                                            const {
                                              actionName,
                                              actionDescription,
                                            } = action;
                                            return (
                                              <tr key={index}>
                                                <td>{}</td>
                                                <td>{actionName}</td>
                                                <td>{actionDescription}</td>
                                                <td>
                                                  <Button
                                                    color="secondary"
                                                    className="btn-inner--icon"
                                                  >
                                                    <i
                                                      className="ni ni-settings"
                                                      id="icon-color"
                                                    />
                                                  </Button>
                                                </td>
                                              </tr>
                                            );
                                          })
                                      ) : (
                                        <>
                                          <tr>
                                            <th scope="row">1</th>
                                            <td className="p-0">
                                              {" "}
                                              <div className="text-center text-muted m-2">
                                                <p className="m-0">
                                                  You have no actions!{" "}
                                                  <span
                                                    role="img"
                                                    aria-label="shocked"
                                                  >
                                                    😱
                                                  </span>
                                                </p>
                                                <Button
                                                  id="secondary-goal-add"
                                                  color="link"
                                                  className="align-items-center title pt-0"
                                                  onClick={() =>
                                                    this.toggleActionFormOn()
                                                  }
                                                >
                                                  <span id="main-cta">
                                                    Create new action
                                                  </span>
                                                </Button>
                                              </div>
                                            </td>
                                            <td>
                                              <span></span>
                                            </td>
                                            <td>
                                              <span></span>
                                            </td>
                                          </tr>
                                        </>
                                      )}
                                      {currentUser.goals.filter(
                                        (goals) =>
                                          goals._id ===
                                          this.props.match.params.goalId
                                      )[0].goalActions.length > 0 &&
                                      !isActionFormVisible ? (
                                        <tr>
                                          <td colSpan="4">
                                            <div className="center-items">
                                              <Button
                                                id="secondary-goal-add"
                                                color="secondary"
                                                className="align-items-center title"
                                                onClick={() =>
                                                  this.toggleActionFormOn()
                                                }
                                              >
                                                <span id="main-cta">
                                                  Create new action
                                                </span>
                                              </Button>
                                            </div>
                                          </td>
                                        </tr>
                                      ) : (
                                        <span></span>
                                      )}
                                      <NewAction
                                        {...this.props}
                                        isDone={this.toggleActionFormOff}
                                        isVisible={isActionFormVisible}
                                        updateGoalId={this.props.match.params}
                                        syncUpdate={isUserLoggedIn}
                                        syncUser={syncUser}
                                      />
                                    </tbody>
                                  </Table>
                                </>
                              ) : (
                                <Redirect to="/login" />
                              )}
                            </CardBody>
                          </Card>
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

export default GoalDetails;
