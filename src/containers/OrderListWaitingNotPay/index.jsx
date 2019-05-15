import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Modal, Spin } from "antd";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import NoOrderHistory from "../../components/NoOrderHistory";
import WaitingPayment from "../../components/WaitingPayment";


const confirm = Modal.confirm;

class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHowToShowModalOpen: false,
      stateCancelOrder: [],
      orderId: null,
      loading: false,
      selectedOrder: null,
      productOrderNotYetPay: []
    };
  }
  componentDidMount() {
    this.productOrderTabsNotYetPay();
  }

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

  componentWillUnmount() {
    this.setState({
      loading: false
    });
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

        // this.actionCancelConfirm(order.orderId, index);
      },
    });
  }

  toggleIsHowToShowModalOpen = order => {
    this.setState({
      isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
      selectedOrder: order ? order : null
    });
  };

  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent } = this.props;
    return (
      <React.Fragment>
        {this.state.productOrderNotYetPay.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {this.state.productOrderNotYetPay.map((order, i) => {
                return (
                  <div className="waitingPayment__list" key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <WaitingPayment
                      labelNotPay={"Bayar Sebelum"}
                      estimateShippingDate={order.estimateShippingDate}
                      receivedDate={order.receivedDate}
                      tabsNotPay={1}
                      key={order.id}
                      endDatePay={order.endDatePay}
                      indexes={order.indexes}
                      pay={order.payment}
                    />
                    <Pay
                      productId={order.indexes}
                      tabsFinish={tabsFinish}
                      tabsNotPay={tabsNotPay}
                      tabsInDelivery={tabsInDelivery}
                      tabsNotSent={tabsNotSent}
                      showDeleteConfirm={this.showDeleteConfirm}
                      orderProduct={this.state.productOrderNotYetPay}
                      i={order.orderId}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </div>
                )
              })}
              {this.state.selectedOrder && (
                <ModalHowToPay
                  payBank={this.state.selectedOrder.bank}
                  key={this.state.selectedOrder.orderId}
                  endDatePay={this.state.selectedOrder.endDatePay}
                  pay={this.state.selectedOrder.payment}
                  indexes={this.state.selectedOrder.indexes}
                  visible={this.state.isHowToShowModalOpen}
                  close={() => this.toggleIsHowToShowModalOpen()}
                />
              )}
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
