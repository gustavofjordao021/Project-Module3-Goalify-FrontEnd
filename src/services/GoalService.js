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

  retrieveGoal(goalId) {
    return service.get(`/app/${goalId}`);
  },

  // login(userData) {
  //    return service.post('/auth/login', userData);
  // },

  // logout() {
  //   return service.post('/auth/logout', {});
  // },

  // getUser() {
  //   return service.get('/auth/isLoggedIn');
  // }
};

export default GOAL_SERVICE;
