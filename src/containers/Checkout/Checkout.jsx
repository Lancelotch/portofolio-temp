import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Footer from "components/Footer/Footer.jsx";
import CheckoutProducts from "../../components/Checkout/CheckoutProducts.jsx";
import { apiGetAddressDefault } from "../../services/ServiceAddress.js";
import { apiGetCourier } from "../../services/ServiceCourier.js";
import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import CheckoutDetail from "../../components/Checkout/CheckoutDetail.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { apiGetOrderId } from "../../services/ServiceCart.js";
import serviceOrder from "../../services/ServiceOrder.js";
import servicePayment from "../../services/ServicePayment.js";
import { pageDashboard, waitingRedirect } from "../../url/url";
import AddressReceiver from "../../components/Address/AddressReceiver.jsx";
import AddAddressCustomer from "../../components/DashboardFormCustomer/AddAddressCustomer";
import ChangeAddressCustomer from "../../components/Address/ChangeAddressCustomer.jsx";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount.jsx";
import SnackBar from "../../components/Snackbar/SnackbarContent";
import "assets/css/view/CheckOut/CheckOut.css";
import Header from "../../components/Header/Header.jsx";
import strings from "../../config/localization.js";
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
      customerAddressId : ""
    };
  }

  componentWillMount() {
    this.getCheckout();
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
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
        const weight = 1000;
        cartProducts.products.map((product, i, arr) => {
          let request = {
            destination: customerAddressDefault.cityId,
            category: product.category,
            weight: weight
          };
          apiGetCourier(request).then(response => {
            let couriers = response.data;
            let mergeCartProductCouriers = {
              ...product,
              ...{ priceCourier: 0 },
              ...{ couriers: [...couriers] },
              ...{ courier: { cost: 0 } },
              ...{ customerAddressId: customerAddressDefault.id }
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
      });
  }

  onChange = cartProducts => {
    this.setState({
      cartProducts: cartProducts
    });
  };

  totalPrice = () => {
    let totalPriceProduct = 0;
    let totalPriceDelivery = 0;
    this.state.cartProducts.map(cartProduct => {
      totalPriceProduct =
        totalPriceProduct + cartProduct.price * cartProduct.quantity;
      totalPriceDelivery = totalPriceDelivery + cartProduct.courier.cost;
    });
    const totalPrice = {
      totalPriceProduct: totalPriceProduct,
      totalPriceDelivery: totalPriceDelivery,
      totalPriceInvoice: totalPriceProduct + totalPriceDelivery
    };
    return totalPrice;
  };

  addAddress = () => {
    this.setState({
      openAddAddressModal: true
    })
  }

  changeAddress = () => {
    this.setState({
      openChangeAddressModal: true
    })
  }

  handleCloseAdd() {
    this.setState({
      openAddAddressModal: !this.state.openAddAddressModal
    });
  }

  getChangeAddress = () => {
    apiGetAddressDefault()
      .then(result => {
        const customerAddressDefault = result.data;
        this.setState({ addressReceiver: customerAddressDefault });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleCloseChange() {
    this.getChangeAddress();
    this.setState({
      openChangeAddressModal: !this.state.openChangeAddressModal
    });
    window.location.reload();
  }

  addOrder = () => {
    this.setState({ alert: null });
    const cekCourier = this.state.cartProducts.find(
      cartProduct => cartProduct.courier.cost === 0
    );
    cekCourier !== undefined
      ? this.setState({ alert: strings.checkout_alert_fill_courier })
      : apiGetOrderId()
        .then(response => {
          const orderId = response.data;
          return orderId;
        })
        .then(orderId => {
          const customerAddressId = this.state.customerAddressId;
          const order = {
            customerAddressId : customerAddressId,
            orderId: orderId,
            indexRequest: this.state.cartProducts.map(cartProduct => {
              const piyinPrice = parseInt(cartProduct.piyinPrice);
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
                  piyinPrice: piyinPrice,
                  amount: amount,
                  category: cartProduct.category,
                  variants: cartProduct.variant
                },
                courier: cartProduct.courier,
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
                    if (payment.code == "200") {
                      snap.pay(payment.data.token, {
                        onSuccess: async result => {
                          console.log("Success");
                          window.location.assign(waitingRedirect);
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
        })
        .catch(error => {
          console.log(error);
        });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="cartCheckout">
        <ScrollToTopOnMount />
        <div className={classes.container}>
          <Header />
          <GridContainer>
            <GridItem xs={12} sm={6} md={12} lg={8}>
              <AddressReceiver
                labelName={strings.address}
                addressReceiver={this.state.addressReceiver}
                addAddress={this.addAddress}
                changeAddress={this.changeAddress}
              />
            </GridItem>
            <GridItem lg={4}>
              <CheckoutDetail
                title={strings.checkout_shopping_summary}
                totalProduct={this.state.qytCartProduct}
                totalPriceProduct={this.totalPrice().totalPriceProduct}
                totalPriceDelivery={this.totalPrice().totalPriceDelivery}
                totalPriceInvoice={this.totalPrice().totalPriceInvoice}
              />
              <div className="price-label-button">
                {
                  this.state.alert !== null && <SnackBar
                    classes={classes}
                    color="danger"
                    message={
                      <span>
                        <b>{strings.failed} </b> {this.state.alert}
                      </span>
                    }
                  />
                }
                <Button
                  style={{ marginTop: "0rem" }}
                  buttonProductDetail
                  onClick={this.addOrder}
                >
                  {strings.pay}
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={12} lg={8} style={{ marginTop: "-56px" }}>
              <CheckoutProducts
                cartProducts={this.state.cartProducts}
                onChange={this.onChange}
              />
            </GridItem>
          </GridContainer>
        </div>
        {this.state.openAddAddressModal === true &&
          <AddAddressCustomer
            open={this.state.openAddAddressModal}
            handleClose={this.handleCloseAdd.bind(this)}
            changeAddress={this.getChangeAddress.bind(this)}
          />
        }
        {this.state.openChangeAddressModal === true &&
          <ChangeAddressCustomer
            open={this.state.openChangeAddressModal}
            handleClose={this.handleCloseChange.bind(this)}
            addressIdDefault={this.state.addressReceiver.id}
          />
        }
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Checkout);
