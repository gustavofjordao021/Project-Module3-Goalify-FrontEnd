import React, { Component } from "react";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";

import "./UpdateGoal.css";

import {
  Alert,
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

class UpdateGoal extends Component {
  state = {
    goalName: this.props.goalInfo.goalName,
    goalDueDate: this.props.goalInfo.goalDueDate,
    goalTarget: this.props.goalInfo.goalTarget,
    goalId: this.props.updateGoalId.goalId,
    displayForm: this.props.goalInfo.toggleGoalDetail,
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

  handleUpdateGoalSubmit = (e, cb) => {
    const { goalId } = this.state;
    e.preventDefault();
    GOAL_SERVICE.updateGoal(goalId, this.state)
      .then((responseFromServer) => {
        cb(responseFromServer.data);
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
          this.props.syncUpdate(responseFromServer.data);
          this.props.isDone(true);
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
    const { goalName, goalDueDate, goalTarget, displayForm } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { currentUser, successMessage, errorMessage } = context.state;
          const { syncUser } = context;
          return (
            <>
              {displayForm ? (
                <CardBody className="px-lg-5 py-lg-5">
                  <Form
                    onSubmit={(e) =>
                      this.handleUpdateGoalSubmit(
                        e,
                        currentUser,
                        syncUser,
                        this.toggleFormOff()
                      )
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
              ) : (
                <span></span>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default UpdateGoal;
