import React, { Component } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import { withRouter } from "react-router-dom";
import { UserIdContex } from "./store";
import SignPage from "./components/signpage/SignPage";

class App extends Component {
  state = {
    isSignIn: false,
    userId: -1
  };

  signIn = userId => this.setState({ isSignIn: true, userId: userId });
  signOut = () => this.setState({ isSignIn: false });

  render() {
    return <MainPage />;

    /*if (this.state.isSignIn) {
      return (
        <UserIdContex.Provider value={this.state.userId}>
          <MainPage handleSignOut={this.signOut} />
        </UserIdContex.Provider>
      );
    } else {
      return <SignPage handleSignIn={this.signIn} />;
    }*/
  }
}

export default withRouter(App);
