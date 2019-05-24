import React, { Component } from "react";
import { Tabs, Spin } from "antd";
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
import NoOrderHistory from "../../components/NoOrderHistory";


const keyFnNames = {
  '1': 'updateTabNotPay',
  '2': 'updateTabNotSent',
  '3': 'updateTabInDelivery',
  '4': 'updateTabFinish',
  '5': 'updateTabCancel'
};

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
      productOrderFinish: [],
      productOrderCancel: []
    };
  }

  componentDidMount() {
    this.productOrderTabsNotYetPay();
  };


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
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_PAID);
      const productOrderTabsNotYetPay = {
        productOrderNotYetPay: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetPay,
        loading: true
      });
    } catch (error) {
      console.log();
      if (error.message === 'Request failed with status code 404') {
        this.setState({ loading: false });
      }
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data,
        loading: true
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
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      const productOrderTabsInDelivery = {
        productOrderInDelivery: response.data.data
      };
      this.setState({
        ...productOrderTabsInDelivery,
        loading: true
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  productOrderTabsFinish = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      const productOrderTabsFinish = {
        productOrderFinish: response.data.data
      };
      this.setState({
        ...productOrderTabsFinish,
        loading: true
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  productOrderTabsCancel = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_CANCEL);
      const productOrderTabsCancel = {
        productOrderCancel: response.data.data
      };
      this.setState({
        ...productOrderTabsCancel,
        loading: true
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
  };

  updateTabInDelivery = () => {
    this.productOrderTabsInDelivery();
  };

  updateTabFinish = () => {
    this.productOrderTabsFinish();
  };

  updateTabCancel = () => {
    this.productOrderTabsCancel();
  };

  handleChange = (selectedkey) => {
    this.setState({ activeKey: selectedkey })
    const fnName = keyFnNames[selectedkey];
    if (fnName) {
      this[fnName]();
    }
  };

  render() {
    return (
      <Tabs activeKey={this.state.activeKey} onChange={this.handleChange} >
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
            this.state.productOrderNotYetSent.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={100}>
                <NoOrderHistory /></Spin>
              ) : (
                this.state.isShowOrderDetailsDashboard === false ?
                  <OrderListWaitingNotSent
                    actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                    productOrderNotYetSent={this.state.productOrderNotYetSent}
                    tabsNotSent={2}
                  /> : (
                    <OrderDetailsDashboard orderId={this.state.orderId}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                      tabsNotSent={2}
                    />)
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
            this.state.productOrderInDelivery.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                this.state.isShowOrderDetailsDashboard === false ?
                  <OrderListWaitingInDelivery
                    productOrderInDelivery={this.state.productOrderInDelivery}
                    actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                    tabsInDelivery={3}
                  /> : (
                    <OrderDetailsDashboard orderId={this.state.orderId}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                      tabsInDelivery={3}
                    />)
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
            this.state.productOrderFinish.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                this.state.isShowOrderDetailsDashboard === false ?
                  <OrderListWaitingFinish
                    productOrderFinish={this.state.productOrderFinish}
                    actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                    tabsFinish={4}
                  /> : (
                    <OrderDetailsDashboard orderId={this.state.orderId}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                      tabsFinish={4}
                    />)
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
            this.state.productOrderCancel.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                this.state.isShowOrderDetailsDashboard === false ?
                  <OrderListWaitingCancel
                    productOrderCancel={this.state.productOrderCancel}
                    actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                  /> : (
                    <OrderDetailsCancel orderId={this.state.orderId}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                    />)
              )
          }
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
