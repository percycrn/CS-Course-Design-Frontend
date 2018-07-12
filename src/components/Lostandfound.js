import React, { Component } from "react";
import { Input, Breadcrumb, Button, List, Avatar, Icon, Modal } from "antd";

const Search = Input.Search;
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 4"
  }
];
class Lostandfound extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <Breadcrumb className="App-breadcrumb">
          <Breadcrumb.Item>HomePage</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "bold" }}>Lostandfound</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="App-content">
          <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
            <div className="App-title" id="title">
              List of Found
            </div>
            <div className="App-search">
              <Button.Group>
                <Button>Founds</Button>
                <Button>Losts</Button>
              </Button.Group>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: "300px", marginLeft: "16px", height: "30px" }}
              />
            </div>
          </div>
          <div style={{ padding: "0px 16px 16px 16px" }}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={data}
              pagination={{
                position: "bottom",
                pageSize: 6,
                size: "small"
              }}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="primary" onClick={this.showModal}>
                      Open
                    </Button>,
                    <Button type="primary" onClick={this.showModal}>
                      details
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Lostandfound;
