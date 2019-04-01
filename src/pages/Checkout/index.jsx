import React, { Component } from "react";
import OrderDetailsContainer from "../../components/OrderDetails/OrderDetailsContainer";
import "./style.sass";
import { Row, Col } from "antd";
import OrderSummary from "../../components/OrderSummary/OrderSummaryContainer";
import strings from "../../localization/localization";

class CheckOut extends Component {
  render() {
    const { totalPrice, shipping } = this.props;
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
            <OrderDetailsContainer {...this.props} />
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
  }
}

export default CheckOut;
