import React from 'react'
import "../../ProductOrder/style.sass"
import { Button } from 'antd'
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"
import strings from '../../../localization/localization';

const Pay = (props) => {
  const { showDeleteConfirm,
    i,
    showHowToModalPayment,
    order,
    showOrderDetailsDashboard,
    tabsNotPay,
    tabsNotSent,
    tabsFinish,
    tabsInDelivery,
    orderProduct,
    productId
  } = props
  let id = ""
  productId.map(p => {
    id = p.productId
    return id
  })
  return (
    <React.Fragment>
      {tabsNotPay === 1 && (
        <React.Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <p
              className="waitingPayment__button"
              onClick={() => showDeleteConfirm(orderProduct, i)}
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
                onClick={() => showOrderDetailsDashboard(i)}
              >
                {strings.order_details}
              </Button>
            </div>
          </div>
        </React.Fragment>
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
            onClick={() => showOrderDetailsDashboard(i)}
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
            onClick={() => showOrderDetailsDashboard(i)}
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
            <Link to={pageUrlProductDetail + id}>Beli Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard(i)}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Pay