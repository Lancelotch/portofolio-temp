import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import CustomerOderNavigation from "../CustomerOrderNavigation";
import "./style.sass";
import { CustomTabPane } from "../../components/CustomTabDashboard";



class CustomerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboardUser" style={{ marginTop: 20 }}>
        <Tabs defaultActiveKey="1" animated={false} tabPosition={"left"}>
          <CustomTabPane
            key={"1"}
            tab={
              <React.Fragment>
                <Icon type="rocket" style={{ fontSize: 20, color: "#999999" }} />
                <span>{"Pesanan Saya"}</span>
              </React.Fragment>
            }
            className={"customerOrderNavigation"}
            my_prop={<CustomerOderNavigation />}
          />
        </Tabs>
      </div>
    );
  }
}

export default CustomerNavigation;
