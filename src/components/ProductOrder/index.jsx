import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
// import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const { indexes } = props;
  return (
    <div className="productOrder">
    {indexes !== undefined | indexes && indexes[0] ?
      <Row key={"i"}>
        <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
          <img
            className="productOrder__image"
            src={indexes[0].productSnapshot.image.largeUrl}
            alt=""
          />
        </Col>
        <Col md={21}>
          <h2> {indexes[0].productSnapshot.name} </h2>
          <p className="productOrder__variant" style={{ marginBottom: 10 }}>
            {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {indexes[0].productSnapshot.variants}
          </p>
          <p className="productOrder__quantity">
            {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {indexes[0].productSnapshot.quantity} pcs
          </p>
        </Col>
        {/*<Col md={5} style={{ marginTop: 60 }}>
                      <p className="productOrder__totalPrice">
                         {currencyRupiah(index.totalAmount)} x {index.productQuantity}
                           </p>
                      </Col>*/}
      </Row>
               : ""     }
    </div>
  );
};

export default ProductOrder;