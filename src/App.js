import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../src/assets/css/argon-dashboard-react.css'
import './App.css';

import UserNavbar from './components/Navbar/UserNavbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
    <header>
      <UserNavbar />
    </header>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
    </Switch>
    <footer>
      <Footer />
    </footer>
    </div>
  );
}

export default App;