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

  retrieveGoals() {
    return service.get(`/app/all-goals`);
  },

  updateGoal(goalId, updatedGoalData) {
    return service.post(`/app/${goalId}/update`, updatedGoalData);
  },

  deleteGoal(goalId) {
    return service.post(`/app/${goalId}/delete`);
  },
};

export default ACTION_SERVICE;
