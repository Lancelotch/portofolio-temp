import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const { variants,productImage, productName, productQuantity, totalAmount } = props;
  return (
    <div className="productOrder">
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
            Varian : {variants[0].name.charAt(0).toUpperCase() +
              variants[0].name.substring(1)} : {variants[0].value},&nbsp;
              { variants[1].name.charAt(0).toUpperCase() +
              variants[1].name.substring(1)} : {variants[1].value }
          </p>
          <p className="productOrder__quantity">Jumlah : {productQuantity}</p>
        </Col>
        <Col md={5} style={{ marginTop: 60 }}>
          <p className="productOrder__totalPrice">
            {currencyRupiah(totalAmount)}
          </p>
        </Col>
      </Row>
      <hr className="productOrder__inline" />
    </div>
  );
};

export default ProductOrder;
