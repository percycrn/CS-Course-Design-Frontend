import React, { Component } from "react";
import { UsersContex } from "../../store";
import Claim from "./Claim";

class BeforeClaim extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          return <Claim userId={users.userId} phone={users.phone} />;
        }}
      </UsersContex.Consumer>
    );
  }
}

export default BeforeClaim;
