import React from "react";
import "../ProductOrder/style.sass";
import { Row, Col, Card } from "antd";
import { pageUrlViewInvoiceDashboard, pageUrlProductDetail } from "../../library/url";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";
import { Button } from "antd";
import variantItems from "../../library/variantItems";

const ProductOrderDetails = props => {
  const
    {
      productOrderInDelivery,
      actionReceivedConfirm,
      productSnapshot,
      label,
      invoiceNumber,
      noInvoice,
      tabsShow,
      id,
      note,
      keyIndex
    } = props;
  return (
    <Card>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <h2>{label}</h2>
        {((tabsShow === "showTabsNotSent") || (tabsShow === "showTabsInDelivery") || (tabsShow === "showTabsFinish")) &&
          <label
            style={{
              fontSize: 20,
              color: "#777777"
            }}>
            <Link
              style={{ cursor: "pointer", color: "#FB6900" }}
              to={pageUrlViewInvoiceDashboard + id}
              target="_blank"> Lihat
            </Link> |
            {noInvoice} &nbsp;
        <font style={{ color: "#000000" }}>
              {invoiceNumber}
            </font> &nbsp;
          </label>}
      </div>
      <hr className="productOrder__inline" />
      <Row style={{ marginTop: 25 }}>
        <Col md={2}>
          <Link
            style={{ cursor: "pointer" }}
            to={pageUrlProductDetail + productSnapshot.productId}>
            <img
              className="productOrder__image"
              src={productSnapshot.image.defaultImage}
              alt=""
            />
          </Link>
        </Col>
        <Col md={17}>
          <Link
            className="default"
            style={{ cursor: "pointer" }}
            to={pageUrlProductDetail + productSnapshot.productId}>
            <h2 style={{ marginBottom: 0 }}> {productSnapshot.name} </h2>
          </Link>
          <p className="productOrder__variant" style={{ marginBottom: 10 }}>
            {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
           {variantItems(productSnapshot.informations)}
          </p>
          <p className="productOrder__variant">{strings.note}&nbsp;&nbsp;:&nbsp;
            {note && note.charAt(0).toUpperCase() + note.substring(1)}</p>
          <p className="productOrder__quantity">
            {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{productSnapshot.quantity} pcs
        </p>
        </Col>
        <Col md={5}>
          {tabsShow === "showTabsFinish" &&
            <Button onClick={() => actionReceivedConfirm(productOrderInDelivery, keyIndex, id)}
              className="waitingPayment__payNow">
              Pesanan Diterima
        </Button>}
          {tabsShow === "showTabsCancel" &&
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 15
            }}>
              <Button
                className="waitingPayment__payNow"
              >
                <Link to={pageUrlProductDetail + productSnapshot.productId}>Pesen Lagi</Link>
              </Button>
            </div>
          }
        </Col>
      </Row>
    </Card >
  )
}

export default ProductOrderDetails;
