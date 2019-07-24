import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
// import currencyRupiah from "../../library/currency";





const ProductOrder = props => {
  const { orderItems } = props;

  function variantItems  () {
    return (
      orderItems[0].productSnapshot.informations.reduce((acc, cur) => {
        let arr = acc
        arr.push(cur.value)
        if (cur.key === 'item') {
          arr.push(":")
        }
        return arr
      }, []).join(' ').split(':').filter(e => e !== '').join(', '))
  }


  return (
    <div className="productOrder">
      {orderItems !== undefined | orderItems && orderItems[0] ?
        <Row key={"i"}>
          <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
            <img
              className="productOrder__image"
              src={orderItems[0].productSnapshot.image.largeUrl}
              alt=""
            />
          </Col>
          <Col md={21}>
            <h2> {orderItems[0].productSnapshot.name} </h2>
            <p className="productOrder__variant" style={{ marginBottom: 10 }}>
              {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
             {variantItems()}
            </p>
            <p className="productOrder__quantity">
              {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {orderItems[0].productSnapshot.quantity}&nbsp;
              pcs
          </p>
          </Col>
          {/*<Col md={5} style={{ marginTop: 60 }}>
                      <p className="productOrder__totalPrice">
                         {currencyRupiah(0.totalAmount)} x {0.productQuantity}
                           </p>
                      </Col>*/}
        </Row>
        : ""}
    </div>
  );
};

export default ProductOrder;