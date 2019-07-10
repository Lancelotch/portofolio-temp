import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import { Card } from "antd";
import WaitingPayment from "../../components/WaitingPayment";


class OrderListWaitingFinsih extends Component {
  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent, productOrderFinish } = this.props;
    return (
            <React.Fragment>
              {productOrderFinish.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <hr className="productOrder__inline" />
                    <WaitingPayment
                      labelFinish={"Pesenan Diterima"}
                      estimateShippingDate={order.estimateShippingDate}
                      receivedDate={order.receivedDate}
                      tabsFinish={4}
                      key={order.id}
                      endDatePay={order.endDatePay}
                      indexes={order.indexes}
                      pay={order.payment}
                    />
                    <Pay
                      tabsFinish={tabsFinish}
                      tabsNotPay={tabsNotPay}
                      tabsInDelivery={tabsInDelivery}
                      tabsNotSent={tabsNotSent}
                      orderProduct={productOrderFinish}
                      order={order}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                )
              })}
            </React.Fragment>
    );
  }
}

export default OrderListWaitingFinsih;
