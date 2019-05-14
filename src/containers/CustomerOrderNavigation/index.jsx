import React, { Component } from "react";
import { Tabs, Modal, Spin } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingPayment from "../OrderListWaitingPayment";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";
import dummyProductOrder from "../../dummy/dummyProductOrder";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailsCancel from "../OrderDetailsCancel";
import { apiGetWithToken, patchService } from "../../api/services";
import { PATH_DASHBOARD_TAB, PATH_ORDER } from "../../api/path";
import OrderListingCancel from "../OrderListingCancel";

const confirm = Modal.confirm;

class CustomerOderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      orderDetailsId: "",
      isShowOrderDetailsDashboard: false,
      productOrderNotYetPay: [],
      productOrderNotYetSent: [],
      productOrderTabsInDelivery: [],
      productOrderTabsFinish: [],
      productOrderTabsCancel: [],
      productorder: [],
      stateCancelOrder: [],
      message: "",
      orderIdProduct: null,
      loading: false

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

  productOrderTabsNotYetPay = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_PAID);
      //const response = await dummyProductOrder;
      const productOrderTabsNotYetPay = {
        productOrderNotYetPay: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetPay,
        isProductAvailable: true
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
      const orderId = response.data.data.map(order => order.orderId)
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetSent,
        orderIdProduct: orderId
      });
      console.log('ini responssssssssse', this.state.orderIdProduct);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  productOrderTabsInDelivery = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      const productOrderTabsInDelivery = {
        productOrderTabsInDelivery: response.data.data
      };
      this.setState({
        ...productOrderTabsInDelivery
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  productOrderTabsFinish = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      const productOrderTabsFinish = {
        productOrderTabsFinish: response.data.data
      };
      this.setState({
        ...productOrderTabsFinish
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  // productOrderTabsCancel = async () => {
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_CANCEL);
  //     console.log('ini message555', response);
  //     const productOrderTabsCancel = {
  //       productOrderTabsCancel: response.data.data
  //     };
  //     this.setState({
  //       ...productOrderTabsCancel,
  //       isProductAvailable: true
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // actionCancelConfirm = async (orderId, index) => {
  //   try {
  //     const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL, orderId);
  //     console.log('tessss', response);
  //     const cancelOrder = orderId.splice(index, 1)
  //     const newOrder = [...orderId]
  //     this.setState({
  //       productOrderNotYetPay: newOrder,
  //       productOrderTabsCancel: [...this.state.productOrderTabsCancel, ...cancelOrder]
  //     })
  //     console.log('ini order id customer order navigation', this.state.id);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  showDeleteConfirm = (order, index) => {
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: "Anda yakin ingin membatalkan pesanan?",
      content: "Pesanan yang anda buat akan kami batalkan",
      okText: "Batalkan",
      okType: "danger",
      cancelText: "Kembali",
      onOk: () => {
        const cancelOrder = order.splice(index, 1)
        const newOrder = [...order]
        this.setState({
          productorder: newOrder,
          stateCancelOrder: [...this.state.stateCancelOrder, ...cancelOrder]
        })

        // this.actionCancelConfirm(order.orderId, index);
      },
    });
  }

  // actionShowOrderListWaitingPayment = () => {
  //   this.setState({
  //     isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
  //   });
  // };

  // actionShowOrderDetailsDashboard = () => {
  //   this.actionShowOrderListWaitingPayment();
  // };

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <CustomTabPane
          key={"1"}
          tab={
            <span
             /*onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}*/
            >{"Belum Bayar"}</span>}
          my_prop={
            this.state.productOrderNotYetPay.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) :
              (<OrderListWaitingPayment
                //isShowOrderDetailsDashboard={this.state.isShowOrderDetailsDashboard}
                //actionShowOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                //actionShowOrderListWaitingPayment={() => this.actionShowOrderListWaitingPayment()}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                tabsNotPay={1}
                labelTabDetails={"Belum Bayar"}
              />)
          }
        />
        <CustomTabPane
          key={"2"}
          tab={<span
             /*onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}*/>{"Belum Dikirim"}</span>}
          my_prop={
            this.state.productOrderNotYetSent.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                <OrderListWaitingPayment
                  //isShowOrderDetailsDashboard={this.state.isShowOrderDetailsDashboard}
                  //actionShowOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                  //actionShowOrderListWaitingPayment={() => this.actionShowOrderListWaitingPayment()}
                  orderProduct={this.state.productOrderNotYetSent}
                  showDeleteConfirm={this.showDeleteConfirm}
                  labelTabDetails={"Belum Dikirim"}
                  tabsNotSent={2}
                />)}
        />
        <CustomTabPane
          key={"3"}
          tab={<span
             /*onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}*/>
            {"Dalam Pengiriman"}
          </span>}
          my_prop={
            this.state.productOrderTabsInDelivery.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                <OrderListWaitingPayment
                  //isShowOrderDetailsDashboard={this.state.isShowOrderDetailsDashboard}
                  //actionShowOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                  //actionShowOrderListWaitingPayment={() => this.actionShowOrderListWaitingPayment()}
                  orderProduct={this.state.productOrderTabsInDelivery}
                  showDeleteConfirm={this.showDeleteConfirm}
                  labelTabDetails={"Dalam Pengiriman"}
                  tabsInDelivery={3}
                />)
          } />
        <CustomTabPane
          key={"4"}
          tab={<span
            /*onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}*/>{"Selesai"}</span>}
          my_prop={
            this.state.productOrderTabsFinish.length < 1 ?
              (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
                <NoOrderHistory /></Spin>
              ) : (
                <OrderListWaitingPayment
                  //isShowOrderDetailsDashboard={this.state.isShowOrderDetailsDashboard}
                  //actionShowOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                  // actionShowOrderListWaitingPayment={() => this.actionShowOrderListWaitingPayment()}
                  orderProduct={this.state.productOrderTabsFinish}
                  showDeleteConfirm={this.showDeleteConfirm}
                  tabsFinish={4}
                />)
          } />
        <CustomTabPane
          key={"5"}
          tab={<span
            onClick={() =>
              this.setState({ isShowOrderDetailsDashboard: false })
            }>
            {"Batal"}
          </span>
          }
          my_prop={
            this.state.stateCancelOrder.length < 1 ?
              (<NoOrderHistory />)
              :
              (<OrderListingCancel
                //isShowOrderDetailsDashboard={this.state.isShowOrderDetailsDashboard}
                //actionShowOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                // actionShowOrderListWaitingPayment={() => this.actionShowOrderListWaitingPayment()}
                orderProduct={this.state.stateCancelOrder}
                showDeleteConfirm={this.showDeleteConfirm}
                tabsCancel={5}
              />)
          }
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
