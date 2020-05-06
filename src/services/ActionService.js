import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const ACTION_SERVICE = {
  newAction(goalId, newActionData) {
    return service.post(`/app/${goalId}/new-action`, newActionData);
  },

  actionCheck(goalId, actionId) {
    return service.post(`/app/${goalId}/${actionId}/is-done`);
  },
};

export default ACTION_SERVICE;
