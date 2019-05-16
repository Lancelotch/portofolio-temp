import React, { Component } from "react";
import { Tabs } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingInDelivery from "../OrderListWaitingInDelivery";
import OrderListWaitingFinish from "../OrderListWaitingFinish";
import OrderListWaitingNotSent from "../OrderListWaitingNotSent";
import OrderListWaitingNotPay from "../OrderListWaitingNotPay";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import OrderDetailsCancel from "../OrderDetailsCancel";
import OrderListWaitingCancel from "../OrderListWaitingCancel";


class CustomerOderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowOrderDetailsDashboard: false,
      orderId: null
    };
  }


  componentWillUnmount() {
    this.setState({
      loading: false
    });
  }

  actionShowOrderListWaiting = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  actionShowOrderDetailsDashboard = (orderId) => {
    this.actionShowOrderListWaiting();
    this.setState({
      orderId: orderId
    })
  };

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <CustomTabPane
          key={"1"}
          tab={
            <span
              onClick={() =>
                this.setState({
                  isShowOrderDetailsDashboard: false
                })}
            >{"Belum Bayar"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              (<OrderListWaitingNotPay
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                tabsNotPay={1}
              />) : (
                <OrderDetailsDashboard orderId={this.state.orderId}
                  actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                  tabsNotPay={1}
                />)
          }
        />
        <CustomTabPane
          key={"2"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>{"Belum Dikirim"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              <OrderListWaitingNotSent
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                tabsNotSent={2}
              /> : (
                <OrderDetailsDashboard orderId={this.state.orderId}
                  actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                  tabsNotSent={2}
                />
              )
          }
        />
        <CustomTabPane
          key={"3"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>
            {"Dalam Pengiriman"}
          </span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              <OrderListWaitingInDelivery
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                tabsInDelivery={3}
              /> : (
                <OrderDetailsDashboard orderId={this.state.orderId}
                  actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                  tabsInDelivery={3}
                />
              )
          } />
        <CustomTabPane
          key={"4"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>{"Selesai"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              <OrderListWaitingFinish
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                tabsFinish={4}
              /> : (
                <OrderDetailsDashboard orderId={this.state.orderId}
                  actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                  tabsFinish={4}
                />
              )
          } />
        <CustomTabPane
          key={"5"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>{"Batal"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              <OrderListWaitingCancel
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
              /> : (
                <OrderDetailsCancel orderId={this.state.orderId}
                  actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                />
              )
          }
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
