import React, { Component } from "react";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import "../../components/ProductOrder/style.sass";



class OrderListWaitingPayment extends Component {
  render() {
    const {
      orderProduct,
      showDeleteConfirm,
      tabsCancel,
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      labelTabDetails,
      tabsNotSent } = this.props;
    return (
      <React.Fragment>
        {orderProduct &&
          <React.Fragment>
            {orderProduct.map((order, i) => {
              return (
                <div style={{ marginTop: 10 }} key={i}>
                  <OrderDetailsDashboard
                    //actionShowOrderDetailsDashboard={actionShowOrderDetailsDashboard}
                    //actionShowOrderListWaitingPayment={actionShowOrderListWaitingPayment}
                    //={isShowOrderDetailsDashboard}
                    labelTabDetails={labelTabDetails}
                    showDeleteConfirm={showDeleteConfirm}
                    orderId={order.orderId}
                    order={order}
                    tabsNotPay={tabsNotPay}
                    tabsInDelivery={tabsInDelivery}
                    tabsNotSent={tabsNotSent}
                    tabsFinish={tabsFinish}
                    tabsCancel={tabsCancel}
                    orderProduct={orderProduct} />
                </div>
              )
            })}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
