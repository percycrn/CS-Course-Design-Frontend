import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./components/MainPage";
import { withRouter } from "react-router-dom";
import { UidContex } from "./store";

class App extends Component {
  render() {
    return (
        <MainPage />
    );
  }
}

export default withRouter(App);
