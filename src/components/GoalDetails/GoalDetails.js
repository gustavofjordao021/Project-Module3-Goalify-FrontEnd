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

class GoalDetails extends Component {
  state = {
    goalName: "",
    goalDescription: "",
    goalDueDate: 0,
    goalTarget: 0,
    errorMessage: "",
    successMessage: "",
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
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default GoalDetails;
