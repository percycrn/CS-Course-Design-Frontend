import React, { Component } from "react";
import { Breadcrumb } from "antd";
import AccountForm from "./AccountForm";

class Account extends Component {
  render() {
    return (
      <div>
        <Breadcrumb className="App-breadcrumb">
          <Breadcrumb.Item>HomePage</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "bold" }}>Account</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="App-content">
          <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
            <div className="App-title" id="title">
              Information of Account
            </div>
          </div>
          <div style={{ padding: "0px 100px 16px 16px" }}>
            <AccountForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
