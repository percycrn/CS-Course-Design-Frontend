import React, { Component } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import { withRouter } from "react-router-dom";
import { UsersContex } from "./store";
import SignPage from "./components/signpage/SignPage";

class App extends Component {
  state = {
    isSignIn: false,
    users: {
      userId: -1,
      phone: 11111111111
    }
  };

  signIn = users => this.setState({ isSignIn: true, users });
  signOut = () => this.setState({ isSignIn: false });

  render() {
    if (this.state.isSignIn) {
      return (
        <UsersContex.Provider value={this.state.users}>
          <MainPage handleSignOut={this.signOut} />
        </UsersContex.Provider>
      );
    } else {
      return <SignPage handleSignIn={this.signIn} />;
    }
  }
}

export default withRouter(App);
