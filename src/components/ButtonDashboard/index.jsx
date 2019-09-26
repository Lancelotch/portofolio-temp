import React from 'react'
import "../ProductOrder/style.sass"
import { Link } from "react-router-dom";
import strings from '../../localization/localization';
import { buttonDisabledandEnabledDelivery } from '../../library/buttonDisabledAndEnabled';
import Button from "../Button"
import PATH_URL from "../../routers/path";

export default function ButtonDashboard(props) {
  const { 
    showDeleteConfirm,
    showReceivedConfirm,
    showHowToModalPayment,
    showOrderDetailsDashboard,
    tabsShowItem,
    order,
    orderProduct,
    index,
    productId,
    status,
    showOrderInvoiceReview
  } = props

  return (
    <React.Fragment>
      {tabsShowItem === "isShowOrderDetailsDashboardNotPay" ?
        <div className="waiting-payment__not-pay">
          <p className="waiting-payment__button"
            onClick={() => showDeleteConfirm(orderProduct, index, order.id)}>
            {strings.cancel_order_dashboard}
          </p>
          <div>
            <Button
              type="primary"
              marginright="small"
              size="large"
              onClick={showHowToModalPayment.bind(this, order)}
            >
              {strings.pay_now}
            </Button>
            <Button
              type="secondary"
              size="large"
              onClick={showOrderDetailsDashboard}
            >
              {strings.order_details}
            </Button>
          </div>
        </div> :
        <div className="button-dashboard">
          {tabsShowItem === "isShowOrderDetailsDashboardInDelivery" &&
            buttonDisabledandEnabledDelivery(status, showReceivedConfirm,
              orderProduct, index, productId)}
          {tabsShowItem === "isShowOrderDetailsDashboardCancel" &&
            <Link to={`${PATH_URL.PRODUCTS}/${productId} ` || "#"}>
              <Button
                type="primary"
                marginright="small"
                size="large">
                {strings.buy_again}
              </Button>
            </Link>}
          {tabsShowItem === "isShowOrderDetailsDashboardFinish" &&
            <Button
              type="secondary"
              size="large"
              marginright="small"
              onClick={showOrderInvoiceReview}>
              Lihat Ulasan
            </Button>}
          <Button
            type="secondary"
            size="large"
            onClick={showOrderDetailsDashboard}>
            {tabsShowItem === "isShowOrderDetailsDashboardCancel" ?
              strings.cancel_details :  strings.order_details}
          </Button>
        </div>}
    </React.Fragment>
  )
}
