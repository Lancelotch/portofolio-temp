import React from 'react'
import "../ProductOrder/style.sass"
import { Button } from 'antd'
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../library/url"
import strings from '../../localization/localization';
import { buttonDisabledandEnabledDelivery } from '../../library/buttonDisabledAndEnabled';

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
              className="waiting-payment__pay-now"
              onClick={showHowToModalPayment.bind(this, order)}
            >
              {strings.pay_now}
            </Button>
            <Button
              className="waiting-payment__detail-order"
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
          }
          {((tabsShowItem === "isShowOrderDetailsDashboardFinish") ||
            (tabsShowItem === "isShowOrderDetailsDashboardCancel")) &&
            <Button
              className="waiting-payment__pay-now">
              <Link to={pageUrlProductDetail + productId}>Pesen Lagi</Link>
            </Button>}
          <Button
            className="waiting-payment__detail-order"
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