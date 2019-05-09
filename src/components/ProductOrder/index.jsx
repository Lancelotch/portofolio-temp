import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
// import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const { indexes } = props;
  return (
    <div className="productOrder">
      <Row>
        <Col md={2}>
          <img
            className="productOrder__image"
            src={indexes[0].productImage}
            alt=""
          />
        </Col>
        <Col md={17}>
          <h2> {indexes[0].productName} </h2>
          <p className="productOrder__variant">
            Varian : {indexes[0].variants[0].name.charAt(0).toUpperCase() +
              indexes[0].variants[0].name.substring(1)} : {indexes[0].variants[0].value},&nbsp;
             {indexes[0].variants[1].name.charAt(0).toUpperCase() +
              indexes[0].variants[1].name.substring(1)} : {indexes[0].variants[1].value}
          </p>
          <p className="productOrder__quantity">
            Jumlah : {indexes[0].productQuantity}
          </p>
        </Col>
        <Col md={5} style={{ marginTop: 60 }}>
          {/*<p className="productOrder__totalPrice">
           {currencyRupiah(indexes[0].totalAmount)} x {indexes[0].productQuantity}
             </p>*/}
        </Col>
      </Row>
      <hr className="productOrder__inline" />
    </div>
  );
};

export default ProductOrder;
