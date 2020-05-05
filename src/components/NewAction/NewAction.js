import React, { Component } from "react";

import { AuthContext } from "../../context/index";
import ACTION_SERVICE from "../../services/ActionService";

import "./NewAction.css";

import { Button, Form, Input, InputGroup } from "reactstrap";

class NewAction extends Component {
  state = {
    actionName: "",
    actionDescription: "",
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleActionSubmit = (e, cb) => {
    const { goalId } = this.props.updateGoalId;
    e.preventDefault();
    ACTION_SERVICE.newAction(goalId, this.state)
      .then((responseFromServer) => {
        const { updatedUser } = responseFromServer.data;
        cb(updatedUser);
        const {
          data: { errorMessage, successMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            errorMessage,
          });
        } else {
          this.setState({
            successMessage,
          });
          this.props.syncUser(updatedUser);
          this.props.syncUpdate();
          this.props.isDone();
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
    const { actionName, actionDescription } = this.state;
    const { isVisible } = this.props;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser } = context;
          return (
            <>
              {isVisible ? (
                <>
                  <tr>
                    <td>
                      <span></span>
                    </td>
                    <td>
                      <Form onSubmit={(e) => this.handleActionSubmit(e)}>
                        <InputGroup>
                          <Input
                            id="actionName"
                            name="actionName"
                            type="text"
                            placeholder="Buy books"
                            value={actionName}
                            onChange={this.onChangeHandler}
                          ></Input>
                        </InputGroup>
                      </Form>
                    </td>
                    <td>
                      <Form onSubmit={(e) => this.handleActionSubmit(e)}>
                        <InputGroup>
                          <Input
                            id="actionDescription"
                            name="actionDescription"
                            type="text"
                            placeholder="Buy books on shopping list"
                            value={actionDescription}
                            onChange={this.onChangeHandler}
                          ></Input>
                        </InputGroup>
                      </Form>
                    </td>
                    <td>
                      <Form
                        onSubmit={(e) => this.handleActionSubmit(e, syncUser)}
                      >
                        <Button color="primary" className="btn-inner--icon">
                          <i className="ni ni-check-bold" />
                        </Button>
                        <Button color="danger" className="btn-inner--icon">
                          <i className="ni ni-fat-delete" />
                        </Button>
                        <Button
                          color="secondary"
                          className="btn-inner--icon"
                          onClick={() => this.props.isDone()}
                        >
                          <i className="ni ni-fat-remove" id="icon-color" />
                        </Button>
                      </Form>
                    </td>
                  </tr>
                </>
              ) : (
                <tr></tr>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default NewAction;
