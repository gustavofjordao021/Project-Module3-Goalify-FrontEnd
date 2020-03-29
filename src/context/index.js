import React from 'react';

import AUTH_SERVICE from '../services/AuthService';

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    formSignup: {
      username: '',
      email: '',
      password: ''
    }
  };

  handleSignupInput = e => {
    const {
      target: { name, value }
    } = e;
    console.log(name, value);
    this.setState(prevState => ({
      ...prevState,
      formSignup: {
        ...prevState.formSignup,
        [name]: value
      }
    }));
  };

  handleSignupSubmit = e => {
    e.preventDefault();
    AUTH_SERVICE.signup(this.state.formSignup)
      .then(responseFromServer => {
        const {
          data: { user, message }
        } = responseFromServer;

        this.setState(prevState => ({
          ...prevState,
          formSignup: {
            username: '',
            email: '',
            password: ''
          },
          currentUser: user,
          isLoggedIn: true
        }));
        alert(`${message}`);
        this.props.history.push('/home');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState(prevState => ({
            ...prevState,
            message: err.response.data.message
          }));
        }
      });
  };

  render() {
    const { state, handleSignupInput, handleSignupSubmit } = this;
    return (
      <>
        <AuthContext.Provider
          value={{
            state,
            handleSignupInput,
            handleSignupSubmit
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      </>
    );
  }
}

export default AuthProvider;