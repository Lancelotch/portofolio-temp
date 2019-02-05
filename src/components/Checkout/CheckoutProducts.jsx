import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckoutProduct from "./CheckoutProduct";
import { Row, Col } from "antd";

export default class CheckoutProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      cartProducts: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      cartProducts: props.cartProducts
    });
  }

  onChangeCourier = cartProductChanged => {
    this.setState(
      {
        cartProducts: this.state.cartProducts.map(cartProduct => {
          if (cartProduct.cartId === cartProductChanged.cartId) {
            cartProduct = {
              ...cartProduct,
              courier: cartProductChanged.courier
            };
          }
          return cartProduct;
        })
      },
      () => {
        this.props.onChange(this.state.cartProducts);
      }
    );
  };

  listCheckoutProducts = () => {
    if (this.state.cartProducts < 1) {
      return <CheckoutProduct key={0} />;
    }

    return this.state.cartProducts.map((product, index) => {
      return (
        <CheckoutProduct
          key={product.cartId}
          cartId={product.cartId}
          productId={product.productId}
          variant={product.variant}
          quantity={product.quantity}
          note={product.note}
          productName={product.productName}
          productPic={product.productPic}
          couriers={product.couriers}
          price={product.price}
          courier={product.courier}
          onChangeCourier={this.onChangeCourier}
        />
      );
    });
  };

  render() {
    return (
      <Row>
        <Col md ={24} xs={24}>{this.state.title}</Col>
        <Col md ={24} xs={24}>{this.listCheckoutProducts()}</Col>
      </Row>
    );
  }
}
CheckoutProducts.propTypes = {
  title: PropTypes.string,
  checkoutProducts: PropTypes.arrayOf(Object)
};
