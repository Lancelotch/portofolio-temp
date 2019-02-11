import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckoutProduct from "./CheckoutProduct";
import { Row, Col } from "antd";

export default class CheckoutProducts extends Component {
  onChangeProduct = productChanged => {
    const cartProducts = this.props.cartProducts
    cartProducts.map(cartProduct => {
      if (cartProduct.cartId === productChanged.cartId) {
        return cartProduct = {
          ...cartProduct,
          courier: productChanged.courier
        }
      }
      return cartProduct
    })
    this.props.onChange(cartProducts)
  };

  listCheckoutProducts = () => {
    const { cartProducts } = this.props
    if (cartProducts) {
      return cartProducts.map((product, index) => {
        return (
          <CheckoutProduct
            key={product.cartId}
            cartProduct={product}
            onChangeProduct={this.onChangeProduct}
          />
        );
      });
    }
    return <CheckoutProduct key={0} />;
  };

  render() {
    return (
      <Row>
        <Col md ={24} xs={24}>{this.props.title}</Col>
        <Col md ={24} xs={24}>{this.listCheckoutProducts()}</Col>
      </Row>
    );
  }
}
CheckoutProducts.propTypes = {
  title: PropTypes.string,
  checkoutProducts: PropTypes.arrayOf(Object)
};
