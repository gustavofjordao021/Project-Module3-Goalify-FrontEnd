import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserNavBar from "../Navbar/UserNavBar/UserNavBar";
import GoalSlider from "../GoalSlider/GoalSlider";
import NewGoal from "../NewGoal/NewGoal";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./GoalDetails.css";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class GoalDetails extends Component {
  state = {
    goalName: "",
    goalDescription: "",
    goalDueDate: 0,
    goalTarget: 0,
    errorMessage: "",
    successMessage: "",
    isGoalFormVisible: false,
  };

  componentDidMount() {
    const { goalId } = this.props.match.params;
    GOAL_SERVICE.retrieveGoal(goalId)
      .then((responseFromServer) => {
        const {
          goalName,
          goalDescription,
          goalDueDate,
          goalTarget,
        } = responseFromServer.data;
        this.setState({
          goalName,
          goalDescription,
          goalDueDate,
          goalTarget,
        });
      })
      .catch();
  }

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
                />
                <Col className="col-8 mt-4 mr-4">
                  <Card className="fixed-height bg-secondary shadow app-container">
                    {this.state.isGoalFormVisible ? (
                      <NewGoal isDone={this.toggleGoalFormOff} />
                    ) : (
                      <Card
                        id="new-goal-form"
                        className="bg-secondary shadow border-0 "
                      >
                        <CardHeader className="bg-transparent brand-logo">
                          <div className="text-center">
                            <h2 className="title">{goalName}</h2>
                            <p className="mb-0 text-muted">{goalDescription}</p>
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
