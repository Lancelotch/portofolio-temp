import React from "react";
import { Row, Col } from "antd";
import "./style.sass";


const ProductOrder = props => {
  const
    { productImage,
      productName,
      variants,
      productQuantity,
      label,
      invoiceNumber,
      noInvoice
    } = props;
  return (
    <div className="productOrder">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <h2>{label}</h2>
        <label
          style={{
            fontSize: 20,
            color: "#777777"
          }}>
          {noInvoice} &nbsp;
        <font style={{ color: "#007E80" }}>
            {invoiceNumber}
          </font>
        </label>
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
          <p className="productOrder__quantity">Jumlah : {productQuantity}</p>
        </Col>
        <Col md={5} style={{ marginTop: 60 }}>
          <p className="productOrder__totalPrice" />
        </Col>
      </Row>
    </div>
  );
};

export default ProductOrder;
