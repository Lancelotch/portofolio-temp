import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
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
      orderId
    } = props;
  return (
    <div className="productOrder">
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
              style={{ cursor: "pointer" }}
              to={pageUrlViewInvoiceDashboard + orderId}
              target="_blank">Lihat
       </Link> |
            {noInvoice} &nbsp;
        <font style={{ color: "#007E80" }}>
              {invoiceNumber}
            </font> &nbsp;
          </label>
        }
      </div>
      <hr className="productOrder__inline" />
      <Row>
        <Col md={2}>
          <img
            className="productOrder__image"
            src={productImage}
            alt=""
          />
        </Col>
        <Col md={17}>
          <h2>{productName}</h2>
          <p className="productOrder__variant">
            Varian :
             {variants[0].name.charAt(0).toUpperCase() +
              variants[0].name.substring(1)} : {variants[0].value},
       &nbsp;
             {variants[1].name.charAt(0).toUpperCase() +
              variants[1].name.substring(1)} : {variants[1].value}
          </p>
          <p className="productOrder__quantity">{strings.total} : {productQuantity}</p>
        </Col>
        <Col md={5} style={{ marginTop: 60 }} />
      </Row>
    </div>
  );
};

export default ProductOrderDetails;
