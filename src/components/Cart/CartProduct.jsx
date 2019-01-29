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
  onChangeNote = event => {
    const cartProduct = this.props.cartProduct;
    cartProduct.note = event.target.value;
    this.props.onChangeProduct(cartProduct);
  };
  onChangeQuantity = quantity => {
    const cartProduct = this.props.cartProduct;
    cartProduct.quantity = quantity;
    this.props.onChangeProduct(cartProduct);
  };
  render() {
    const cartProduct = this.props.cartProduct;
    console.log(cartProduct);

    return (
      <div className="container-fluid">
        <Row>
          <Col md={24} xs={24}>
            <Card>
              <Row>
                <Col md={24} xs={24} className="close-button-cart">
                  {!cartProduct.productName ? (
                    ""
                  ) : (
                    <p onClick={this.props.onDelete}>{strings.action_delete}</p>
                  )}
                </Col>
                <Col md={8} xs={8}>
                  {!cartProduct.productPic ? (
                    <SkeletonImg heightSkeleton="95px" />
                  ) : (
                    <img src={cartProduct.productPic} alt="" />
                  )}
                </Col>
                <Col md={16} xs={16}>
                  <p>{cartProduct.productName.trim() || <Skeleton />}</p>
                  <span>
                    {!cartProduct.price ? (
                      <p>
                        <Skeleton />
                      </p>
                    ) : (
                      <CurrencyRp price={cartProduct.price} />
                    )}
                  </span>
                  {!cartProduct.variants.length && !cartProduct.price ? (
                    <Skeleton />
                  ) : (
                    <CartVariants variants={cartProduct.variants} />
                  )}
                  {!cartProduct.quantity ? (
                    <p>
                      <Skeleton />
                    </p>
                  ) : (
                    <ButtonQuantity
                      quantity={cartProduct.quantity}
                      onChange={this.onChangeQuantity}
                    />
                  )}
                  {!cartProduct.productName ? (
                    <p>
                      <Skeleton />
                    </p>
                  ) : (
                    <Input
                      placeholder={strings.cart_placeHolder_Note}
                      id="note"
                      onChange={this.onChangeNote}
                      value={cartProduct.note}
                    />
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

CartProduct.propTypes = {
  productId: PropTypes.string,
  cartId: PropTypes.string,
  quantity: PropTypes.number,
  note: PropTypes.string,
  variants: PropTypes.arrayOf(Object)
};
