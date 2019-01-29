import React, { Component } from "react";
import Footer from "components/Footer/Footer.jsx";
import CartProducts from "../../components/Cart/CartProducts";
import OrderDetail from "../../components/Cart/OrderDetail";
import { Redirect } from "react-router-dom";
import "./style.sass";
import "sass/style.sass";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import AddAddressCustomer from "../../components/DashboardFormCustomer/AddAdressCustomer/AddAdressCustomer";
import strings from "../../config/localization";
import {
  apiGetProductsFromCart,
  apiUpdateProductFromCart
} from "../../api/services/ServiceCart";
import { pageCheckout } from "routers/paths";
import { apiGetProductById } from "../../api/services/ServiceProductDetail";
import { Breadcrumb, Button, Row, Col } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { apiGetAddressDefault } from "../../api/services/ServiceAddress";
import EmptyCart from "./EmptyCart";

const buttonCartPesan = {
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
    this.productCart();
  }

  productCart = () => {
    apiGetProductsFromCart()
      .then(response => {
        if (response.code.toString() === "200") {
          return new Promise((resolve, reject) => {
            if (response.data.length < 1) {
              resolve();
            }
            response.data.map(cartProduct =>
              apiGetProductById(cartProduct.productId)
                .then(res => {
                  const detail = JSON.parse(
                    decodeURIComponent(res.data.homePageDetails)
                  );
                  const { productName, productPic, prices } = detail;
                  const price =
                    prices.find(({ price }) => price.code === "IDR") || 0;
                  const piyinPrice =
                    prices.find(({ price }) => price.code === "CNY") || 0;
                  return {
                    productName,
                    productPic,
                    price: price.price.value,
                    piyinPrice: piyinPrice.price.value,
                    category: res.data.category.indonesian
                  };
                })
                .then(product => {
                  const mergeCartProduct = { ...cartProduct, ...product };
                  this.setState(prevState => ({
                    cartProducts: [...prevState.cartProducts, mergeCartProduct]
                  }));
                  resolve();
                })
                .catch(error => {
                  console.log(error);
                  reject();
                })
            );
          });
        }
      })
      .then(() => {
        this.setState({ isLoaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  countTotal = cartProducts =>
    cartProducts.reduce(
      (accumulator, cartProduct) =>
        accumulator + cartProduct.quantity * cartProduct.price,
      0
    );

  checkout = () => {
    const { cartProducts } = this.state;
    this.setState({ isLoaderActive: true });
    const updateProducts = cartProducts.map(cartProduct => {
      return {
        cartId: cartProduct.cartId,
        note: cartProduct.note,
        quantity: cartProduct.quantity,
        variant: cartProduct.variant
      };
    });

    apiUpdateProductFromCart(updateProducts)
      .then(_ => {
        this.setState({ isLoaderActive: false, redirectToCheckout: true });
      })
      .catch(error => {
        this.setState({ isLoaderActive: false });
        console.log(error);
        if (error.status === 500) {
          this.toggleModal();
        }
      });
  };

  toggleModal() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }

  renderRedirectToCheckout() {
    if (this.state.redirectToCheckout) {
      return <Redirect to={pageCheckout} />;
    }
  }

  render() {
    const { cartProducts, isLoaded, isLoaderActive } = this.state;

    return (
      <Loader active={isLoaderActive}>
        {this.renderRedirectToCheckout()}
        <Header />
        <div
          className={cartProducts.length < 1 ? "container-fluid" : "container"}
          style={{ marginTop: "230px" }}
        >
          <Row>
            <Col md={!cartProducts.length ? 24 : 16} xs={24}>
              {cartProducts.length > 0 && (
                <Breadcrumb style={{ paddingLeft: "0px" }}>
                  <BreadcrumbItem>
                    <a href="/">{strings.monggoPesen}</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="/cart">{strings.cart_tittle}</a>
                  </BreadcrumbItem>
                </Breadcrumb>
              )}
              {cartProducts.length > 0 && <h4>{strings.cart_tittle}</h4>}
              {cartProducts.length ? (
                <CartProducts
                  cartProducts={cartProducts}
                  onChange={cartProducts => this.setState({ cartProducts })}
                  isLoaded={isLoaded}
                />
              ) : (
                <EmptyCart />
              )}
              {cartProducts.length > 0 && (
                <a href="/#">
                  <Button style={buttonCartPesan}>
                    {strings.repeat_order}
                  </Button>
                </a>
              )}
            </Col>
            {cartProducts.length > 0 && (
              <Col md={8} xs={6}>
                <OrderDetail
                  label={strings.total_price_product}
                  price={this.countTotal(cartProducts)}
                  title={strings.orderDetail}
                />
                <Col xs={24} className="price-label-button">
                  <Button style={{ marginTop: "3rem" }} onClick={this.checkout}>
                    {strings.checkout}
                  </Button>
                  <br />
                  <br />
                  <p>{strings.cart_easy_and_safe}</p>
                  {this.state.open === true && (
                    <AddAddressCustomer
                      open={this.state.open}
                      handleClose={this.handleClose.bind(this)}
                      changeAddress={this.checkout}
                    />
                  )}
                </Col>
              </Col>
            )}
          </Row>
        </div>
        {/* {this.state.cartProducts.length > 0 && <Footer />} */}
        <Footer />
      </Loader>
    );
  }
}

export default Cart;
