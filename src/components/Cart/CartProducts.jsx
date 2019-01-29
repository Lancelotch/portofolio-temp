import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import PropTypes from "prop-types";
import strings from "../../config/localization";
import { Row, Col } from "antd";
import { apiDeleteProductFromCart } from "../../api/services/ServiceCart";
// import { UPDATE_CART_CONTENT_QTY } from "../../stores/actions/types";
import { updateCartContentQty} from "../../store/actions/cart"

class CartProducts extends Component {
  onChangeProduct = productChanged => {
    const cartProducts = this.props.cartProducts.map(cartProduct => {
      if (cartProduct.cartId === productChanged.cartId) {
        return cartProduct = {
          ...cartProduct,
          note: productChanged.note,
          quantity: productChanged.quantity
        };
      }
      return cartProduct;
    })
    this.props.onChange(cartProducts)
  };

  onDeleteCartProduct = (cartId, index) => {
    apiDeleteProductFromCart({ cartId })
      .then(() => {
        const cartProducts = this.props.cartProducts;
        cartProducts.splice(index, 1);
        return cartProducts
      })
      .then(cartProducts => {
        this.props.updateCartQty(cartProducts.length);
        this.props.onChange(cartProducts);
      })
      .catch(error => {
        console.log(error);
      });
  };

  listCartProducts = () => {
    const cartProducts = this.props.cartProducts
    if (cartProducts.length) {
      return cartProducts.map((cartProduct, index) => (
        <CartProduct
          key={cartProduct.cartId}
          cartProduct={cartProduct}
          onDelete={() => this.onDeleteCartProduct(cartProduct.cartId, index)}
          onChangeProduct={this.onChangeProduct}
        />
      ));
    }
  };

  render() {
    const cartProducts = this.props.cartProducts
    return (
      <Row>
        <Col xs={24}>
          { !cartProducts.length ? "" : <p className="cart-product-title">{strings.product}</p> }
        </Col>
        {this.props.isLoaded ? (
          <Col md={24} xs={24}>
            {this.listCartProducts()}
          </Col>
        ) : "" }
      </Row>
    );
  }
}

CartProducts.propTypes = {
  title: PropTypes.string,
  cartProducts: PropTypes.arrayOf(Object),
  updateCartQty: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateCartQty: (qty) => dispatch(updateCartContentQty(qty))
});

export default connect(
  null,
  mapDispatchToProps
)(CartProducts);
