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
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";



class CustomerOderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowOrderDetailsDashboard: false,
      orderId: null,
      activeKey: "1",
      loading: false,
      productOrderNotYetPay: [],
      productOrderNotYetSent: [],
      productOrderInDelivery: [],
      productOrderFinish: []
    };
  }

  componentDidMount() {
    this.productOrderTabsNotYetPay();
    this.productOrderTabsNotYetSent();
    this.productOrderTabsInDelivery();
    this.productOrderTabsFinish();
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



  productOrderTabsNotYetPay = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_PAID);
      const productOrderTabsNotYetPay = {
        productOrderNotYetPay: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetPay
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  productOrderTabsNotYetSent = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetSent
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  productOrderTabsInDelivery = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      const productOrderTabsInDelivery = {
        productOrderInDelivery: response.data.data
      };
      this.setState({
        ...productOrderTabsInDelivery
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  productOrderTabsFinish = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      const productOrderTabsFinish = {
        productOrderFinish: response.data.data
      };
      this.setState({
        ...productOrderTabsFinish
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  updateTabNotPay = () => {
    this.productOrderTabsNotYetPay();
  };

  updateTabNotSent = () => {
    this.productOrderTabsNotYetSent();
  }


  handleChange = (selectedkey) => {
    this.setState({ activeKey: selectedkey })
    if (selectedkey === '1') {
      this.updateTabNotPay();
    } else if (selectedkey === '2') {
      this.updateTabNotSent();
    }
  };



  render() {
    return (
      <Tabs onChange={this.handleChange}>
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
                loading={this.state.loading}
                productOrderNotYetPay={this.state.productOrderNotYetPay}
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                tabsNotPay={1}
              />) : (
                <OrderDetailsDashboard
                  orderId={this.state.orderId}
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
              })}>{"Sedang Diproses"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ?
              <OrderListWaitingNotSent
                loading={this.state.loading}
                actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                productOrderNotYetSent={this.state.productOrderNotYetSent}
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
                loading={this.state.loading}
                productOrderInDelivery={this.state.productOrderInDelivery}
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
                productOrderFinish={this.state.productOrderFinish}
                loading={this.state.loading}
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
