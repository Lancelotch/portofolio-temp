import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import { Card } from "antd";
import WaitingPayment from "../../components/WaitingPayment";


class OrderListWaitingDelivery extends Component {
  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent, productOrderInDelivery,showReceivedConfirm } = this.props;
    return (
      <React.Fragment>
        {productOrderInDelivery.map((order, i) => {
          return (
            <Card style={{ marginBottom: 15 }} key={i}>
              <ProductOrder
                key={i}
                indexes={order.order.orderItems} />
              <hr className="productOrder__inline" />
              <WaitingPayment
                labelInDelivery={"Perkiraan barang diterima"}
                //estimateShippingDate={order.estimateShippingDate}
                //receivedDate={order.receivedDate}
                tabsInDelivery={3}
                key={order.id}
                //endDatePay={order.endDatePay}
                indexes={order.order}
              // pay={order.payment}
              />
              <Pay
                tabsFinish={tabsFinish}
                tabsNotPay={tabsNotPay}
                tabsInDelivery={tabsInDelivery}
                tabsNotSent={tabsNotSent}
                showReceivedConfirm={showReceivedConfirm}
                id={order.id}
                invoiceNumber={order.invoiceNumber}
                order={order.order}
                orderProduct={productOrderInDelivery}
                showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.order, order.invoiceNumber, order.id)} />
            </Card>
          )
        })}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingDelivery;
