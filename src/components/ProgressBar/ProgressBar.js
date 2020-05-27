import React from "react";

import { Progress } from "reactstrap";

import "./ProgressBar.css";

class ProgressBar extends React.Component {
  render() {
    const { userData } = this.props;
    let goal = userData.goals.filter(
      (goals) => goals._id === this.props.match.params.goalId
    )[0];
    let totalActions = goal.goalActions.length;
    let completeActions = goal.goalActions.filter(
      (action) => action.isDone === true
    ).length;
    let progressStatus =
      totalActions > 0 ? (completeActions / totalActions) * 100 : "0";
    let barStatus = progressStatus === 100 ? "success" : "primary";
    return (
      <>
        <div className="progress-info mb-0">
          <div className="progress-percentage">
            <span>{progressStatus}%</span>
          </div>
        </div>
        <Progress max="100" value={progressStatus} color={barStatus} />
      </>
    );
  }
}

export default ProgressBar;
