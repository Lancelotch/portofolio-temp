import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import CurrencyRp from "../Typography/CurrencyRp";
import strings from "../../config/localization";
import PropTypes from "prop-types";
import Skeleton from "components/Skeleton/Skeleton";
import SkeletonImg from "components/Skeleton/SkeletonImg";
import CartVariants from "../Variant/CartVariants";
import CourierDelivery from "../Courier/CourierDelivery";

export default class CheckoutProduct extends Component {
  onChangeCourier = serviceCode => {
    const cartProduct = this.props.cartProduct;
    const courier = this.props.cartProduct.couriers.find(
      courier => courier.serviceCode === serviceCode
    );
    cartProduct.courier = courier;
    this.props.onChangeProduct(cartProduct);
  };

  render() {
    const cartProduct = this.props.cartProduct;
    return (
      <Card>
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Row>
            <Col md={24}>
              <Row>
                <Col md={4} xs={2}>
                  {!cartProduct.productName ? (
                    <SkeletonImg heightSkeleton="95px" />
                  ) : (
                    <img
                      src={cartProduct.productPic}
                      alt=""
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </Col>
                <Col md={20} xs={7}>
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <p style={{ paddingLeft: "1rem" }}>
                      {cartProduct.productName.trim()}
                    </p>
                  )}
                  <p style={{ paddingLeft: "1rem" }}>
                    {!cartProduct.productName ? (
                      <Skeleton />
                    ) : (
                      <CurrencyRp price={cartProduct.price} />
                    )}
                  </p>
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <p
                      style={{
                        lineHeight: "30px",
                        paddingLeft: "1rem"
                      }}
                    >
                      {strings.total}
                      <b style={{ fontWeight: "300", paddingLeft: "1rem" }}>
                        {cartProduct.quantity}
                      </b>
                    </p>
                  )}
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <div style={{ paddingLeft: "1rem" }}>
                      <CartVariants variants={cartProduct.variants} />
                    </div>
                  )}
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <Row>
                      <Col md={12}>
                        <p style={{ paddingLeft: "1rem" }}>{strings.note}</p>
                      </Col>
                      <Col md={12}>
                        <p>{cartProduct.note}</p>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={10} xs={3}>
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <CourierDelivery
                      couriers={[cartProduct.couriers]}
                      onChangeCourier={this.onChangeCourier}
                    />
                  )}
                </Col>
                <Col md={24}>
                  <hr />
                  {!cartProduct.productName ? (
                    ""
                  ) : (
                    <React.Fragment>
                      <CurrencyRp
                        price={cartProduct.price * cartProduct.quantity}
                      />
                      <p>
                        {strings.price} ({cartProduct.quantity} {strings.pcs} x{" "}
                        {cartProduct.price})
                      </p>
                    </React.Fragment>
                  )}
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <CurrencyRp price={cartProduct.courier.cost} />
                  )}
                  <p>{strings.price_courier}</p>
                  <hr />
                </Col>
                <Col md={6} xs={6}>
                  <b>{strings.sub_total}</b>
                </Col>
                <Col md={6}>
                  {!cartProduct.productName ? (
                    <Skeleton />
                  ) : (
                    <CurrencyRp
                      price={
                        cartProduct.courier.cost +
                        cartProduct.price * cartProduct.quantity
                      }
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

CheckoutProduct.propTypes = {
  product: PropTypes.object
};
