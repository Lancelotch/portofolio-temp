import React from 'react'
import "../ProductOrder/style.sass"
import { Button } from 'antd'
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url"
import strings from '../../localization/localization';

const ButtonDashboard = (props) => {
  const { showDeleteConfirm,
    showReceivedConfirm,
    showHowToModalPayment,
    showOrderDetailsDashboard,
    tabsShowItem,
    order,
    orderProduct,
    invoiceNumber,
    index,
    id,
    status
  } = props
console.log(status);

  let productId = ""
  order.orderItems.map(orders => {
    productId = orders.productSnapshot.productId
    return productId;
  })
  return (
    <React.Fragment>
      {tabsShowItem === 1 &&
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <p
            className="waiting-payment__button"
            onClick={() => showDeleteConfirm(orderProduct, index, order.id)}
          >
            {strings.cancel_order_dashboard}
          </p>
          <div>
            <Button
              className="waiting-payment__pay-now"
              onClick={showHowToModalPayment.bind(this, order)}
            >
              {strings.pay_now}
            </Button>
            <Button
              className="waiting-payment__detail-order"
              onClick={() => showOrderDetailsDashboard(order, invoiceNumber, id, index)}
            >
              {strings.order_details}
            </Button>
          </div>
        </div>}
      {tabsShowItem === 2 &&
        <div className="button-dashboard">
          <Button
            style={{ marginTop: 25 }}
            className="waiting-payment__detail-order"
            onClick={() => showOrderDetailsDashboard(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsShowItem === 3 &&
        <div className="button-dashboard">
          <Button size="large" disabled={status === "SHP" || status === "RCP" ? true : false} onClick={() => showReceivedConfirm(orderProduct, index, id)}
            className={status === "SHP" || status === "RCP" ? "default ": "waiting-payment__pay-now"}>
            Pesanan Diterima
          </Button>
          <Button
            className="waiting-payment__detail-order"
            onClick={() => showOrderDetailsDashboard(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsShowItem === 4 &&
        <div className="button-dashboard">
          <Button
            className="waiting-payment__pay-now"
          >
            <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
          </Button>
          <Button
            className="waiting-payment__detail-order"
            onClick={() => showOrderDetailsDashboard(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsShowItem === 5 &&
        <div className="button-dashboard">
          <Button
            className="waiting-payment__pay-now"
          >
            <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
          </Button>
          <Button
            className="waiting-payment__detail-order"
            onClick={() => showOrderDetailsDashboard(order, invoiceNumber, id, index)}>
            {strings.cancel_details}
          </Button>
        </div>}
    </React.Fragment>
  )
}

export default ButtonDashboard;