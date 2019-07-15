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
    showOrderDetailsDashboardNotPay,
    showOrderDetailsDashboardNotSent,
    showOrderDetailsDashboardInDelivery,
    showOrderDetailsDashboardFinish,
    showOrderDetailsDashboardCancel,
    tabsNotPay,
    tabsNotSent,
    tabsFinish,
    tabsInDelivery,
    tabsCancel,
    order,
    orderProduct,
    invoiceNumber,
    index,
    id
  } = props

  let productId = ""
  order.orderItems.map(orders => {
    productId = orders.productSnapshot.productId
    return productId;
  })
  return (
    <React.Fragment>
      {tabsNotPay === 1 &&
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <p
            className="waitingPayment__button"
            onClick={() => showDeleteConfirm(orderProduct, index, order.id)}
          >
            {strings.cancel_order_dashboard}
          </p>
          <div>
            <Button
              className="waitingPayment__payNow"
              onClick={showHowToModalPayment.bind(this, order)}
            >
              {strings.pay_now}
            </Button>
            <Button
              className="waitingPayment__detailPesanan"
              onClick={() => showOrderDetailsDashboardNotPay(order, invoiceNumber, id, index)}
            >
              {strings.order_details}
            </Button>
          </div>
        </div>}
      {tabsNotSent === 2 &&
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button
            style={{ marginTop: 25 }}
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboardNotSent(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsInDelivery === 3 &&
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button onClick={() => showReceivedConfirm(orderProduct, index, order.id)}
            className="waitingPayment__payNow">
            Pesanan Diterima
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboardInDelivery(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsFinish === 4 &&
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboardFinish(order, invoiceNumber, id, index)}
          >
            {strings.order_details}
          </Button>
        </div>}
      {tabsCancel === 5 &&
        <div
          style={{
            display: "flex", justifyContent: "flex-end"
          }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboardCancel(order, invoiceNumber, id, index)}>
            {strings.cancel_details}
          </Button>
        </div>}
    </React.Fragment>
  )
}

export default ButtonDashboard;