import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import PropTypes from "prop-types";
import EmptyCart from "containers/Cart/EmptyCart";
import strings from "../../config/localization";
import { Row, Col } from "antd";
import { apiDeleteProductFromCart } from "../../api/services/ServiceCart";
import { UPDATE_CART_CONTENT_QTY } from "../../store/actions/types";

class CartProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      cartProducts: newProps.cartProducts
    });
  }

  onChangeProduct = productChanged => {
    this.setState(
      {
        cartProducts: this.state.cartProducts.map(cartProduct => {
          if (cartProduct.cartId === productChanged.cartId) {
            cartProduct = {
              ...cartProduct,
              note: productChanged.note,
              quantity: productChanged.quantity
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

  onDeleteCartProduct = (cartId, index) => {
    apiDeleteProductFromCart({ cartId: cartId })
      .then(result => {
        console.log(result);
      })
      .then(() => {
        const cartProducts = [...this.state.cartProducts];
        cartProducts.splice(index, 1);
        return cartProducts;
      })
      .then(cartProducts => {
        this.props.updateCartContentQty(cartProducts.length);
        this.setState(
          {
            cartProducts: cartProducts
          },
          () => {
            this.props.onChange(this.state.cartProducts);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  listCartProducts = () => {
    if (this.state.cartProducts.length < 0) {
      return (
        <CartProduct
          key={0}
          cartId={null}
          productId={null}
          variant={[]}
          quantity={0}
          note={null}
          productName={null}
          productPic={null}
          price={null}
        />
      );
    }

    return this.state.cartProducts.map((cartProduct, index) => {
      return (
        <CartProduct
          key={cartProduct.cartId}
          cartId={cartProduct.cartId}
          productId={cartProduct.productId}
          variant={cartProduct.variant}
          quantity={cartProduct.quantity}
          note={cartProduct.note}
          productName={cartProduct.productName}
          productPic={cartProduct.productPic}
          price={cartProduct.price}
          onDelete={() => this.onDeleteCartProduct(cartProduct.cartId, index)}
          onChangeProduct={this.onChangeProduct}
        />
      );
    });
  };

  render() {
    return (
      <Row>
        <Col xs={24}>
          {this.state.cartProducts.length < 1 ? (
            ""
          ) : (
            <p className="cart-product-title">{strings.product}</p>
          )}
        </Col>
        {this.state.cartProducts.length < 1 && this.props.isLoaded ? (
          <Col md={24}>
            <EmptyCart />
          </Col>
        ) : (
          <Col md={24} xs={24}>
            {this.listCartProducts()}
          </Col>
        )}
      </Row>
    );
  }
}

CartProducts.propTypes = {
  title: PropTypes.string,
  cartProducts: PropTypes.arrayOf(Object),
  updateCartContentQty: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    updateCartContentQty: qty =>
      dispatch({ type: UPDATE_CART_CONTENT_QTY, payload: qty })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CartProducts);
