import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
import variantItems from "../../library/variantItems";
// import currencyRupiah from "../../library/currency";


const ProductOrder = props => {
  const { orderItems } = props;

  return (
    <div className="productOrder">
      {orderItems !== undefined | orderItems ?
        <Row key={"i"}>
          {orderItems.map(order => {
            return (
              <Fragment>
                <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
                  <img
                    className="productOrder__image"
                    src={order.productSnapshot.image.largeUrl}
                    alt=""
                  />
                </Col>
                <Col md={21}>
                  <h2> {order.productSnapshot.name} </h2>
                  <p className="productOrder__variant" style={{ marginBottom: 10 }}>
                    {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                        {variantItems(order.productSnapshot.informations)}<br />
                    {strings.note}&nbsp;&nbsp;:&nbsp;
             {order.note}
                  </p>
                  <p className="productOrder__quantity">
                    {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {order.productSnapshot.quantity}&nbsp;
               {strings.pcs}
                  </p>
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