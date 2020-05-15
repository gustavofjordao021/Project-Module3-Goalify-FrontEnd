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

  actionUncheck(goalId, actionId) {
    return service.post(`/app/${goalId}/${actionId}/not-done`);
  },

  updateAction(goalId, actionId, updatedActionData) {
    return service.post(`/app/${goalId}/${actionId}/update`, updatedActionData);
  },

  deleteAction(goalId, actionId) {
    return service.post(`/app/${goalId}/${actionId}/delete`);
  },
};

export default ACTION_SERVICE;
