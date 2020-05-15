import React from "react";

import { Progress } from "reactstrap";

class ProgressBar extends React.Component {
  render() {
    const { userData } = this.props;
    let goal = userData.goals.filter(
      (goals) => goals._id === this.props.match.params.goalId
    )[0];
    let totalActions = goal.goalActions.length;
    let incompleteActions = goal.goalActions.filter(
      (action) => action.isDone === false
    ).length;
    let completeActions = goal.goalActions.filter(
      (action) => action.isDone === true
    ).length;
    let progressStatus = (completeActions / totalActions) * 100;
    let barStatus = progressStatus === 100 ? "success" : "primary";
    return (
      <>
        <div className="progress-wrapper">
          <div className="progress-info">
            <div className="progress-percentage">
              <span>{progressStatus}%</span>
            </div>
          </div>
          <Progress max="100" value={progressStatus} color={barStatus} />
        </div>
      </>
    );
  }
}

export default ProgressBar;
