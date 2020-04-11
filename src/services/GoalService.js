import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const GOAL_SERVICE = {
  newGoal(userData) {
    console.log('user data in the service: ', userData);
    return service.post('/auth/signup', userData);
  },

  login(userData) {
     return service.post('/auth/login', userData);
  },

  logout() {
    return service.post('/auth/logout', {});
  },

  getUser() {
    return service.get('/auth/isLoggedIn');
  }
};

export default GOAL_SERVICE;