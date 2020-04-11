import React, { Component } from "react";

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
    Col
  } from "reactstrap";

  const DEFAULT_STATE = {
    "goalName": '',
    "goalDescription": '',
    "goalDueDate": 0,
    "goalTarget": 0,
    "goalOwner": ''
  }
  
  class newGoalForm extends Component {
    state = {
       ...DEFAULT_STATE
    }

    onChangeHandler = event => {
        const { name, value } = event.target;
        this.setState(
            { [name]: value },
            () => console.log(this.state)
        );
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.context.passedDownAddFood(this.state);
        this.setState({...DEFAULT_STATE});
    }

    render() {
        const {goalName, goalDescription, goalDueDate, goalTarget} = this.state;
        if (this.props.isShown) {
            return (
                <>
                    <Card id="signup-card" className="bg-secondary shadow border-0 ">
                  <CardHeader className="bg-transparent brand-logo">
                    <div className="text-center text-muted mb-4">
                      <p>Add new goal</p>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={this.handleFormSubmit}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input 
                            id='goalName'
                            name='goalName'
                            type='text'
                            value={goalName}
                            placeholder='Goal name'
                            onChange={this.onChangeHandler} 
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input 
                            id='goalDescription'
                            name='goalDescription'
                            type='text'
                            value={goalDescription}
                            placeholder='Description'
                            onChange={this.onChangeHandler} 
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input 
                            id='goalDueDate'
                            name='goalDueDate'
                            type='date'
                            value={goalDueDate}
                            onChange={this.onChangeHandler} 
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input 
                            id='goalTarget'
                            name='goalTarget'
                            type='number'
                            value={goalTarget}
                            onChange={this.onChangeHandler} 
                          />
                        </InputGroup>
                      </FormGroup>
                      {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : successMessage ? <Alert color="success">{successMessage}</Alert> : <span></span>} 
                      <div className="text-center">
                        <Button className="mt-4" color="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                </>
            );  
        } else {
            return (
                <span />
            )
        }
    };
};
  
  export default newGoalForm;