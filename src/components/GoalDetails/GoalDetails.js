import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import UpdateGoal from "../UpdateGoal/UpdateGoal";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";
import NewAction from "../NewAction/NewAction";
import ActionLine from "../ActionLine/ActionLine";
import ProgressBar from "../ProgressBar/ProgressBar";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";
import ACTION_SERVICE from "../../services/ActionService";

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
  _isMounted = false;
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
    isActionUpdateVisible: false,
  };

  componentDidMount = () => {
    this._isMounted = true;
    GOAL_SERVICE.retrieveGoals()
      .then(async (responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        const correctDate = selectedGoal.goalDueDate.substring(0, 10);
        if (this._isMounted) {
          this.setState((prevState) => ({
            ...prevState,
            userGoals: responseFromServer.data,
            goalName: selectedGoal.goalName,
            goalDueDate: correctDate,
            goalTarget: selectedGoal.goalTarget,
          }));
        }
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

  componentWillUnmount = () => {
    this._isMounted = false;
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

  actionCheck = (actionId, syncUser, syncUpdate) => {
    const goalId = this.props.match.params.goalId;
    ACTION_SERVICE.actionCheck(goalId, actionId)
      .then((responseFromServer) => {
        const { updatedUser } = responseFromServer.data;
        syncUser(updatedUser);
        const {
          data: { errorMessage, successMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            errorMessage,
            displayForm: this.props.isShown,
          });
        } else {
          this.setState({
            successMessage,
            displayForm: false,
          });
          syncUser(updatedUser);
          syncUpdate();
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState((prevState) => ({
            ...prevState,
            errorMessage: err.response.data.message,
          }));
        }
      });
  };

  actionUncheck = (actionId, syncUser, syncUpdate) => {
    const goalId = this.props.match.params.goalId;
    ACTION_SERVICE.actionUncheck(goalId, actionId)
      .then((responseFromServer) => {
        const { updatedUser } = responseFromServer.data;
        syncUser(updatedUser);
        const {
          data: { errorMessage, successMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            errorMessage,
            displayForm: this.props.isShown,
          });
        } else {
          this.setState({
            successMessage,
            displayForm: false,
          });
          syncUser(updatedUser);
          syncUpdate();
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState((prevState) => ({
            ...prevState,
            errorMessage: err.response.data.message,
          }));
        }
      });
  };

  toggleActionUpdateFormOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isActionUpdateVisible: true,
    }));
  };

  toggleActionUpdateFormOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isActionUpdateVisible: false,
    }));
  };

  render() {
    const {
      goalName,
      goalTarget,
      goalDueDate,
      toggleGoalDetail,
      isActionFormVisible,
      isActionUpdateVisible,
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
                                <div className="details-container">
                                  <div className="title-container pl-4">
                                    <div className="full-width">
                                      <h1 className="title mr-3 mb-0">
                                        {goalName}
                                        <i
                                          className="ni ni-settings mr-3 edit-icon"
                                          onClick={() =>
                                            this.toggleGoalDetailsOn()
                                          }
                                        />
                                      </h1>
                                    </div>
                                    <div className="full-width">
                                      <p className="m-0 pt-2 pb-2 pr-4">
                                        <i className="ni ni-calendar-grid-58 mr-3" />{" "}
                                        {goalDueDate}
                                      </p>
                                    </div>
                                    <div className="full-width">
                                      <p className="m-0 pt-2 pb-2 pr-4">
                                        <i className="ni ni-compass-04 mr-3" />{" "}
                                        {goalTarget}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="title-container">
                                    <div className="full-width align-items-left">
                                      <h1 className="text-muted">
                                        Progress:{" "}
                                        <ProgressBar
                                          userData={currentUser}
                                          {...this.props}
                                        />
                                      </h1>
                                    </div>
                                    <div className="full-width">Actions:</div>
                                    <div className="full-width">Completed:</div>
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
                                          .goalActions.map((action) => {
                                            return (
                                              <>
                                                <ActionLine
                                                  {...this.props}
                                                  actionId={action._id}
                                                  actionData={action}
                                                  isUpdating={
                                                    isActionUpdateVisible
                                                  }
                                                  toggleUpdateFormOn={
                                                    this
                                                      .toggleActionUpdateFormOn
                                                  }
                                                  toggleUpdateFormOff={
                                                    this
                                                      .toggleActionUpdateFormOff
                                                  }
                                                  checkAction={() =>
                                                    this.actionCheck(
                                                      action._id,
                                                      syncUser,
                                                      isLoggedIn
                                                    )
                                                  }
                                                  uncheckAction={() =>
                                                    this.actionUncheck(
                                                      action._id,
                                                      syncUser,
                                                      isLoggedIn
                                                    )
                                                  }
                                                />
                                              </>
                                            );
                                          })
                                      ) : !isActionFormVisible ? (
                                        <>
                                          <tr key={"actionCTA"}>
                                            <td className="p-0" colSpan="4">
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
                                          </tr>
                                        </>
                                      ) : (
                                        <tr key={"empty2"}></tr>
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
                                        <tr key={"empty3"}></tr>
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
