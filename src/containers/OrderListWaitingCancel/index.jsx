import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import Cancel from "../../components/ButtonDashboard/Cancel";
import { Card } from "antd";
import WaitingPayment from "../../components/WaitingPayment";

class OrderListingCancel extends Component {
  render() {
    const { actionShowOrderDetailsDashboard,productOrderCancel } = this.props;
    return (
            <React.Fragment>
              {productOrderCancel.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder key={order.id} indexes={order.indexes} />
                    <hr className="productOrder__inline" />
                    <WaitingPayment
                      labelCancel={"Pesenan dibatalkan oleh"}
                      estimateShippingDate={order.estimateShippingDate}
                      cancelDate={order.cancelDate}
                      cancelBy={order.cancelBy}
                      tabsCancel={5}
                      key={order.id}
                      indexes={order.indexes}
                      pay={order.payment}
                    />
                    <Cancel
                      i={order.orderId}
                      productDetail={order.indexes}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                );
              })}
            </React.Fragment>
    );
  }
}

export default OrderListingCancel;
