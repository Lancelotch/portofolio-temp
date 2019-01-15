import React, { Component } from "react";
import ButtonQuantity from "../ButtonQuantity/ButtonQuantity";
import PropTypes from "prop-types";
import CurrencyRp from "../Typography/CurrencyRp";
import CartVariants from "../Variant/CartVariants";
import Skeleton from "components/Skeleton/Skeleton";
import SkeletonImg from "components/Skeleton/SkeletonImg";
import strings from "../../config/localization";
import { Card, Input, Col, Row } from "antd";

export default class CartProduct extends Component {
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
      price: this.props.price
    };
  }

  onChangeNote = event => {
    this.setState(
      {
        note: event.target.value
      },
      () => {
        this.props.onChangeProduct(this.state);
      }
    );
  };

  onChangeQuantity = (quantity, operator) => {
    this.setState(
      {
        quantity: quantity
      },
      () => {
        this.props.onChangeProduct(this.state);
      }
    );
  };

  render() {
    return (
      <Card>
        <div className="container-fluid">
        <Row>
          <Col md={24} xs={24}>
            <Row>
              <Col md xs={24} className="close-button-cart">
                {!this.state.productName ? (
                  ""
                ) : (
                  <p onClick={this.props.onDelete}>{strings.action_delete}</p>
                )}
              </Col>
              <Col md md={2} xs={2} style={{ marginLeft: "10px" }}>
                {!this.state.productPic ? (
                  <SkeletonImg heightSkeleton="95px" />
                ) : (
                  <img
                    src={this.state.productPic}
                    alt=""
                    className="img-responsive"
                  />
                )}
              </Col>
              <Col md
                md={8}
                xs={7}
                className="button-cart cart-product-price"
              >
                <p className="label-cart-product">
                  {this.state.productName.trim() || <Skeleton />}
                </p>
                <span className="priceCheckoutItem">
                  {!this.state.price ? (
                    <p>
                      <Skeleton />
                    </p>
                  ) : (
                    <CurrencyRp price={this.state.price} />
                  )}
                </span>
                {this.state.variants.length < 1 && !this.state.price ? (
                  <Skeleton />
                ) : (
                  <CartVariants variants={this.state.variants} />
                )}
                {!this.state.quantity ? (
                  <p>
                    <Skeleton />
                  </p>
                ) : (
                  <ButtonQuantity
                    quantity={this.state.quantity}
                    onChange={this.onChangeQuantity}
                  />
                )}
                {!this.state.productName ? (
                  <p>
                    <Skeleton />
                  </p>
                ) : (
                  <Input
                    labelText={strings.cart_placeHolder_Note}
                    id="note"
                    onChange={this.onChangeNote}
                    value={this.state.note}
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

CartProduct.propTypes = {
  productId: PropTypes.string,
  cartId: PropTypes.string,
  quantity: PropTypes.number,
  note: PropTypes.string,
  variant: PropTypes.arrayOf(Object)
};
