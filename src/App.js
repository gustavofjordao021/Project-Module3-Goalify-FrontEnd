import React from "react";
import { Route, Switch } from "react-router-dom";
import "../src/assets/css/argon-dashboard-react.css";
import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";
import Application from "./components/Application/Application";
import GoalDetails from "./components/GoalDetails/GoalDetails";
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
        <Route exact path="/app" component={Application} />
        <Route exact path="/app/goal-details/:goalId" component={GoalDetails} />
      </Switch>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
