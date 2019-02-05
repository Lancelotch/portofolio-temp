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
  constructor(props) {
    super(props);
    this.state = {
      cartId: this.props.cartId,
      productId: this.props.productId,
      variants: this.props.variant,
      quantity: this.props.quantity,
      note: this.props.note,
      productName: this.props.productName,
      productPic: this.props.productPic,
      price: this.props.price,
      couriers: this.props.couriers,
      courier: { cost: 0 }
    };
  }

  onChangeCourier = serviceCode => {
    const courier = this.state.couriers.find(
      courier => courier.serviceCode === serviceCode
    );
    this.setState(
      {
        courier: courier
      },
      () => {
        this.props.onChangeCourier(this.state);
      }
    );
  };

  render() {
    return (
      <Card>
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Row>
            <Col md={24}>
              <Row>
                <Col md={4} xs={2}>
                  {!this.state.productName ? (
                    <SkeletonImg heightSkeleton="95px" />
                  ) : (
                    <img
                      src={this.state.productPic}
                      alt=""
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </Col>
                <Col md={20} xs={7}>
                  {!this.state.productName ? (
                    <Skeleton />
                  ) : (
                    <p style={{ paddingLeft: "1rem" }}>
                      {this.state.productName.trim()}
                    </p>
                  )}
                  <p style={{ paddingLeft: "1rem" }}>
                    {!this.state.productName ? (
                      <Skeleton />
                    ) : (
                      <CurrencyRp price={this.state.price} />
                    )}
                  </p>
                  {!this.state.productName ? (
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
                        {this.state.quantity}
                      </b>
                    </p>
                  )}
                  {!this.state.productName ? (
                    <Skeleton />
                  ) : (
                    <p style={{ paddingLeft: "1rem" }}>
                      <CartVariants variants={this.state.variants} />
                    </p>
                  )}
                  {!this.state.productName ? (
                    <Skeleton />
                  ) : (
                    <Row>
                      <Col md={12}>
                        <p style={{ paddingLeft: "1rem" }}>{strings.note}</p>
                      </Col>
                      <Col md={12}>
                        <p>{this.state.note}</p>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={10} xs={3}>
                  {/* {(!this.state.productName) ?
                      <Skeleton />
                      :
                      <CourierDelivery
                        couriers={[this.state.couriers]}
                        onChangeCourier={this.onChangeCourier}
                      />
                    } */}
                </Col>
                <Col md={24}>
                  <hr />
                  {!this.state.productName ? (
                    ""
                  ) : (
                    <div>
                      <p className="priceCourierDelivery">
                        <CurrencyRp
                          price={this.state.price * this.state.quantity}
                        />
                      </p>
                      <p className="ongkosKirim">
                        <p>
                          {strings.price} ({this.state.quantity} {strings.pcs} x{" "}
                          {this.state.price})
                        </p>
                      </p>
                    </div>
                  )}
                  <p className="priceCourierDelivery">
                    {!this.state.productName ? (
                      <Skeleton />
                    ) : (
                      <CurrencyRp price={this.state.courier.cost} />
                    )}
                  </p>
                  <p className="ongkosKirim">{strings.price_courier}</p>
                  <hr />
                </Col>
                <Col md={6} xs={6}>
                  <b className="totalPriceCheckout">{strings.sub_total}</b>
                </Col>
                <Col md={6} className="priceCheckout">
                  {!this.state.productName ? (
                    <Skeleton />
                  ) : (
                    <CurrencyRp
                      price={
                        this.state.courier.cost +
                        this.state.price * this.state.quantity
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
