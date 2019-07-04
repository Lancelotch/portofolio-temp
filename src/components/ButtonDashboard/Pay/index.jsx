import React from 'react'
import "../../ProductOrder/style.sass"
import { Button } from 'antd'
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"
import strings from '../../../localization/localization';

const Pay = (props) => {
  const { showDeleteConfirm,
    showHowToModalPayment,
    showOrderDetailsDashboard,
    tabsNotPay,
    tabsNotSent,
    tabsFinish,
    tabsInDelivery,
    order,
    orderProduct,
    index
  } = props

  // let id = ""
  // order.indexes.map(p => {
  //   id = p.productId
  //   return id
  // })
  return (
    <React.Fragment>
      {tabsNotPay === 1 && (
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
              onClick={() => showOrderDetailsDashboard(order)}
            >
              {strings.order_details}
            </Button>
          </div>
        </div>
      )}
      {tabsNotSent === 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button
            style={{ marginTop: 25 }}
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard(order.orderId)}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
      {tabsInDelivery === 3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button className="waitingPayment__payNow">
            Pesanan Diterima
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard(order.orderId)}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
      {tabsFinish === 4 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail}>Beli Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard(order.orderId)}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Pay