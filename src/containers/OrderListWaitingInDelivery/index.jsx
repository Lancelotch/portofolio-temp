import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import { Card} from "antd";
import WaitingPayment from "../../components/WaitingPayment";


class OrderListWaitingFinish extends Component {
  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent, productOrderInDelivery } = this.props;
    return (
            <React.Fragment>
              {productOrderInDelivery.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <hr className="productOrder__inline" />
                    <WaitingPayment
                      labelInDelivery={"Perkiraan barang diterima"}
                      estimateShippingDate={order.estimateShippingDate}
                      receivedDate={order.receivedDate}
                      tabsInDelivery={3}
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
                      // showDeleteConfirm={this.showDeleteConfirm}
                      orderProduct={productOrderInDelivery}
                      i={order.orderId}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                )
              })}
            </React.Fragment>
    );
  }
}

export default OrderListWaitingFinish;
