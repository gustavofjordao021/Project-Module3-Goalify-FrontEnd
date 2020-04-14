import React from 'react';

import AUTH_SERVICE from '../services/AuthService';


export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    formSignup: {
      username: '',
      email: '',
      password: ''
    },
    formLogin: {
      username: '',
      password: ''
    },
    currentUser: '',
    errorMessage: '',
    successMessage: '',
    isLoggedIn: this.currentUser === '' ? false : this.currentUser === undefined ? false : true
  };

  isLoggedIn = async () => {
    const user = await AUTH_SERVICE.getUser();
    this.setState(prevState => ({
      ...prevState,
      currentUser: user?.data?.user,
    }))
  }

  handleSignupInput = e => {
    const {
      target: { name, value }
    } = e;
    this.setState(prevState => ({
      ...prevState,
      formSignup: {
        ...prevState.formSignup,
        [name]: value
      }
    }));
  };

  handleLoginInput = e => {
    const {
      target: { name, value }
    } = e;
    this.setState(prevState => ({
      ...prevState,
      formLogin: {
        ...prevState.formLogin,
        [name]: value
      }
    }));
  };

  handleSignupSubmit = e => {
    e.preventDefault();
    AUTH_SERVICE.signup(this.state.formSignup)
    .then(responseFromServer => {
      const {
        data: { user, errorMessage, successMessage }
      } = responseFromServer;
        if (errorMessage) {
          this.setState(prevState => ({
            ...prevState,
            formLogin: {
              username: prevState.formSignup.username,
              email: prevState.formSignup.email,
              password: ''
            }, errorMessage
          }));
        } else {
        this.setState(prevState => ({
          ...prevState,
          formSignup: {
            username: '',
            email: '',
            password: ''
          },
          successMessage,
          currentUser: user,
          isLoggedIn: true
        }));
        this.props.history.push('/app');
      }})
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState(prevState => ({
            ...prevState,
            message: err.response.data.message
          }));
        }
      });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    AUTH_SERVICE.login(this.state.formLogin)
      .then(responseFromServer => {
        const {
          data: { user, errorMessage, successMessage }
        } = responseFromServer;
        if(errorMessage) {
          this.setState(prevState => ({
            ...prevState,
            formLogin: {
              username: prevState.formLogin.username,
              password: ''
            }, errorMessage
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            formLogin: {
              username: '',
              password: ''
            }, 
            successMessage,
            currentUser: user,
            isLoggedIn: true
          }));
          this.props.history.push('/app');
      }
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

  userLogOut = async () => {
    await AUTH_SERVICE.logout()
    this.setState(prevState => ({
      ...prevState, 
      successMessage: '',
      currentUser: '',
      isLoggedIn: false}))
  }

  render() {
    const { state, handleSignupInput, handleSignupSubmit, handleLoginInput, handleLoginSubmit, isLoggedIn, userLogOut } = this;
    return (
      <>
        <AuthContext.Provider
          value={{
            state,
            handleSignupInput,
            handleSignupSubmit,
            handleLoginInput,
            handleLoginSubmit,
            isLoggedIn,
            userLogOut
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      </>
    );
  }
}

export default AuthProvider;