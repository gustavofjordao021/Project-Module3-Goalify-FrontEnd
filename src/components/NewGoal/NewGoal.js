import React, { Component } from "react";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./NewGoal.css";

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
  goalDueDate: "",
  goalTarget: "",
};

class newGoalForm extends Component {
  state = {
    ...DEFAULT_STATE,
    errorMessage: "",
    successMessage: "",
  };

  toggleFormOff = () => {
    this.props.isDone();
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleNewGoalSubmit = (e, user, cb, toggle) => {
    e.preventDefault();
    GOAL_SERVICE.newGoal({
      ...this.state,
      goalOwner: user._id,
    })
      .then((responseFromServer) => {
        const { currentUser } = responseFromServer.data;
        cb(currentUser);
        const {
          data: { errorMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            ...DEFAULT_STATE,
            errorMessage,
            displayForm: this.props.isShown,
          });
        }
        this.props.isDone(this.state.isDone);
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
    const { goalName, goalDueDate, goalTarget } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { currentUser, successMessage, errorMessage } = context.state;
          const { syncUser } = context;
          return (
            <>
              <Card
                id="new-goal-form"
                className="bg-secondary shadow border-0 "
              >
                <CardHeader className="bg-transparent brand-logo">
                  <div className="text-center">
                    <h2 className="title">Add new goal</h2>
                    <p className="mb-0 text-muted">
                      To create your new goal, please input its name, a target
                      value (could be X books read, or % change in body weight),
                      and a due date to make sure you follow-through.
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-label p-2 text-center">
                            Goal name
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="pl-2"
                          id="goalName"
                          name="goalName"
                          type="text"
                          placeholder="Example: Read more books"
                          value={goalName}
                          onChange={this.onChangeHandler}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-label p-2 text-center">
                            Due date
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="pl-2"
                          id="goalDueDate"
                          name="goalDueDate"
                          type="date"
                          placeholder="Example: 02/29/2020"
                          value={goalDueDate}
                          onChange={this.onChangeHandler}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-label p-2 text-center">
                            Goal target
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="pl-2"
                          id="goalTarget"
                          name="goalTarget"
                          type="text"
                          placeholder="Example: 10 books 📚read"
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
        }}
      </AuthContext.Consumer>
    );
  }
}

export default newGoalForm;
