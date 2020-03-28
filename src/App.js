import React from 'react';
import './App.css';

import UserNavbar from './components/Navbar/UserNavbar';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserNavbar />
            <Signup />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;