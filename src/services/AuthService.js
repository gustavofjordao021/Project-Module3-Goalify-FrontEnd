import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const AUTH_SERVICE = {
  signup(userData) {
    return service.post("/auth/signup", userData);
  },

  login(userData) {
    return service.post("/auth/login", userData);
  },

  logout() {
    return service.post("/auth/logout", {});
  },

  getUser() {
    return service.get("/auth/isLoggedIn");
  },

  uploadAvatar(avatar) {
    return service.post("/auth/avatar-upload", avatar);
  },
};

export default AUTH_SERVICE;
