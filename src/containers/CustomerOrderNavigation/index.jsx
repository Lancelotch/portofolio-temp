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
      productorder: [],
      productOrderNotYetSent: [],
      stateCancelOrder: []

    };
  }
  componentDidMount() {
    this.productOrderTabsNotYetPay();
    this.productOrderTabsNotYetSent();
  }

  productOrderTabsNotYetPay = async () => {
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
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      //const response = await dummyProductOrder;
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

  actionCancelConfirm = async (order, index) => {
    let orderId = ""
    this.state.productOrderNotYetSent.map(order=>{
     orderId = order.orderId
     return orderId
    })
    try {
      const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL, orderId);
      // console.log('tessss',response);
      const cancelOrder = order.splice(index, 1)
      const newOrder = [...order]
      this.setState({
        productOrderNotYetPay: newOrder,
        stateCancelOrder: [...this.state.stateCancelOrder, ...cancelOrder]
      })
      console.log('ini order id customer order navigation',orderId);
      
    } catch (error) {
      console.log(error);
    }
  }

  showDeleteConfirm = (order,index) => {
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
          productOrderNotYetPay: newOrder,
          stateCancelOrder: [...this.state.stateCancelOrder, ...cancelOrder]
        })
      },
    });
  }

  showOrderDetailsDashboard = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  OrderDetailsDashboardDetailById = (orderId) => {
    this.showOrderDetailsDashboard();
    this.setState({
      orderDetailsId: orderId
    });
    console.log(orderId);

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
                viewOrderDetail={() => this.OrderDetailsDashboardDetailById()}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                index={1}
              />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
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
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
                orderProduct={this.state.productOrderNotYetSent}
                showDeleteConfirm={this.showDeleteConfirm}
                index={2} />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                  orderDetailsId={this.state.orderDetailsId} index={2} />
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
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                index={3} />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                  orderDetailsId={this.state.orderDetailsId} index={3} />

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
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                index={4} />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                  orderDetailsId={this.state.orderDetailsId} index={4} />

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
                  viewOrderDetail={this.OrderDetailsDashboardDetailById}
                  orderProduct={this.state.stateCancelOrder}
                  showDeleteConfirm={this.showDeleteConfirm}
                  index={5}
                />) : (
                  <OrderDetailsCancel
                    showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                    orderDetailsId={this.state.orderDetailsId}
                    index={4} />
                )
              )}
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
