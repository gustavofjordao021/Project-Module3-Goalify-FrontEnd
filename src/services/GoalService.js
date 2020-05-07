import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const GOAL_SERVICE = {
  newGoal(newGoalData) {
    return service.post("/app/create-goal", newGoalData);
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

export default GOAL_SERVICE;
