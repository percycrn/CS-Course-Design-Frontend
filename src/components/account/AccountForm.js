import React, { Component } from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";

const FormItem = Form.Item;

class AccountForm extends Component {
  state = {
    confirmDirty: false,
    formData: []
  };
  componentDidMount() {
    axios
      .get(`/users/${this.props.userId}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({ formData: data });
      })
      .catch(err => err && console.error(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("content of form: ", values);
      }
      axios.put(`/users/${this.props.userId}`, values).then(({ data }) => {
        console.log(data);
        if (data.status === 200) {
          Modal.info({ content: data.message });
        } else {
          Modal.error({ content: data.message });
        }
      });
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit} className="App-form">
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ],
            initialValue: this.state.formData.email
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!",
                whitespace: true
              }
            ],
            initialValue: this.state.formData.name
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="id">
          {getFieldDecorator("id", {
            rules: [
              {
                required: true,
                message: "Please input your Idcard!"
              }
            ],
            initialValue: this.state.formData.id
          })(<Input id="id" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="address">
          {getFieldDecorator("address", {
            rules: [
              {
                required: true,
                message: "Please input your address!"
              }
            ],
            initialValue: this.state.formData.address
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AccountForm);
