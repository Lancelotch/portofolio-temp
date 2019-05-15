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
    orderProduct
  } = props
  return (
    <div style={{ backgroundColor: "#FFFFFF", paddingBottom: 20 }}>
      {tabsNotPay === 1 && (
        <React.Fragment>
          <Button
            className="waitingPayment__button"
            onClick={() => showDeleteConfirm(orderProduct, i)}
          >
            {strings.cancel_order}
          </Button>
          <div
            style={{
              float: "right",
              marginRight: 15
            }}>
            <Button
              className="waitingPayment__payNow"
              onClick={() => showHowToModalPayment(order)}
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
        </React.Fragment>
      )}
      {tabsNotSent === 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button
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
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button className="waitingPayment__payNow">
            Pesanan Detirma
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard()}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
      {tabsFinish === 4 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail + "productDetailId"}>Beli Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard()}
          >
            {strings.order_details}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Pay