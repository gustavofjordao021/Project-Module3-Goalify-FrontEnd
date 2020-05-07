import React, { Component } from "react";

import { AuthContext } from "../../context/index";
import ACTION_SERVICE from "../../services/ActionService";

import "./ActionLine.css";

import { Button, Form, InputGroup, Input } from "reactstrap";

class ActionLine extends Component {
  state = {
    actionName: this.props.actionData.actionName,
    actionDescription: this.props.actionData.actionName,
    actionId: this.props.actionId,
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleActionUpdateSubmit = (e, syncUser, syncUpdate, actionOwner) => {
    e.preventDefault();
    const { goalId } = this.props.match.params;
    const { actionId } = this.state;
    ACTION_SERVICE.updateAction(goalId, actionId, {
      ...this.state,
      actionOwner,
    })
      .then((responseFromServer) => {
        const { updatedUser } = responseFromServer.data;
        syncUser(updatedUser);
        const {
          data: { errorMessage, successMessage },
        } = responseFromServer;
        if (errorMessage) {
          this.setState({
            errorMessage,
          });
        } else {
          this.setState({
            actionName: this.props.actionData.actionName,
            actionDescription: this.props.actionData.actionDescription,
            successMessage,
          });
          syncUser(updatedUser);
          syncUpdate();
          this.props.toggleUpdateFormOff();
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
    const {
      actionName,
      actionDescription,
      _id,
      isDone,
    } = this.props.actionData;
    const {
      checkAction,
      isUpdating,
      toggleUpdateFormOn,
      toggleUpdateFormOff,
    } = this.props;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser, isUserLoggedIn } = context;
          const { currentUser } = context.state;
          if (isDone) {
            return (
              <tr key={_id} className="grayout">
                <td>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-0">
                    <input
                      className="custom-control-input"
                      id={_id}
                      checked
                      type="checkbox"
                      onClick={() => {
                        checkAction(_id, syncUser, isUserLoggedIn);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={_id}
                    ></label>
                  </div>
                </td>
                <td id="text-center-align">{actionName}</td>
                <td id="text-center-align">{actionDescription}</td>
                <td>
                  <Button
                    color="secondary"
                    className="btn-inner--icon"
                    disabled
                  >
                    <i className="ni ni-settings" id="icon-color" />
                  </Button>
                </td>
              </tr>
            );
          } else if (isUpdating) {
            return (
              <>
                <td>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-0">
                    <input
                      className="custom-control-input"
                      id={_id}
                      disabled
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={_id}
                    ></label>
                  </div>
                </td>
                <td>
                  <InputGroup>
                    <Input
                      id="actionName"
                      name="actionName"
                      type="text"
                      value={this.state.actionName}
                      onChange={this.onChangeHandler}
                    ></Input>
                  </InputGroup>
                </td>
                <td>
                  <InputGroup>
                    <Input
                      id="actionDescription"
                      name="actionDescription"
                      type="text"
                      value={this.state.actionDescription}
                      onChange={this.onChangeHandler}
                    ></Input>
                  </InputGroup>
                </td>
                <td>
                  <Form
                    onSubmit={(e) =>
                      this.handleActionUpdateSubmit(
                        e,
                        syncUser,
                        isUserLoggedIn,
                        currentUser._id
                      )
                    }
                  >
                    <Button
                      color="primary"
                      className="btn-inner--icon"
                      type="submit"
                    >
                      <i className="ni ni-check-bold" />
                    </Button>
                    <Button
                      color="danger"
                      className="btn-inner--icon"
                      type="submit"
                    >
                      <i className="ni ni-fat-delete" />
                    </Button>
                    <Button
                      color="secondary"
                      className="btn-inner--icon"
                      onClick={() => toggleUpdateFormOff()}
                    >
                      <i className="ni ni-fat-remove" id="icon-color" />
                    </Button>
                  </Form>
                </td>
              </>
            );
          } else {
            return (
              <tr key={_id}>
                <td>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-0">
                    <input
                      className="custom-control-input"
                      id={_id}
                      type="checkbox"
                      onSubmit={() => {
                        checkAction(_id, syncUser, isUserLoggedIn);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={_id}
                    ></label>
                  </div>
                </td>
                <td id="text-center-align">{actionName}</td>
                <td id="text-center-align">{actionDescription}</td>
                <td>
                  <Button
                    color="secondary"
                    className="btn-inner--icon"
                    onClick={() => toggleUpdateFormOn()}
                  >
                    <i className="ni ni-settings" id="icon-color" />
                  </Button>
                </td>
              </tr>
            );
          }
        }}
      </AuthContext.Consumer>
    );
  }
}

export default ActionLine;
