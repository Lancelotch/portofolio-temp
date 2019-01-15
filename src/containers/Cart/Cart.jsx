import React, { Component } from "react";
import Footer from "components/Footer/Footer.jsx";
import CartProducts from "../../components/Cart/CartProducts";
import OrderDetail from "../../components/Cart/OrderDetail";
import { Redirect } from "react-router-dom";
import { pageCheckout } from "url/url"
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import strings from "../../config/localization";
import { apiGetProductsFromCart, apiUpdateProductFromCart } from "../../api/services/ServiceCart";
import { apiGetProductById } from "../../api/services/ServiceProductDetail";
import { Breadcrumb, Button, Row, Col } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { apiGetAddressDefault } from "../../api/services/ServiceAddress";

var buttonCartPesan = {
  width: "99px",
  border: "1px solid #ACACBA",
  borderRadius: "3px",
  backgroundColor: "#FAFAFA",
  float: "right",
  textTransform: "unset",
  marginBottom: "30px"
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      customerAddressId: "",
      orderId: "",
      open: false,
      isLoaderActive: false,
      redirectToCheckout: false,
      isLoaded: false
    };
  }

  componentWillMount() {
    this.getCart();
  }

  getCart = () => {
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

  checkout = () => {
    this.setState({
      isLoaderActive: true
    });
    const updateProducts = this.state.cartProducts.map(cartProduct => {
      return {
        cartId: cartProduct.cartId,
        note: cartProduct.note,
        quantity: cartProduct.quantity,
        variant: cartProduct.variant
      };
    });
    apiUpdateProductFromCart(updateProducts)
      .then(response => {
        apiGetAddressDefault()
          .then(response => {
            localStorage.setItem(
              "cartProducts",
              JSON.stringify({
                products: this.state.cartProducts
              })
            );
            // window.location.assign(pageCheckout);
            this.setState({
              isLoaderActive: false,
              redirectToCheckout: true
            });
          })
          .catch(error => {
            this.setState({
              isLoaderActive: false
            });
            if (error.status === 500) {
              this.toggleModal();
            }
          });
      })
      .catch(error => {
        this.setState({
          isLoaderActive: false
        });
        console.log(error);
      });
  };

  toggleModal() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });
  }

  renderRedirectToCheckout() {
    if (this.state.redirectToCheckout) {
      return <Redirect to={pageCheckout} />;
    }
  }

  render() {
    return (
      <Loader active={this.state.isLoaderActive}>
        {this.renderRedirectToCheckout()}
        <div className="cart-product">
          <div
            className={
              this.state.cartProducts.length < 1 ? "" : '' // classes.container
            }
          >
            <Header />
            <Row>
              <Col md={this.state.cartProducts.length < 1 ? 24 : 16} xs={24} style={{marginTop: "111px"}}>
                {this.state.cartProducts.length > 0 && (
                  <Breadcrumb style={{ paddingLeft: "0px" }}>
                    <BreadcrumbItem>
                      <a href="/">{strings.monggoPesen}</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/cart">{strings.cart_tittle}</a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                )}
                {this.state.cartProducts.length > 0 && (
                  <h4>{strings.cart_tittle}</h4>
                )}
                <CartProducts
                  cartProducts={this.state.cartProducts}
                  onChange={this.onChange}
                  isLoaded={this.state.isLoaded}
                />
                {this.state.cartProducts.length > 0 && (
                  <a href="#">
                    <Button style={buttonCartPesan}>
                      {strings.repeat_order}
                    </Button>
                  </a>
                )}
              </Col>
              {this.state.cartProducts.length > 0 && (
                <Col md={4} xs={6}>
                  {/* {this.state.cartProducts.map(price)} */}
                  <OrderDetail
                    label={strings.total_price_product}
                    price={this.countTotal(this.state.cartProducts)}
                    title={strings.orderDetail}
                  />
                  <Col xs={24} className="price-label-button">
                    <Button
                      style={{ marginTop: "3rem" }}
                      buttonProductDetail
                      onClick={this.checkout}
                    >
                      {strings.checkout}
                    </Button>
                    <br />
                    <br />
                    <p>{strings.cart_easy_and_safe}</p>
                    {/* {this.state.open === true && (
                      <AddAddressCustomer
                        open={this.state.open}
                        handleClose={this.handleClose.bind(this)}
                        changeAddress={this.checkout}
                      />
                    )} */}
                  </Col>
                </Col>
              )}
            </Row>
          </div>
          {this.state.cartProducts.length > 0 && <Footer />}
        </div>
      </Loader>
    );
  }
}

export default Cart;
