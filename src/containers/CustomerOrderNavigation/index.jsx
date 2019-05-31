import React, { Component } from "react";
import { Tabs, Spin, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingInDelivery from "../OrderListWaitingInDelivery";
import OrderListWaitingFinish from "../OrderListWaitingFinish";
import OrderListWaitingNotSent from "../OrderListWaitingNotSent";
import OrderListWaitingNotPay from "../OrderListWaitingNotPay";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import OrderDetailsCancel from "../OrderDetailsCancel";
import OrderListWaitingCancel from "../OrderListWaitingCancel";
import { apiGetWithToken, patchService } from "../../api/services";
import { PATH_DASHBOARD_TAB, PATH_ORDER } from "../../api/path";
import NoOrderHistory from "../../components/NoOrderHistory";

const confirm = Modal.confirm;

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
      stateCancelOrder: [],
      isLoading: false,
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
        isLoading: false
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isLoading: false });
      }
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetSent,
        isLoading: false
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isLoading: false });
      }
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
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        this.setState({ isLoading: false });
      }
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
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        this.setState({ isLoading: false });
      }
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
        isLoading: false
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isLoading: false });
      }
    }
  };

  updateTabNotPay = () => {
    this.setState({
      productOrderNotYetPay: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsNotYetPay());
  };

  updateTabNotSent = () => {
    this.setState({
      productOrderNotYetSent: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsNotYetSent());
  };

  updateTabInDelivery = () => {
    this.setState({
      productOrderInDelivery: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsInDelivery());
  };

  updateTabFinish = () => {
    this.setState({
      productOrderFinish: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsFinish());
  };

  updateTabCancel = () => {
    this.setState({
      productOrderCancel: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsCancel());
  };

  handleChange = (selectedkey) => {
    this.setState({ activeKey: selectedkey })
    const fnName = keyFnNames[selectedkey];
    if (fnName) {
      this[fnName]();
    }
  };

  showDeleteConfirm = (allOrder, index) => {
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: "Anda yakin ingin membatalkan pesanan?",
      content: "Pesanan yang anda buat akan kami batalkan",
      okText: "Batalkan",
      okType: "danger",
      cancelText: "Kembali",
      centered: true,
      onOk: () => {
        const cancelOrder = allOrder.splice(index, 1)
        const newOrder = [...allOrder]
        this.setState({
          productorder: newOrder,
          stateCancelOrder: [...this.state.stateCancelOrder, ...cancelOrder]
        })
        console.log(index)
        this.actionCancelConfirm(index);
      },
    });
  };

  actionCancelConfirm = async (index) => {
    try {
      const orderId = {
        orderId: index
      }
      const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL, orderId);
    } catch (error) {
      console.log(error);
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
            this.state.productOrderNotYetPay.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.isLoading} delay={500}>
                <NoOrderHistory />
              </Spin>
              ) : (
                this.state.isShowOrderDetailsDashboard === false ?
                  (<OrderListWaitingNotPay
                    showDeleteConfirm={this.showDeleteConfirm}
                    productOrderNotYetPay={this.state.productOrderNotYetPay}
                    actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                    tabsNotPay={1}
                  />) : (
                    <OrderDetailsDashboard
                      orderId={this.state.orderId}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                      tabsNotPay={1}
                    />)
              )

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
              (<Spin tip="Loading..." spinning={this.state.isLoading} delay={500}>
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
              (<Spin tip="Loading..." spinning={this.state.isLoading} delay={500}>
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
              (<Spin tip="Loading..." spinning={this.state.isLoading} delay={500}>
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
              (<Spin tip="Loading..." spinning={this.state.isLoading} delay={500}>
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
