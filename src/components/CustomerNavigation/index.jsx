import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import { CustomTabPane } from "./CustomerNavigationContainer";
import CustomerOderNavigation from "../CustomerOrderNavigation";

class CustomerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <Tabs defaultActiveKey="1" animated={false} tabPosition={"left"}>
          <CustomTabPane
            key={"1"}
            tab={
              <span>
                <Icon type="apple" />
                {"Pesanan Saya"}
              </span>
            }     
            my_prop={<CustomerOderNavigation/>}
          />
          <CustomTabPane key={"2"} my_prop={"b"} />
        </Tabs>
      </div>
    );
  }
}

export default CustomerNavigation;
