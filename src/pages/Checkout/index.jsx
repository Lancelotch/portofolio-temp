import React from "react";
import OrderDetailsContainer from "../../components/OrderDetails/OrderDetailsContainer";
import "./style.sass";
import { Row, Col } from "antd";
import OrderSummary from "../../components/OrderSummary/OrderSummaryContainer";
import strings from "../../localization/localization";
import Address from "../Address";

const CheckOut = props => {
  const {
    totalPrice,
    shipping,
    name,
    quantity,
    warna,
    ukuran,
    onChangeQuantity,
    onChangeShipping
  } = props;
  return (
    <div className="checkout">
      <div className="container">
        <Row>
          <Col md={5}>
            <a href="/">
              <img
                src={require("assets/img/monggopesen_logo.png")}
                className="header__logo"
                alt=""
              />
            </a>
          </Col>
          <Col md={15}>
            <p className="checkout__text">{strings.checkout}</p>
          </Col>
        </Row>
        <Row>
          <Col md={15}>
            <Address />
            <OrderDetailsContainer
              warna={warna}
              ukuran={ukuran}
              name={name}
              quantity={quantity}
              totalPrice={totalPrice}
              onChangeQuantity={onChangeQuantity}
              onChangeShipping={onChangeShipping}
              shipping={shipping}
            />
          </Col>
          <Col md={9}>
            <OrderSummary
              subTotal={totalPrice}
              viaRoutePrice={shipping.price}
              viaRoute={shipping.via}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckOut;
