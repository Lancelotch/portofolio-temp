import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Modal, Spin, Card } from "antd";
import { patchService } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
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
      // loading: this.props.loading,
      selectedOrder: null,
      // productOrderNotYetPay: [],
      // bank: null,
      // paymentInstruction: null
    };
  }
  // componentDidMount() {
  //   this.productOrderTabsNotYetPay();
  // }

  // productOrderTabsNotYetPay = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_PAID);
  //     const productOrderTabsNotYetPay = {
  //       bank: response.data.data,
  //       productOrderNotYetPay: response.data.data,
  //       paymentInstruction: response.data.data
  //     };
  //     this.setState({
  //       ...productOrderTabsNotYetPay
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false });
  //   }
  // };

  actionCancelConfirm = async (index) => {
    console.log('actioncancelconfirm', index);

    try {
      const orderId = {
        orderId: index
      }
      const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL, orderId);
    } catch (error) {
      console.log(error);
    }
  }

  // componentWillUnmount() {
  //   this.setState({
  //     loading: false
  //   });
  // };

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

  toggleIsHowToShowModalOpen = order => {
    this.setState({
      isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
      selectedOrder: order ? order : null
    });
  };


  render() {
    const { isHowToShowModalOpen, selectedOrder } = this.state;
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent,
      productOrderNotYetPay
    } = this.props;
    return (
            <React.Fragment>
              {productOrderNotYetPay.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <hr className="productOrder__inline" />
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
                      orderProduct={productOrderNotYetPay}
                      i={order.orderId}
                      showHowToModalPayment={this.toggleIsHowToShowModalOpen}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                )
              })}
              {selectedOrder && (
                <ModalHowToPay
                  payBank={selectedOrder.bank}
                  key={selectedOrder.orderId}
                  endDatePay={selectedOrder.endDatePay}
                  pay={selectedOrder.payment}
                  indexes={selectedOrder.indexes}
                  paymentInstruction={selectedOrder.paymentInstruction}
                  visible={isHowToShowModalOpen}
                  close={this.toggleIsHowToShowModalOpen}
                />
              )}
            </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
