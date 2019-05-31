import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Card } from "antd";
import WaitingPayment from "../../components/WaitingPayment";


class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHowToShowModalOpen: false,
      orderId: null,
      selectedOrder: null
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
      actionShowOrderDetailsDashboard,
      tabsNotSent,
      productOrderNotYetPay,
      showDeleteConfirm
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
                    showDeleteConfirm={showDeleteConfirm}
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
