import React from "react";
import { Link } from "react-router-dom";

import {
  UncontrolledCollapse,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
} from "reactstrap";

const GoalSlider = (props) => {
  const { userLoggedIn } = props;

  return (
    <>
      <Col className="col-3 mt-4 ml-4 fixed-height">
        <Card className="fixed-height bg-secondary shadow column-container">
          <CardHeader className="p-1">
            <Row className="align-items-center">
              <Col>
                <Button color="link" id="toggler" className="toggling-button">
                  <h2 className="mb-0 title">Goals</h2>
                  <i className="ni ni-bold-left"></i>
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <Container className="goal-container">
            <UncontrolledCollapse toggler="#toggler">
              {userLoggedIn.goals.length > 0 ? (
                userLoggedIn.goals.map((goal, index) => {
                  const { goalName, _id } = goal;
                  return (
                    <Link to={`/app/goal-details/${_id}`} key={index}>
                      <Button
                        className="mt-2 mr-2 mb-2"
                        color="link"
                        onClick={() => this.toggleGoalDetailsOn()}
                      >
                        <span
                          id="main-cta"
                          className="m-4"
                          role="img"
                          aria-label="goal"
                        >
                          🎯 {goalName}
                        </span>
                      </Button>
                    </Link>
                  );
                })
              ) : (
                <>
                  <div className="text-center text-muted m-4">
                    <p className="m-0">
                      You have no goals!{" "}
                      <span role="img" aria-label="shocked">
                        😱
                      </span>
                    </p>
                  </div>
                </>
              )}
            </UncontrolledCollapse>
          </Container>
          <div className="button-container mb-4">
            <div className="full-width ml-3 mr-3">
              <hr className="ml-3 mr-3 mb-3 mt-2" />
            </div>
            <Button
              color="primary"
              className="align-items-center"
              onClick={() => props.passedDownToggleGoalForm()}
            >
              <i className="ni ni-fat-add"></i>
              <span id="main-cta">Add New Goal</span>
            </Button>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default GoalSlider;
