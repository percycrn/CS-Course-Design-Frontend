import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class extends Component {
  state = { isSignIn: true };
  signIn = () => this.setState({ isSignIn: true });
  signUp = () => this.setState({ isSignIn: false });
  render() {
    return this.state.isSignIn ? (
      <SignIn
        handleSignIn={this.props.handleSignIn}
        handleSignState={this.signUp}
      />
    ) : (
      <SignUp handleSignState={this.signIn} />
    );
  }
}
