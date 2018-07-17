import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";
import axios from "axios";

class AppItem extends Component {
  state = {
    detailVisible: false,
    deleteVisible: false,
    state: "PENDING",
    itemData: []
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
    axios.delete(`/apps/${this.props.data.appId}`).then(({ data }) => {
      if (data.status === 200) {
        Modal.info({ content: data.message });
        this.setDeleteVisible(false);
      } else {
        Modal.info({ content: data.message });
        this.setDeleteVisible(false);
      }
      this.props.handleAppRefresh();
    });
  };

  handleDetail = e => {
    this.setDetailVisible(true);
    axios.get(`/found/${this.props.data.foundId}`).then(({ data }) => {
      this.setState({ itemData: data });
    });
  };

  itemState(state) {
    if (state === 0) {
      return "PENDING";
    } else if (state === 1) {
      return "PASS";
    } else if (state === -1) {
      return "DENY";
    } else {
      alert("something wrong in AppItem.js componentDidMount");
    }
  }

  render() {
    const itemData = this.state.itemData; // 申请的found的信息
    const data = this.props.data; // app信息
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
                <img
                  alt=""
                  src={itemData.pic}
                  style={{
                    height: "100px",
                    marginBottom: "20px"
                  }}
                />
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
          avatar={<Avatar src="http://pbt0hsxrl.bkt.clouddn.com/avater.jpeg" />}
          title={"appCode: " + data.appId}
          description={
            "apply time: " +
            new Date(data.time).toLocaleDateString() +
            " | state: " +
            this.itemState(data.state)
          }
        />
      </List.Item>
    );
  }
}

export default AppItem;
