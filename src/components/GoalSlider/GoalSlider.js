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
  const { userLoggedIn, passedDownToggleGoalForm } = props;

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
              {userLoggedIn ? (
                userLoggedIn.goals?.length > 0 ? (
                  userLoggedIn.goals.map((goal, index) => {
                    const { goalName, _id } = goal;
                    return (
                      <Link
                        to={`/app/goal-details/${_id}`}
                        key={index}
                        className="btn btn-link m-1"
                      >
                        <span
                          id="main-cta goal-list"
                          className="m-4"
                          role="img"
                          aria-label="goal"
                        >
                          🎯 {goalName}
                        </span>
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
                )
              ) : (
                <span></span>
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
              onClick={() => passedDownToggleGoalForm()}
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
