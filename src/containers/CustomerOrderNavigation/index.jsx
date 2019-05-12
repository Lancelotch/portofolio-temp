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
import OrderDetails from "../OrderDetailsDashboard/OrderDetails";
import OrderDetailsId from "../OrderDetailsDashboard/OrderDetailsId";
import OrderDetailsIdWrapping from "../OrderDetailsDashboard/OrderDetailsIdWrapping";

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
      productOrderTabsFinish: [],
      productOrderTabsCancel: [],
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
      console.log('ini responssssssssse',response);
      
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

  productOrderTabsCancel = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_CANCEL);
      console.log('ini message555', response);
      const productOrderTabsCancel = {
        productOrderTabsCancel: response.data.data
      };
      this.setState({
        ...productOrderTabsCancel,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  actionCancelConfirm = async (orderId, index) => {
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
        this.actionCancelConfirm(order.orderId, index);
      },
    });
  }

  actionShowOrderListWaitingPayment = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  actionShowOrderDetailsDashboard = (orderId) => {
    this.actionShowOrderListWaitingPayment();
    this.setState({
      orderDetailsId: orderId
    });
    console.log('iniiiiiiiiiii order', orderId);

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
              <OrderListWaitingPayment
                isProductAvailable={this.state.isProductAvailable}
                //showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                orderProduct={this.state.productOrderNotYetPay}
                showDeleteConfirm={this.showDeleteConfirm}
                tabsNotPay={1}
                labelTabDetails={"Belum Bayar"}
              />     
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
            <OrderListWaitingPayment
              isProductAvailable={this.state.isProductAvailable}
              orderProduct={this.state.productOrderNotYetSent}
              showDeleteConfirm={this.showDeleteConfirm}
              labelTabDetails={"Belum Dikirim"}
              tabsNotSent={2}
            />} />
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
            <OrderListWaitingPayment
              orderProduct={this.state.productOrderTabsInDelivery}
              showDeleteConfirm={this.showDeleteConfirm}
              labelTabDetails={"Dalam Pengiriman"}
              tabsInDelivery={3}
            />
          } />
        <CustomTabPane
          key={"4"}
          tab={<span
            onClick={() =>
              this.setState({
                isShowOrderDetailsDashboard: false
              })}>{"Selesai"}</span>}
          my_prop={
            <OrderListWaitingPayment
              showOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
              orderProduct={this.state.productOrderTabsFinish}
              showDeleteConfirm={this.showDeleteConfirm}
              tabsFinish={4}
            />
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
              (<OrderListWaitingPayment
                showOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
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
