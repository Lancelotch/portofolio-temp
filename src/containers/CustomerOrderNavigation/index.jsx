import React, { Component } from "react";
import { Tabs, Icon, Col, Button, Affix } from "antd";

import OrderListWaitingPayment from "../OrderListWaitingPayment";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";
import { CustomTabPane } from "../../components/CustomTabDashboard";

class CustomerOderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      isShowOrderDetailsDashboard: false,
      top: 10,
      bottom: 10

    };
  }

  showOrderDetailsDashboard = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  OrderDetailsDashboardDetailById = id => {
    this.showOrderDetailsDashboard();
    this.setState({
      invoiceId: id
    });
  };

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <CustomTabPane
          key={"1"}
          tab={
            <span
              onClick={() =>
                this.setState({ isShowOrderDetailsDashboard: false })
              }
            >
              {"Belum Bayar"}
            </span>
          }
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
              />
            ) : (
                <React.Fragment>
                <Affix offsetTop={this.state.top}>
                <Button style={{ float: "right" }} onClick={() => this.showOrderDetailsDashboard()}>Back</Button>
              </Affix>
                  <OrderDetailsDashboard invoiceId={this.state.invoiceId} />
                </React.Fragment>
              )
          }
        />
        <CustomTabPane key={"2"} tab={<span>{"Belum Dikirim"}</span>} />
        <CustomTabPane key={"3"} tab={<span>{"Dalam Pengiriman"}</span>} />
        <CustomTabPane key={"4"} tab={<span>{"Selesai"}</span>} />
        <CustomTabPane key={"5"} tab={<span>{"Batal"}</span>} />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
