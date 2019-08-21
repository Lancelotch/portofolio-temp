import React from "react";
import "../ProductOrder/style.sass";
import { Row, Col, Card } from "antd";
import { pageUrlViewInvoiceDashboard, pageUrlProductDetail } from "../../library/url";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";
import variantItems from "../../library/variantItems";
import "../ProductOrder/style.sass";
import { buttonDisabledandEnabledDelivery } from "../../library/buttonDisabledAndEnabled";
import Button from "../Button";

const ProductOrderDetails = props => {
  const
    {
      productOrderRespon,
      actionReceivedConfirm,
      productSnapshot,
      label,
      invoiceNumber,
      noInvoice,
      tabsShow,
      id,
      note,
      keyIndex,
      showHowToModalPayment,
      status
    } = props;
  return (
    <Card>
      <div className="head-label-item">
        <h2>{label}</h2>
        {((tabsShow === "isShowOrderDetailsDashboardNotSent") ||
          (tabsShow === "isShowOrderDetailsInDelivery") ||
          (tabsShow === "isShowOrderDetailsDashboardFinish")) &&
          <label>
            <Link
              to={pageUrlViewInvoiceDashboard + id}
              target="_blank"> Lihat
            </Link> |
            {noInvoice} &nbsp;
            <h4>
              {invoiceNumber}
            </h4> &nbsp;
          </label>}
      </div>
      <hr className="product-order__inline" />
      <Row style={{ marginTop: 25 }}>
        <Col md={2}>
          <Link
            style={{ cursor: "pointer" }}
            to={pageUrlProductDetail + productSnapshot.productId}>
            <img
              className="product-order__image"
              src={productSnapshot.image.defaultImage}
              alt=""
            />
          </Link>
        </Col>
        <Col md={17}>
          <div className="product-order__variant">
            <Link
              className="default"
              style={{ cursor: "pointer" }}
              to={pageUrlProductDetail + productSnapshot.productId}>
              <h2> {productSnapshot.name} </h2>
            </Link>
            <table>
              <tbody>
                <tr>
                  <td style={{ width: 70 }}>
                    <p>
                      {strings.varian}
                    </p>
                  </td>
                  <td style={{ width: 20 }}>
                    <p>
                      :
              </p>
                  </td>
                  <td>
                    <p>
                      {variantItems(productSnapshot.informations)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: 70, verticalAlign: "unset" }}>
                    <p>
                      {strings.note}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "unset", width: 20 }}>
                    <p>
                      :
               </p>
                  </td>
                  <td>
                    <p>
                      {note && note.charAt(0).toUpperCase() + note.substring(1)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: 70 }}>
                    <p className="product-order__quantity">
                      {strings.total}
                    </p>
                  </td>
                  <td style={{ width: 20 }}>
                    <p>
                      :
              </p>
                  </td>
                  <td>
                    <p className="product-order__quantity">
                      {productSnapshot.quantity}&nbsp;{strings.pcs}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={5} style={{ marginTop: 30 }}>
          {tabsShow === "isShowOrderDetailsDashboardInDelivery" &&
            buttonDisabledandEnabledDelivery(status, actionReceivedConfirm,
              productOrderRespon, keyIndex, id)}
          {tabsShow === "isShowOrderDetailsDashboardNotPay" &&
            <Button
              type="primary"
              size="large"
              onClick={() => showHowToModalPayment(productOrderRespon)}
            >
              {strings.pay_now}
            </Button>}
          {((tabsShow === "isShowOrderDetailsDashboardCancel") ||
            (tabsShow === "isShowOrderDetailsDashboardFinish")) &&
            <div className="waiting-payment-cancel">
              <Button
                type="primary"
                size="large"
              >
                <Link to={pageUrlProductDetail + productSnapshot.productId}>Pesen Lagi</Link>
              </Button>
            </div>
          }
        </Col>
      </Row>
    </Card>
  )
}

export default ProductOrderDetails;


