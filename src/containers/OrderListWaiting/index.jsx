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

class OrderListWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
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
      if (response.code === 200 || response.code === "200") {
        this.props.actionUpdateTab(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // sortList = (list, order) => {
  //   if (order === "ASC") {
  //     return list.sort((a, b) => {
  //       return parseFloat(a.order.orderActivityDate.orderDate) - parseFloat(b.order.orderActivityDate.orderDate);
  //     })
  //   }
  //   else {
  //     return list.sort((a, b) => {
  //       return parseFloat(b.order.orderActivityDate.orderDate) - parseFloat(a.order.orderActivityDate.orderDate);
  //     });
  //   }
  // }


  render() {
    const {
      labelTabDetails,
      estimateAccepted,
      actionShowOrderDetailsDashboard,
      showOrderDetailsDashboard,
      productOrder,
      showReceivedConfirm,
      isHowToShowModalOpen,
      selectedOrder,
      showHowToModalPayment
    } = this.props;
    // const sortProdcutOrder = this.sortList(productOrder, "DESC")
    return (
      <div className="orderListWaiting">
        <ScrollToTopOnMount />
        {productOrder.map((order, index) => {
          return (
            <Card style={{ marginBottom: 15 }} key={index}>
              <ProductOrder
                key={order.id}
                order={order}
                orderItems={order.order.orderItems}
              />
              <hr className="mp-inline" />
              <WaitingPayment
                labelNotPay={strings.before_pay}
                labelNotSent={strings.in_delivery}
                labelFinish={strings.order_received}
                labelInDelivery={strings.estimate_accepted_order}
                labelCancel={strings.cancel_order_by}
                tabsShowItem={showOrderDetailsDashboard}
                id={order.id}
                indexes={order.order}
              />
              <ButtonDashboard
                id={order.id}
                index={index}
                status={order.status}
                invoiceNumber={order.invoiceNumber}
                tabsShowItem={showOrderDetailsDashboard}
                showReceivedConfirm={showReceivedConfirm}
                showDeleteConfirm={this.showDeleteConfirm}
                orderProduct={productOrder}
                order={order.order}
                showHowToModalPayment={showHowToModalPayment}
                showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order, index, showOrderDetailsDashboard, labelTabDetails, estimateAccepted)}
              />
            </Card>)
        })}
        {selectedOrder && (
          <ModalHowToPay
            orderPayment={selectedOrder.payment}
            visible={isHowToShowModalOpen}
            close={showHowToModalPayment}
          />
        )}
      </div>
    );
  }
}

export default OrderListWaiting;
