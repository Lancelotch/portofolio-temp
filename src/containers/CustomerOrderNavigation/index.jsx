import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingPayment from "../OrderListWaitingPayment";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";
import dummyProductOrder from "../../dummy/dummyProductOrder";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailsCancel from "../OrderDetailsCancel";
import { apiGetWithToken, patchService } from "../../api/services";
import { PATH_DASHBOARD_TAB, PATH_ORDER } from "../../api/path";

const confirm = Modal.confirm;

class CustomerOderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      orderDetailsId: "",
      isShowOrderDetailsDashboard: false,
      isProductAvailable: false,
      top: 10,
      bottom: 10,
      productOrderNotYetPay: [],
      productOrderNotYetSent: [],
      productOrderTabsInDelivery: [],
      productOrderTabsFinish:[],
      productOrderTabsCancel:[],
      stateCancelOrder: [],
      message: "",
      orderId: null

    };
  }
  componentDidMount() {
    this.productOrderTabsNotYetPay();
    this.productOrderTabsNotYetSent();
    this.productOrderTabsInDelivery();
    this.productOrderTabsFinish();
  }

  productOrderTabsNotYetPay = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_PAID);
      //const response = await dummyProductOrder;
      console.log('ini message222', response);
      const productOrderTabsNotYetPay = {
        productOrderNotYetPay: response.data.data
      };
      console.log('iiiiiiiiiiiiiiiidcustomerordernavigation', productOrderTabsNotYetPay);
      this.setState({
        ...productOrderTabsNotYetPay,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      console.log('ini message111', response);
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetSent,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  productOrderTabsInDelivery = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      console.log('ini message333', response);
      const productOrderTabsInDelivery = {
        productOrderTabsInDelivery: response.data.data
      };
      this.setState({
        ...productOrderTabsInDelivery,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  productOrderTabsFinish = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      console.log('ini message444', response);
      const productOrderTabsFinish = {
        productOrderTabsFinish: response.data.data
      };
      this.setState({
        ...productOrderTabsFinish,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  // productOrderTabsCancel = async () => {
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_CANCEL);
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

  actionCancelConfirm = async (orderId, index) => {
    console.log('ini ooooooooooorder',orderId);
    try {
      const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL, orderId);
      console.log('tessss', response);
      const cancelOrder = orderId.splice(index, 1)
      const newOrder = [...orderId]
      this.setState({
        productOrderNotYetPay: newOrder,
        productOrderTabsCancel: [...this.state.productOrderTabsCancel, ...cancelOrder]
      })
      console.log('ini order id customer order navigation', this.state.id);

    } catch (error) {
      console.log(error);
    }
  }

  showDeleteConfirm = (order, index) => {
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: "Anda yakin ingin membatalkan pesanan?",
      content: "Pesanan yang anda buat akan kami batalkan",
      okText: "Batalkan",
      okType: "danger",
      cancelText: "Kembali",
      onOk: () => {
       this.actionCancelConfirm(order.orderId,index);
      },
    });
  }

  actionShowOrderListWaitingPayment = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  actionShowOrderDetailsDashboard = (order) => {
    console.log('actionshoworderdetailsdashboard',order);
    
    this.actionShowOrderListWaitingPayment();
    this.setState({
      orderDetailsId: order
    });
    console.log(order);

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
                })
              }
            >{"Belum Bayar"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                isProductAvailable={this.state.isProductAvailable}
                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                index={1}
              />
            ) : (
                <OrderDetailsDashboard
                  showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                  orderDetailsId={this.state.productOrderNotYetPay}
                  index={1}
                />
              )
          }
        />
        <CustomTabPane
          key={"2"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })
            }>{"Belum Dikirim"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                isProductAvailable={this.state.isProductAvailable}
                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                orderProduct={this.state.productOrderNotYetSent}
                showDeleteConfirm={this.showDeleteConfirm}
                index={2} />
            ) : (
                <OrderDetailsDashboard
                  showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                  orderDetailsId={this.state.productOrderTabsNotYetSent}
                  index={2} />
              )} />
        <CustomTabPane
          key={"3"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })
            }>
            {"Dalam Pengiriman"}
          </span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                showOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                orderProduct={this.state.productOrderTabsInDelivery}
                showDeleteConfirm={this.showDeleteConfirm}
                index={3} />
            ) : (
                <OrderDetailsDashboard
                  showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                  orderDetailsId={this.state.productOrderTabsInDelivery} index={3} />

              )} />
        <CustomTabPane
          key={"4"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>{"Selesai"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                showOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                orderProduct={this.state.productOrderTabsFinish}
                showDeleteConfirm={this.showDeleteConfirm}
                index={4} />
            ) : (
                <OrderDetailsDashboard
                  showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                  orderDetailsId={this.state.productOrderTabsFinish} index={4} />

              )} />
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
              (this.state.isShowOrderDetailsDashboard === false ?
                (<OrderListWaitingPayment
                  showOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                  orderProduct={this.state.stateCancelOrder}
                  showDeleteConfirm={this.showDeleteConfirm}
                  index={5}
                />) : (
                  <OrderDetailsDashboard
                    showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                    orderDetailsId={this.state.orderDetailsId}
                    index={5} />
                )
              )}
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
