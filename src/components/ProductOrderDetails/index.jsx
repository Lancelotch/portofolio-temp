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
import TableProductOrder from "../TableProductOrder";

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
            <TableProductOrder
              informations={productSnapshot.informations}
              quantity={productSnapshot.quantity}
              ote={note}
            />
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


