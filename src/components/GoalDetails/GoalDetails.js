import React, { Component } from "react";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./GoalDetails.css";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class GoalDetails extends Component {
  state = {
    goalName: "",
    goalDescription: "",
    goalDueDate: 0,
    goalTarget: 0,
    userGoals: [],
    errorMessage: "",
    successMessage: "",
    isGoalFormVisible: false,
  };

  componentWillMount = () => {
    GOAL_SERVICE.retrieveGoals()
      .then((responseFromServer) => {
        const goalId = this.props.match.params;
        let selectedGoal = responseFromServer.data.filter(
          (eachGoal) => eachGoal._id === goalId.goalId
        )[0];
        console.log(selectedGoal);
        this.setState((prevState) => ({
          ...prevState,
          userGoals: responseFromServer.data,
          goalName: selectedGoal.goalName,
          goalDescription: selectedGoal.goalDescription,
          goalDueDate: selectedGoal.goalDueDate,
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
      goalDueDate: goal.goalDueDate,
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

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { goalName, goalDescription, goalDueDate, goalTarget } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser } = context;
          const { currentUser, successMessage, errorMessage } = context.state;
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
                          <div className="text-center">
                            <h2 className="title">{goalName}</h2>
                            <div className="details-container">
                              <p className="mb-0 text-muted">
                                {goalDescription}
                              </p>
                              <p className="mb-0 text-muted">{goalDueDate}</p>
                              <p className="mb-0 text-muted">{goalTarget}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5"></CardBody>
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
