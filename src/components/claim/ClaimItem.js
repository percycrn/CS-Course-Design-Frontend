import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";
import axios from "axios";

class ClaimItem extends Component {
  state = {
    detailVisible: false,
    deleteVisible: false,
    itemData: {
      name: "name",
      location: "location",
      time: new Date().toLocaleDateString(),
      outline: "outline"
    }
  };

  setDetailVisible(detailVisible) {
    this.setState({
      detailVisible
    });
  }

  setDeleteVisible(deleteVisible) {
    this.setState({
      deleteVisible
    });
  }

  handleDelete = () => {
    axios.delete(`/prompt/${this.props.data.promptId}`).then(({ data }) => {
      if (data.status === 200) {
        Modal.info({ content: data.message });
        this.setDeleteVisible(false);
      } else {
        Modal.info({ content: data.message });
        this.setDeleteVisible(false);
      }
      this.props.handleRefresh();
    });
  };

  handleDetail = e => {
    this.setDetailVisible(true);
    if (this.props.data.foundId !== null) {
      axios.get(`/found/${this.props.data.foundId}`).then(({ data }) => {
        this.setState({ itemData: data });
      });
    }
  };

  render() {
    const itemData = this.state.itemData;
    const data = this.props.data;
    return (
      <List.Item
        actions={[
          <div>
            <Button onClick={this.handleDetail}>detail</Button>
            <Modal
              title="item"
              visible={this.state.detailVisible}
              onOk={() => this.setDetailVisible(false)}
              onCancel={() => this.setDetailVisible(false)}
              destroyOnClose
            >
              <div>
                <Avatar src={itemData.pic} />
                <p>name: {itemData.name}</p>
                <p>location: {itemData.location}</p>
                <p>time: {new Date(itemData.time).toLocaleDateString()}</p>
                <p>outline: {itemData.outline}</p>
              </div>
            </Modal>
          </div>,
          <div>
            <Button type="danger" onClick={() => this.setDeleteVisible(true)}>
              Delete
            </Button>
            <Modal
              title="Confirm"
              visible={this.state.deleteVisible}
              onOk={this.handleDelete}
              onCancel={() => this.setDeleteVisible(false)}
              okText="confirm"
              maskClosable={false}
              destroyOnClose
            >
              <p>Are you sure to delete this item?</p>
            </Modal>
          </div>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar src="http://pbt0hsxrl.bkt.clouddn.com/TB1DWFZPXXXXXbgaXXXxKNpFXXX.jpg" />
          }
          title={"promptCode: " + data.promptId}
          description={"contact phone number: " + data.foundPhone}
        />
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.handleModalClose}
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

export default ClaimItem;
