import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
import variantItems from "../../library/variantItems";
import TableProductOrder from "../TableProductOrder";
// import currencyRupiah from "../../library/currency";


const ProductOrder = props => {
  const { orderItems } = props;

  return (
    <div className="product-order">
      {orderItems !== undefined | orderItems ?
        <Row key={"i"}>
          {orderItems.map((order, index) => {
            return (
              <Fragment key={index}>
                <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
                  <img
                    className="product-order__image"
                    src={order.productSnapshot.image.largeUrl}
                    alt=""
                  />
                </Col>
                <Col md={21}>
                  <div className="product-order__variant">
                  <h2> {order.productSnapshot.name}</h2>
                  <TableProductOrder 
                  informations={order.productSnapshot.informations} 
                  quantity={order.productSnapshot.quantity}
                  ote={order.note}
                  />
                  </div>
                </Col>
                {/*<Col md={5} style={{ marginTop: 60 }}>
                      <p className="productOrder__totalPrice">
                         {currencyRupiah(0.totalAmount)} x {0.productQuantity}
                           </p>
                      </Col>*/}
              </Fragment>
            )
          })}
        </Row>
        : ""}
    </div>
  );
};

export default ProductOrder;