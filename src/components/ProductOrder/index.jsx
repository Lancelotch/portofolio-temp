import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
// import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const { indexes } = props;
  return (
    <div className="productOrder">
      <Row>
        <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
          <img
            className="productOrder__image"
            src={indexes[0].productImage}
            alt=""
          />
        </Col>
        <Col md={21}>
          <h2> {indexes[0].productName} </h2>
          <p className="productOrder__variant" style={{ marginBottom: 10 }}>
            {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
             {indexes[0].variants[0].name.charAt(0).toUpperCase() +
              indexes[0].variants[0].name.substring(1)}&nbsp;
             {indexes[0].variants[0].value},&nbsp;
             {indexes[0].variants[1].name.charAt(0).toUpperCase() +
              indexes[0].variants[1].name.substring(1)}
            {indexes[0].variants[1].value}
          </p>
          {indexes[0].note &&
            <p className="productOrder__variant">{strings.note}&nbsp;&nbsp;:&nbsp;
          {indexes[0].note.charAt(0).toUpperCase() + indexes[0].note.substring(1)}</p>
          }
          <p className="productOrder__quantity">
            {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{indexes[0].productQuantity} pcs
          </p>
        </Col>
        {/*<Col md={5} style={{ marginTop: 60 }}>
        <p className="productOrder__totalPrice">
           {currencyRupiah(indexes[0].totalAmount)} x {indexes[0].productQuantity}
             </p>
        </Col>*/}
      </Row>
    </div>
  );
};

export default ProductOrder;
