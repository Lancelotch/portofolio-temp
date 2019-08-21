import React from 'react'
import "../ProductOrder/style.sass"
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url"
import strings from '../../localization/localization';
import { buttonDisabledandEnabledDelivery } from '../../library/buttonDisabledAndEnabled';
import Button from "../Button"

const ButtonDashboard = (props) => {
  const { showDeleteConfirm,
    showReceivedConfirm,
    showHowToModalPayment,
    showOrderDetailsDashboard,
    tabsShowItem,
    order,
    orderProduct,
    index,
    id,
    status
  } = props
  let productId = ""
  order.orderItems.map(orders => {
    productId = orders.productSnapshot.productId
    return productId;
  })
  return (
    <React.Fragment>
      {tabsShowItem === "isShowOrderDetailsDashboardNotPay" &&
        <div className="waiting-payment__not-pay">
          <p
            className="waiting-payment__button"
            onClick={() => showDeleteConfirm(orderProduct, index, order.id)}
          >
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
        </div>}
      {((tabsShowItem === "isShowOrderDetailsDashboardFinish") ||
        (tabsShowItem === "isShowOrderDetailsDashboardCancel") ||
        (tabsShowItem === "isShowOrderDetailsDashboardInDelivery") ||
        (tabsShowItem === "isShowOrderDetailsDashboardNotSent")
      ) &&
        <div className="button-dashboard">
          {tabsShowItem === "isShowOrderDetailsDashboardInDelivery" &&
            buttonDisabledandEnabledDelivery(status, showReceivedConfirm,
              orderProduct, index, id)}
          {((tabsShowItem === "isShowOrderDetailsDashboardFinish") ||
            (tabsShowItem === "isShowOrderDetailsDashboardCancel")) &&
            <Button
              type="primary"
              r="small"
              size="large">
              <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
            </Button>}
          <Button
          type="secondary"
          size="large"
            onClick={showOrderDetailsDashboard}
          >
            {((tabsShowItem === "isShowOrderDetailsDashboardFinish") ||
              (tabsShowItem === "isShowOrderDetailsDashboardInDelivery") ||
              (tabsShowItem === "isShowOrderDetailsDashboardNotSent")) &&
              strings.order_details
            }
            {(tabsShowItem === "isShowOrderDetailsDashboardCancel") &&
              strings.cancel_details
            }
          </Button>
        </div>}
    </React.Fragment>
  )
}

export default ButtonDashboard;