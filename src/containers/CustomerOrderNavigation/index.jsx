import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingPayment from "../OrderListWaitingPayment";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";
import dummyProductOrder from "../../dummy/dummyProductOrder";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailPembatalan from "../OrderDetailPembatalan";

const confirm = Modal.confirm;

class CustomerOderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      isShowOrderDetailsDashboard: false,
      top: 10,
      bottom: 10,
      productorder: [],
      stateCancelOrder: []

    };
  }
  componentDidMount() {
    this.productOrderListWaitingPayment();
  }

  productOrderListWaitingPayment = async () => {
    try {
      const responseDummy = await dummyProductOrder;
      const OrderListWaitingPayment = {
        productorder: responseDummy.data
      };
      this.setState({
        ...OrderListWaitingPayment
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      },
    });
  }

  showOrderDetailsDashboard = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  OrderDetailsDashboardDetailById = id => {
    this.showOrderDetailsDashboard();
    this.setState({
      orderDetailsId: id
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
                this.setState({
                  isShowOrderDetailsDashboard: false
                })
              }
            >{"Belum Bayar"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
                orderProduct={this.state.productorder}
                showDeleteConfirm={this.showDeleteConfirm}
                index={1}
              />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                  orderDetailsId={this.state.orderDetailsId} index={1} />
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
                orderProduct={this.state.productorder}
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
                orderProduct={this.state.productorder}
                showDeleteConfirm={this.showDeleteConfirm}
                index={3} />
            ) : (
                <OrderDetailsDashboard
                  showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                  orderDetailsId={this.state.orderDetailsId} index={3} />

              )} />
        <CustomTabPane
          key={"4"}
          tab={<span>{"Selesai"}</span>}
          my_prop={
            this.state.isShowOrderDetailsDashboard === false ? (
              <OrderListWaitingPayment
                viewOrderDetail={this.OrderDetailsDashboardDetailById}
                orderProduct={this.state.productorder}
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
                  <OrderDetailPembatalan
                    showOrderDetailsDashboard={this.showOrderDetailsDashboard}
                    orderDetailsId={this.state.orderDetailsId} index={4} />
                )
              )}
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
