import React, { Component } from "react";
import { Link } from "react-router-dom";

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
} from "reactstrap";

const DEFAULT_STATE = {
  goalName: "",
  goalDescription: "",
  goalDueDate: 0,
  goalTarget: 0,
};

class GoalDetails extends Component {
  state = {
    ...DEFAULT_STATE,
    errorMessage: "",
    successMessage: "",
  };

  toggleDetailsOff = () => {
    this.props.isDone();
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
          console.log(currentUser);
          return (
            <>
              <Card
                id="new-goal-form"
                className="bg-secondary shadow border-0 "
              >
                <CardHeader className="bg-transparent brand-logo">
                  <div className="text-center">
                    <h2 className="title"></h2>
                    <p className="mb-0 text-muted">
                      To create your new goal, please input it's name, a
                      description that will help you focus on it, a target value
                      (could be X books read, or % change in body weight), and a
                      due date to make sure you follow-through.
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5"></CardBody>
              </Card>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default GoalDetails;
