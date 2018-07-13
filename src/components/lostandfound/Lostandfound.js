import React, { Component } from "react";
import { Input, Breadcrumb, Button, List } from "antd";
import FoundItem from "./FoundItem";

const Search = Input.Search;
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  }
];
class Lostandfound extends Component {
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
              List of Lostandfound Items
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
              renderItem={item => <FoundItem />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Lostandfound;
