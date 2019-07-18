import React, { Component } from "react";
import ButtonDashboard from "../../components/ButtonDashboard";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Card, Modal } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";
import { patchService } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

const confirm = Modal.confirm;

class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHowToShowModalOpen: false,
      orderId: null,
      selectedOrder: null,
      stateCancelOrder: []
    }
  };

  showDeleteConfirm = (allOrder, index, orderId) => {
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: strings.tab_belum_bayar,
      content: strings.tabs_belum_bayar_pesan_batalkan,
      okText: strings.cancel,
      okType: "danger",
      cancelText: strings.back,
      centered: true,
      onOk: () => {
        // const cancelOrder = allOrder.splice(index, 1)
        // const newOrder = [...allOrder]
        // this.setState({
        //   productorder: newOrder,
        //   stateCancelOrder: [...this.state.stateCancelOrder, ...cancelOrder]
        // })
        this.actionCancelConfirm(orderId);
      },
    });
  };

  actionCancelConfirm = async (index) => {
    try {
      const orderId = index
      const response = await patchService(PATH_ORDER.ORDER_BY_CANCEL + orderId);
      if(response.code === 200 || response.code === "200") {
        this.props.actionUpdateTab(0);
      }
    } catch (error) {
      console.log(error);
    }
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
      actionShowOrderDetailsDashboardNotPay,
      actionShowOrderDetailsDashboardNotSent,
      actionShowOrderDetailsDashboardInDelivery,
      actionShowOrderDetailsDashboardFinish,
      actionShowOrderDetailsDashboardCancel,
      tabsNotSent,
      tabsCancel,
      productOrder,
      showReceivedConfirm
    } = this.props;
    return (
      <React.Fragment>
      <ScrollToTopOnMount/>
        {productOrder.map((order, index) => {
          return (
            <Card style={{ marginBottom: 15 }} key={index}>
              <ProductOrder
                key={order.id}
                indexes={order.order.orderItems}
              />
              <hr className="productOrder__inline" />
              <WaitingPayment
                labelNotPay={"Bayar Sebelum"}
                labelNotSent={"Dalam Proses Pengiriman"}
                labelFinish={"Pesenan Diterima"}
                labelInDelivery={"Perkiraan barang diterima"}
                labelCancel={"Pesenan dibatalkan oleh"}
                tabsNotPay={tabsNotPay}
                tabsNotSent={tabsNotSent}
                tabsInDelivery={tabsInDelivery}
                tabsFinish={tabsFinish}
                tabsCancel={tabsCancel}
                id={order.id}
                indexes={order.order}
              />
              <ButtonDashboard
                index={index}
                tabsFinish={tabsFinish}
                tabsNotPay={tabsNotPay}
                tabsInDelivery={tabsInDelivery}
                invoiceNumber={order.invoiceNumber}
                tabsNotSent={tabsNotSent}
                tabsCancel={tabsCancel}
                showReceivedConfirm={showReceivedConfirm}
                showDeleteConfirm={this.showDeleteConfirm}
                orderProduct={productOrder}
                order={order.order}
                showHowToModalPayment={this.toggleIsHowToShowModalOpen}
                showOrderDetailsDashboardInDelivery={() => actionShowOrderDetailsDashboardInDelivery(order.order, order.invoiceNumber, order.id, index)}
                showOrderDetailsDashboardNotPay={() => actionShowOrderDetailsDashboardNotPay(order.order, order.invoiceNumber, order.id, index)}
                showOrderDetailsDashboardNotSent={() => actionShowOrderDetailsDashboardNotSent(order.order, order.invoiceNumber, order.id, index)}
                showOrderDetailsDashboardFinish={() => actionShowOrderDetailsDashboardFinish(order.order, order.invoiceNumber, order.id, index)}
                showOrderDetailsDashboardCancel={() => actionShowOrderDetailsDashboardCancel(order.order, order.invoiceNumber, order.id, index)}
              />
            </Card>)
        })}
        {selectedOrder && (
          <ModalHowToPay
            orderPayment={selectedOrder.payment}
            visible={isHowToShowModalOpen}
            close={this.toggleIsHowToShowModalOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
