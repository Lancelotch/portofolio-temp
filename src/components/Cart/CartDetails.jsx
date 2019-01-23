import React, { Component } from "react";
import OrderDetail from "./OrderDetail";
import strings from "../../config/localization";
import { apiGetProductsFromCart } from "../../api/services/ServiceCart";
import { apiGetProductById } from "../../api/services/ServiceProductDetail";
import { Row, Col } from "antd";

class CartDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: []
    };
  }

  componentWillMount() {
    this.productCart();
  }

  onChange = cartProduct => {
    this.setState({
      cartProducts: cartProduct
    });
  };

  countTotal = cartProducts => {
    var priceTotal = 0;
    cartProducts.map(cartProduct => {
      priceTotal = priceTotal + cartProduct.quantity * cartProduct.price;
    });
    return priceTotal;
  };


  productCart = () => {
    apiGetProductsFromCart()
      .then(response => {
        if (response.code == 200) {
          return new Promise((resolve, reject) => {
            if (response.data.length < 1) {
              resolve();
            }
            response.data.map(cartProduct => {
              apiGetProductById(cartProduct.productId)
                .then(res => {
                  const detail = JSON.parse(
                    decodeURIComponent(res.data.homePageDetails)
                  );
                  var priceIdr = 0;
                  var pricePiyin = 0;
                  detail.prices.map(price => {
                    if (price.price.code === "IDR") {
                      priceIdr = price.price.value;
                    } else if (price.price.code === "CNY") {
                      pricePiyin = price.price.value;
                    }
                  });
                  const product = {
                    productName: detail.productName,
                    productPic: detail.productPic,
                    price: priceIdr,
                    category: res.data.category.indonesian,
                    piyinPrice: pricePiyin
                  };
                  return product;
                })
                .then(product => {
                  const mergeCartProduct = { ...cartProduct, ...product };
                  this.setState(prevState => ({
                    cartProducts: [...prevState.cartProducts, mergeCartProduct]
                  }));
                  return resolve();
                })
                .catch(error => {
                  console.log(error);
                  return reject();
                });
            });
          });
        }
      })
      .then(() => {
        this.setState({
          isLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };


  listCartProducts = () => {
    return this.state.cartProducts.map((cartProduct, index) => {
      // console.log(cartProduct.variant)
      return (
        <OrderDetail
        label={strings.total_price_product}
        price={this.countTotal(this.state.cartProducts)}
        title={strings.orderDetail}
      />
      );
    });
  };
  render() {
    return (
      <Row>
   
          <Col md={24} xs={24}>
            {this.listCartProducts()}
          </Col>
       
      </Row>
    );
  }
}


export default CartDetails;
