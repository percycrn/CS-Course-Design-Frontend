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
        handelSignIn={this.props.handelSignIn}
        handelSignState={this.signUp}
      />
    ) : (
      <SignUp handelSignState={this.signIn} />
    );
  }
}
