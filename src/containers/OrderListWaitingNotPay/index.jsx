import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Card,Modal } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";
import { patchService } from "../../api/services";
import { PATH_ORDER } from "../../api/path";

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

  showDeleteConfirm = (allOrder, index) => {
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: strings.tab_belum_bayar,
      content: strings.tabs_belum_bayar_pesan_batalkan,
      okText: strings.cancel,
      okType: "danger",
      cancelText: strings.back,
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


  toggleIsHowToShowModalOpen = order => {
    console.log(order);
    
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
console.log('adasdsadasd',productOrderNotYetPay);

    return (
      <React.Fragment>
        {productOrderNotYetPay.map((order, i) => {
          return (
            <Card style={{ marginBottom: 15 }} key={i}>
                <ProductOrder
                  key={order.id}
                  indexes={order.order.orderItems}
                />
              <hr className="productOrder__inline" />
              <WaitingPayment
                labelNotPay={"Bayar Sebelum"}
                estimateShippingDate={order.estimateShippingDate}
                receivedDate={order.receivedDate}
                tabsNotPay={1}
                key={order.id}
                endDatePay={order.endDatePay}
                indexes={order.order}
                pay={order.payment}
              />
               <Pay
                tabsFinish={tabsFinish}
                tabsNotPay={tabsNotPay}
                tabsInDelivery={tabsInDelivery}
                tabsNotSent={tabsNotSent}
                showDeleteConfirm={this.showDeleteConfirm}
                orderProduct={productOrderNotYetPay}
                order={order.order}
                showHowToModalPayment={this.toggleIsHowToShowModalOpen}
                showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.order.id)}
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
      }
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
