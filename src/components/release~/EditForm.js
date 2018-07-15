import React, { Component } from "react";
import {
  Form,
  Input,
  DatePicker,
  Tooltip,
  Icon,
  Button,
  Modal,
  Upload
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

const FormItem = Form.Item;
class EditForm extends Component {
  state = {
    confirmDirty: false,
    disabled: false,
    value: 1,
    phoneName: "foundPhone",
    phone: 11111111111,
    formData: []
  };

  componentDidMount() {
    // const type = this.props.type;
    // if (type === 1) {
    //   axios.get(`/found/${this.props.foundId}`).then(({ data }) => {
    //     console.log(data);
    //     this.setState({
    //       formData: data,
    //       phone: this.props.foundPhone,
    //       phoneName: "foundPhone"
    //     });
    //   });
    // } else {
    //   axios.get(`/lost/${this.props.lostId}`).then(({ data }) => {
    //     console.log(data);
    //     this.setState({
    //       formData: data,
    //       phone: this.props.lostPhone,
    //       phoneName: "lostPhone"
    //     });
    //   });
    // }
    console.log("flag");
    console.log(this.props.data);
    this.setState({ formData: this.props.data });
  }

  handleSetEditVisible = e => {
    this.props.setEditVisible(false);
  };

  handleBeforeSubmit = e => {
    const form = this.props.form;
    form.setFieldsValue({
      time: new Date(form.getFieldValue("DatePicker")).getTime()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      if (this.props.type === 1) {
        // found
        axios.put(`/found/${this.props.foundId}`, values).then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            Modal.info({ content: data.message });
            this.props.handleFoundsRefresh();
            form.setFieldsValue({
              time: "",
              name: "",
              location: "",
              storage: "",
              outline: ""
            });
          } else {
            Modal.error({ content: data.message });
          }
          this.handleSetEditVisible();
        });
      } else {
        // lost
        axios.put(`/lost/${this.props.lostId}`, values).then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            Modal.info({ content: data.message });
            this.props.handleLostsRefresh();
            form.setFieldsValue({
              time: "",
              name: "",
              location: "",
              storage: "",
              outline: ""
            });
          } else {
            Modal.error({ content: data.message });
          }
          this.handleSetEditVisible();
        });
      }
    });
  };

  handleFormChange = e => {
    if (e.target.value === 1) {
      this.setState({
        disabled: false,
        value: e.target.value,
        phoneName: "foundPhone"
      });
    } else {
      this.setState({
        disabled: true,
        value: e.target.value,
        phoneName: "lostPhone"
      });
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
      <div>
        <Upload style={{ margin: "0px 0px 20px 134px" }}>
          <Button>
            <Icon type="upload" /> Upload picture
          </Button>
        </Upload>

        <Form
          onSubmit={this.handleSubmit}
          className="App-form"
          style={{ margin: "25px 0px 0px 0px" }}
        >
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
              ],
              initialValue: this.state.formData.name
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Location">
            {getFieldDecorator("location", {
              rules: [
                {
                  required: true,
                  message: "Please input the location!"
                }
              ],
              initialValue: this.state.formData.location
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Time">
            {getFieldDecorator("DatePicker", config)(
              <DatePicker
                style={{ width: "100%" }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
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
            {getFieldDecorator("storage", {
              initialValue: this.state.formData.storage
            })(<Input disabled={this.state.disabled} />)}
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
              ],
              initialValue: this.state.formData.outline
            })(<TextArea rows={2} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleBeforeSubmit}
            >
              Update
            </Button>
            <Button
              onClick={this.handleSetEditVisible}
              type="primary"
              style={{ marginLeft: "64px" }}
            >
              Cancel
            </Button>
          </FormItem>
          <FormItem>
            {getFieldDecorator(this.state.phoneName, {
              initialValue: this.state.phone
            })(<Input type="hidden" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("time", {})(<Input type="hidden" />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(EditForm);
