import React, { Component } from "react";
import { apiGetAddressDefault } from "../../api/services/ServiceAddress";
import { apiGetCourier } from "../../api/services/ServiceCourier";
import strings from "../../config/localization";
import { apiGetOrderId, apiGetProductsFromCart } from "../../api/services/ServiceCart";
import serviceOrder from "../../api/services/ServiceOrder";
import AddAddressCustomer from "../../components/DashboardFormCustomer/AddAdressCustomer/AddAdressCustomer";
import servicePayment from "../../api/services/ServicePayment";
import Waitingredirect from "../../components/WaitingRedirect/WaitingRedirect";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import CheckoutDetail from "components/Checkout/CheckoutDetail.jsx";
import CheckoutProducts from "components/Checkout/CheckoutProducts.jsx";
import { Row, Button, Col, Alert, Empty } from "antd";
import { apiGetProductById } from "../../api/services/ServiceProductDetail";
const snap = window.snap;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      qytCartProduct: 0,
      order: [],
      addressReceiver: "",
      openChangeAddressModal: false,
      openAddAddressModal: false,
      alert: null,
      customerAddressId: ""
    };
  }

  componentWillMount() {
    this.getCheckout();
  }

  getProducts = () => {
    return apiGetProductsFromCart()
      .then(response => {
        if (response.code.toString() === "200") {
          return new Promise((resolve, reject) => {
            if (response.data.length < 1) {
              resolve();
            }
            let cartProducts = []
            response.data.map(cartProduct => 
              apiGetProductById(cartProduct.productId)
                .then(res => {
                  const detail = JSON.parse(
                    decodeURIComponent(res.data.homePageDetails)
                  );
                  const { productName, productPic, prices } = detail
                  const price = prices.find(({price}) => price.code === "IDR") || 0;
                  const piyinPrice =  prices.find(({price}) => price.code === "CNY") || 0;
                  return {
                    productName,
                    productPic,
                    price: price.price.value,
                    piyinPrice: piyinPrice.price.value, 
                    category: res.data.category.indonesian,
                  };
                })
                .then(product => {
                  const mergeCartProduct = { ...cartProduct, ...product };
                  cartProducts = [...cartProducts, mergeCartProduct]
                  resolve(cartProducts)
                })
                .catch(error => {
                  console.log(error);
                  reject();
                })
            );
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCheckout = () => {
    apiGetAddressDefault()
      .then(result => {
        const customerAddressDefault = result.data;
        this.setState({
          addressReceiver: customerAddressDefault,
          customerAddressId: customerAddressDefault.id
        });
        return customerAddressDefault;
      })
      .then(customerAddressDefault => {
        const products = this.getProducts()
        products.then(cartProducts => {
          cartProducts.map((product, _, arr) => {
              let request = {
                destination: customerAddressDefault.cityId,
                category: product.category,
                weight: weight
              };
              apiGetCourier(request).then(response => {
                let couriers = response.data;
                let mergeCartProductCouriers = {
                  ...product,
                  priceCourier: 0,
                  couriers,
                  courier: { cost: 0 },
                  customerAddressId: customerAddressDefault.id
                };
                this.setState(prevState => ({
                  cartProducts: [
                    ...prevState.cartProducts,
                    mergeCartProductCouriers
                  ],
                  qytCartProduct: arr.length
                }));
              });
            });
        })
        const weight = 1000;
      });
  };

  totalPrice = () => {
    let { cartProducts } = this.state;
    let totalPriceProduct = cartProducts.reduce(
      (accumulator, cartProduct) =>
        accumulator + cartProduct.price * cartProduct.quantity,
      0
    );
    let totalPriceDelivery = cartProducts.reduce(
      (accumulator, cartProduct) => accumulator + cartProduct.courier.cost,
      0
    );
    return {
      totalPriceProduct,
      totalPriceDelivery,
      totalPriceInvoice: totalPriceProduct + totalPriceDelivery
    };
  };

  addAddress = () => {
    this.setState({ openAddAddressModal: true });
  };

  changeAddress = () => {
    this.setState({ openChangeAddressModal: true });
  };

  handleCloseAdd() {
    this.setState({ openAddAddressModal: !this.state.openAddAddressModal });
  }

  getChangeAddress = () => {
    apiGetAddressDefault()
      .then(result => {
        const customerAddressDefault = result.data;
        this.setState({ addressReceiver: customerAddressDefault });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCloseChange() {
    this.getChangeAddress();
    this.setState({
      openChangeAddressModal: !this.state.openChangeAddressModal
    });
    window.location.reload();
  }

  addOrder = () => {
    const { cartProducts, customerAddressId } = this.state;
    this.setState({ alert: null });
    const cekCourier = cartProducts.find(
      cartProduct => cartProduct.courier.cost === 0
    );
    cekCourier !== undefined
      ? this.setState({ alert: strings.checkout_alert_fill_courier })
      : apiGetOrderId()
          .then(response => {
            return response.data;
          })
          .then(orderId => {
            const order = {
              customerAddressId: customerAddressId,
              orderId: orderId,
              indexRequest: cartProducts.map(cartProduct => {
                const amount = this.totalPrice().totalPriceInvoice;
                return {
                  product: {
                    cartId: cartProduct.cartId,
                    productId: cartProduct.productId,
                    name: cartProduct.productName,
                    image: cartProduct.productPic,
                    quantity: cartProduct.quantity,
                    idrPrice: cartProduct.price,
                    notes: cartProduct.note,
                    piyinPrice: parseInt(cartProduct.piyinPrice),
                    amount: amount,
                    category: cartProduct.category,
                    variants: cartProduct.variants
                  },
                  courier: cartProduct.courier
                };
              })
            };

            serviceOrder
              .addOrder(order)
              .then(response => {
                if (response.data === true) {
                  snap.show();
                  const transaction = {
                    transaction_details: {
                      order_id: orderId,
                      gross_amount: this.totalPrice().totalPriceInvoice
                    }
                  };
                  servicePayment
                    .createPayment(transaction)
                    .then(payment => {
                      if (payment.code.toString() === "200") {
                        snap.pay(payment.data.token, {
                          onSuccess: async result => {
                            console.log("Success");
                            window.location.assign(Waitingredirect);
                          },
                          onPending: async result => {
                            console.log("Pending");
                          },
                          onError: result => {
                            snap.hide();
                          },
                          onClose: result => {
                            console.log(
                              "customer closed the popup without finishing the payment"
                            );
                          }
                        });
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              })
              .catch(error => {
                console.log(error);
              });
            console.log(orderId);
          })
          .catch(error => {
            console.log(error);
          });
  };

  render() {
    const {
      cartProducts,
      qytCartProduct,
      alert,
      openAddAddressModal
    } = this.state;
    return (
      <div className="container" style={{ marginTop: "230px" }}>
        <Header />
        <Row>
          {/* <Col xs={12} sm={6} md={12} lg={8}>
              <AddressReceiver
                labelName={strings.address}
                addressReceiver={this.state.addressReceiver}
                addAddress={this.addAddress}
                changeAddress={this.changeAddress}
              />
            </Col>  */}
          <Col xs={12} md={18}>
            <CheckoutProducts
              cartProducts={cartProducts}
              onChange={cartProducts => this.setState({ cartProducts })}
            />
          </Col>
          <Col md={6}>
            <CheckoutDetail
              title={strings.checkout_shopping_summary}
              totalProduct={qytCartProduct}
              totalPriceProduct={this.totalPrice().totalPriceProduct}
              totalPriceDelivery={this.totalPrice().totalPriceDelivery}
              totalPriceInvoice={this.totalPrice().totalPriceInvoice}
            />
            <div className="price-label-button">
              {this.state.alert !== null && (
                <Alert
                  message={
                    <span>
                      <b>{strings.failed} </b> {alert}
                    </span>
                  }
                  showIcon
                />
              )}
              <Button style={{ marginTop: "0rem" }} onClick={this.addOrder}>
                {strings.pay}
              </Button>
            </div>
          </Col>
        </Row>
        {openAddAddressModal === true && (
          <AddAddressCustomer
            open={openAddAddressModal}
            handleClose={this.handleCloseAdd.bind(this)}
            changeAddress={this.getChangeAddress.bind(this)}
          />
        )}
        {/* {this.state.openChangeAddressModal === true &&
          <ChangeAddressCustomer
            open={this.state.openChangeAddressModal}
            handleClose={this.handleCloseChange.bind(this)}
            addressIdDefault={this.state.addressReceiver.id}
          />
        }  */}
        <Footer />
      </div>
    );
  }
}

export default Checkout;
