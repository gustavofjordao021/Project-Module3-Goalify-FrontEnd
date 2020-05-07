import React from "react";
import { Route, Switch } from "react-router-dom";
import "../src/assets/css/argon-dashboard-react.css";
import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";
import ApplicationHome from "./components/ApplicationHome/ApplicationHome";
import GoalDetails from "./components/GoalDetails/GoalDetails";
import UserProfile from "./components/UserProfile/UserProfile";
import { AuthContext } from "./context";

function App() {
  let context = React.useContext(AuthContext);

  React.useEffect(() => {
    context.isUserLoggedIn();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/app" component={ApplicationHome} />
        <Route exact path="/app/goal-details/:goalId" component={GoalDetails} />
        <Route exact path="/app/user-profile" component={UserProfile} />
      </Switch>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
