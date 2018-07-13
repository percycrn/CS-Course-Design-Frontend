import React, { Component } from "react";
import {
  Form,
  Input,
  DatePicker,
  Tooltip,
  Icon,
  Button,
  Upload,
  Radio
} from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ReleasingForm extends Component {
  state = {
    confirmDirty: false,
    disabled: false,
    value: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
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

  handleFormChange = e => {
    if (e.target.value === 1) {
      this.setState({ disabled: false, value: e.target.value });
    } else {
      this.setState({ disabled: true, value: e.target.value });
    }
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
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <Form onSubmit={this.handleSubmit} className="App-form">
        <FormItem {...formItemLayout} label="type">
          {getFieldDecorator("type")(
            <RadioGroup
              value={this.state.value}
              onChange={this.handleFormChange}
            >
              <Radio value={1}>found</Radio>
              <Radio value={2}>lost</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Name&nbsp;
              <Tooltip title="the name of the item you found">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input the name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Location">
          {getFieldDecorator("location", {
            rules: [
              {
                required: true,
                message: "Please input the location!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Time">
          {getFieldDecorator("date-picker", config)(
            <DatePicker style={{ width: "100%" }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Storage&nbsp;
              <Tooltip title="the location you preserve the found item">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("Storage", {
            rules: [
              {
                required: true,
                message: "Please input the Storage!",
                whitespace: true
              }
            ]
          })(<Input disabled={this.state.disabled} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Upload">
          {getFieldDecorator("upload", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Upload picture
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Outline&nbsp;
              <Tooltip title="the more specific, the better">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("outline", {
            rules: [
              {
                required: true,
                message: "Please input the outline!",
                whitespace: true
              }
            ]
          })(<TextArea rows={2} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Release
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ReleasingForm);
