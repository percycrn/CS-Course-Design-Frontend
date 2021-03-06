//@ts-check

import React, { Component } from "react";
import { Form, Icon, Input, Button, Modal } from "antd";
import axios from "axios";

const FormItem = Form.Item;

class SignUp extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        axios
          .post("/signup", values)
          .then(({ data }) => {
            console.log(data);
            if (data.status === 200) {
              Modal.info({ content: data.message });
              this.props.handleSignState();
            } else {
              Modal.error({ content: data.message });
            }
          })
          .catch(err => err && console.error(err));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="App-darea">
        <div className="App-ddarea">
          <FormItem>
            <h1>Sign Up</h1>
          </FormItem>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="phone number"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="username"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("id", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Idcard!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="identification card"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
              Or <a onClick={this.props.handleSignState}>signin now!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(SignUp);
