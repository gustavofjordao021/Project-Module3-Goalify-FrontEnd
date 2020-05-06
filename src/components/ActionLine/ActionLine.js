import React from "react";

import "./ActionLine.css";

import { Button } from "reactstrap";

const ActionLine = (props) => {
  const { actionName, actionDescription, _id, isDone } = props.actionData;
  const { syncUser, syncUpdate, checkAction } = props;
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
                checkAction(_id, syncUser, syncUpdate);
              }}
            />
            <label className="custom-control-label" htmlFor={_id}></label>
          </div>
        </td>
        <td id="text-center-align">{actionName}</td>
        <td id="text-center-align">{actionDescription}</td>
        <td>
          <Button color="secondary" className="btn-inner--icon" disabled>
            <i className="ni ni-settings" id="icon-color" />
          </Button>
        </td>
      </tr>
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
              onClick={() => {
                checkAction(_id, syncUser, syncUpdate);
              }}
            />
            <label className="custom-control-label" htmlFor={_id}></label>
          </div>
        </td>
        <td id="text-center-align">{actionName}</td>
        <td id="text-center-align">{actionDescription}</td>
        <td>
          <Button color="secondary" className="btn-inner--icon">
            <i className="ni ni-settings" id="icon-color" />
          </Button>
        </td>
      </tr>
    );
  }
};

export default ActionLine;
