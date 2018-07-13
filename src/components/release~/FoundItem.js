import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";

function confirm() {
  Modal.confirm({
    title: "Are you sure to delete?",
    content: "Bla bla ...",
    okText: "Confirm"
  });
}

class FoundItem extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <List.Item
        actions={[
          <Button onClick={this.showModal}>edit</Button>,
          <Button type="danger" onClick={confirm}>
            delete
          </Button>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">title</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.handleClose}
          okText="apply"
          onCancel={this.handleClose}
          destroyOnClose
        >
          <div>
            <h3>name</h3>
            <p>address</p>
          </div>
        </Modal>
      </List.Item>
    );
  }
}

export default FoundItem;
