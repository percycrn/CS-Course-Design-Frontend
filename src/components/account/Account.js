import React, { Component } from "react";
import { Breadcrumb, Modal } from "antd";
import AccountForm from "./AccountForm";
import { UsersContex } from "../../store";

class Account extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          console.log("users:" + users);
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
                  <AccountForm userId={users.userId} />
                </div>
              </div>
            </div>
          );
        }}
      </UsersContex.Consumer>
    );
  }
}

export default Account;
