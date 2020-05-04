import React, { Component } from "react";

import { AuthContext } from "../../context/index";
import GOAL_SERVICE from "../../services/GoalService";
import ACTION_SERVICE from "../../services/ActionService";

import "./NewAction.css";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

class NewAction extends Component {
  state = {
    actionName: "",
    actionDescription: "",
    areActionDetailsVisible: this.props.isVisible,
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleActionSubmit = (e, cb) => {
    const { goalId } = this.state;
    e.preventDefault();
    ACTION_SERVICE.newAction(goalId, this.state)
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
          this.props.syncUser(responseFromServer.data);
          this.props.syncUpdate();
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
    const {
      areActionDetailsVisible,
      actionName,
      actionDescription,
    } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { syncUser } = context;
          return (
            <>
              {console.log(this.state)}
              {areActionDetailsVisible ? (
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
