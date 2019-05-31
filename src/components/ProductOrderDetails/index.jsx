import React from "react";
import "../ProductOrder/style.sass";
import { Row, Col, Card } from "antd";
import { pageUrlViewInvoiceDashboard } from "../../library/url";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";

const ProductOrderDetails = props => {
  const
    { productImage,
      productName,
      variants,
      productQuantity,
      label,
      invoiceNumber,
      noInvoice,
      tabsInDelivery,
      tabsNotSent,
      tabsFinish,
      orderId,
      note
    } = props;
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <h2>{label}</h2>
        {((tabsNotSent === 2) || (tabsInDelivery === 3) || (tabsFinish === 4)) &&
          <label
            style={{
              fontSize: 20,
              color: "#777777"
            }}>
            <Link
              style={{ cursor: "pointer", color: "#FB6900" }}
              to={pageUrlViewInvoiceDashboard + orderId}
              target="_blank"> Lihat
            </Link> |
            {noInvoice} &nbsp;
        <font style={{ color: "#000000" }}>
              {invoiceNumber}
            </font> &nbsp;
          </label>
        }
      </div>
      <hr className="productOrder__inline" />
      <Row style={{ marginTop: 25 }}>
        <Col md={2}>
          <img
            className="productOrder__image"
            src={productImage}
            alt=""
          />
        </Col>
        <Col md={17}>
          <h2 style={{ marginBottom: 0 }}> {productName} </h2>
          <p className="productOrder__variant" style={{ marginBottom: 10 }}>
            {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
           {variants[0].name.charAt(0).toUpperCase() +
              variants[0].name.substring(1)}&nbsp;
            {variants[0].value},&nbsp;
           {variants[1].name.charAt(0).toUpperCase() +
              variants[1].name.substring(1)}
            {variants[1].value}
          </p>
          {note &&
            <p className="productOrder__variant">{strings.note}&nbsp;&nbsp;:&nbsp;
        {note.charAt(0).toUpperCase() + note.substring(1)}</p>
          }
          <p className="productOrder__quantity">
            {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{productQuantity} pcs
        </p>
        </Col>
        <Col md={5} style={{ marginTop: 60 }} />
      </Row>
    </Card >
  );
};

export default ProductOrderDetails;
