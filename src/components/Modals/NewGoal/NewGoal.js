import React, { Component } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/index";
import GOAL_SERVICE from "../../../services/GoalService";

import "./NewGoal.css";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const DEFAULT_STATE = {
  goalName: "",
  goalDescription: "",
  goalDueDate: 0,
  goalTarget: 0,
};

class newGoalForm extends Component {
  state = {
    ...DEFAULT_STATE,
    errorMessage: "",
    successMessage: "",
  };

  toggleFormOff() {
    this.props.isDone();
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleNewGoalSubmit = (e, user, cb) => {
    e.preventDefault();
    GOAL_SERVICE.newGoal({
      ...this.state,
      goalOwner: user._id,
    })
      .then((responseFromServer) => {
        const { currentUser } = responseFromServer.data;
        cb(currentUser);
        const {
          data: { errorMessage, successMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            ...DEFAULT_STATE,
            errorMessage,
            displayForm: this.props.isShown,
          });
        } else {
          this.setState({
            ...DEFAULT_STATE,
            successMessage,
            displayForm: false,
          });
          this.props.isDone(this.state.isDone);
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

  render() {
    const { goalName, goalDescription, goalDueDate, goalTarget } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { currentUser, successMessage, errorMessage } = context.state;
          const { syncUser, userLogOut } = context;
          if (this.props.isShown) {
            return (
              <>
                <Card
                  id="new-goal-form"
                  className="bg-secondary shadow border-0 "
                >
                  <CardHeader className="bg-transparent brand-logo">
                    <div className="text-center">
                      <h2>Add new goal</h2>
                      <p className="mb-0">
                        To create your new goal, please input it's name, a
                        description that will help you focus on it, a target
                        value (could be X books read, or % change in body
                        weight), and a due date to make sure you follow-through.
                      </p>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form
                      onSubmit={(e) =>
                        this.handleNewGoalSubmit(e, currentUser, syncUser)
                      }
                    >
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            id="goalName"
                            name="goalName"
                            type="text"
                            value={goalName}
                            placeholder="Goal name"
                            onChange={this.onChangeHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input
                            id="goalDescription"
                            name="goalDescription"
                            type="text"
                            value={goalDescription}
                            placeholder="Description"
                            onChange={this.onChangeHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input
                            id="goalDueDate"
                            name="goalDueDate"
                            type="date"
                            value={goalDueDate}
                            onChange={this.onChangeHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input
                            id="goalTarget"
                            name="goalTarget"
                            type="number"
                            value={goalTarget}
                            onChange={this.onChangeHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                      {errorMessage ? (
                        <Alert color="danger">{errorMessage}</Alert>
                      ) : successMessage ? (
                        <Alert color="success">{successMessage}</Alert>
                      ) : (
                        <span></span>
                      )}
                      <div className="text-center">
                        <Button
                          className="mt-2 ml-2 mb-2"
                          color="primary"
                          type="submit"
                          onClick={() => this.toggleFormOff()}
                        >
                          Add new goal
                        </Button>
                        <Button
                          className="mt-2 mr-2 mb-2 cancel-link"
                          color="secondary"
                          onClick={() => this.toggleFormOff()}
                        >
                          <span className="m-4">Cancel</span>
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </>
            );
          } else {
            return <span />;
          }
        }}
      </AuthContext.Consumer>
    );
  }
}

export default newGoalForm;
