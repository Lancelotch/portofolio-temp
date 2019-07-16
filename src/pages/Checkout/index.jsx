import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import FormAddAddress from "../../containers/FormAddAddress";
import { addressDefault } from "../../store/actions/address";
import {
  apiPostWithToken,
  apiGetWithToken,
  apiPutWithToken
} from "../../api/services";
import { PATH_CUSTOMER, PATH_ORDER, PATH_SHIPPING } from "../../api/path";
import { AddressCheckout } from "../../components/AddressCheckout";
import FormEditAddress from "../../containers/FormEditAddress";
import AddressList from "../../containers/AddressList";
import OrderDetailContainer from "../../containers/OrderDetail";
import OrderSummary from "../../components/OrderSummary";
import strings from "../../localization/localization";
import ModalSuccess from '../../modal/ModalRegisterSuccess'
import { openModal } from "../../store/actions/authentication"
import { pageUrlPaymentInfo } from "../../library/url"
import "./style.sass";
import history from "../../routers/history";
import { Link } from "react-router-dom";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      visibleAddAddress: false,
      visibleEditAddress: false,
      visibleListAddress: false,
      addresses: [],
      customerAddress: {},
      productId: "",
      priceProduct: 0,
      shipment: "sea",
      variants: [],
      productSkuId: "",
      quantity: 1,
      note: "",
      isProductDetailAvailable: false,
      textButton: "Lanjut Belanja",
      cities: [],
      subdistricts: [],
      jneChecked: false,
      totalAmount: 0,
      maxOrder: 0,
      shipmentFee: {},
      priceJne: 0,
      isLoading: false
    };
  }

  snap = window.snap;

  componentDidMount() {
    this.getListAddress();
    this.getPayloadProductDetail();
    this.initCustomerAddress();
    this.getFareExpedisi();
    // this.getSubdistrict()
  }

  componentWillReceiveProps(props) {
    if (!props.isAddressAvailable) {
      this.setState({
        customerAddress: props.dataAddressDefault
      });
    }
  }

  getCities = async id => {
    const params = {
      province: id
    };
    try {
      const response = await apiGetWithToken(
        PATH_CUSTOMER.ADDRESS_CITY,
        params
      );
      this.setState({ cities: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };
  getSubdistrict = async id => {
    const params = {
      city: id
    };
    try {
      const response = await apiGetWithToken(
        PATH_CUSTOMER.ADDRESS_SUBDISTRICT,
        params
      );
      this.setState({ subdistricts: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  splitValue = value => {
    const splitValue = value.split("|");
    return splitValue;
  };

  handleChangeCity = value => {
    const city = this.splitValue(value);
    this.setState(
      {
        cityId: city[0],
        city: city[1]
      },
      () => this.getSubdistrict(city[0])
    );
    console.log("handle change city di checkout", value);
  };

  initCustomerAddress = async () => {
    await this.props.addressDefault();
    this.setState(
      { customerAddress: this.props.dataAddressDefault }
      , () => {
        this.getCities(this.state.customerAddress.provinceId);
        this.getSubdistrict(this.state.customerAddress.cityId);
      }
    );
  };


  variantsRequest = variantsRequest => {
    const variants = [];
    variantsRequest.length < 1 &&
      variantsRequest.forEach(variant => {
        variants.push({
          id: variant.id,
          variantItemId: variant.variantItem.id
        });
      });
    return variants;
  };

  getPayloadProductDetail = () => {
    const payloadProductDetail = JSON.parse(localStorage.getItem("product"));
    console.log(payloadProductDetail);

    this.setState({
      isProductDetailAvailable: true,
      productId: payloadProductDetail.productId,
      priceProduct: payloadProductDetail.price,
      payloadProductDetail: { ...payloadProductDetail },
      variants: this.variantsRequest(payloadProductDetail.sku),
      quantity: payloadProductDetail.quantity,
      note: payloadProductDetail.note,
      maxOrder: payloadProductDetail.maxOrder,
      shipmentFee: payloadProductDetail.shipmentFee
    });
  };


  getFareExpedisi = async () => {
    try {
      const response = await apiPostWithToken(PATH_SHIPPING.JNE, {})
      console.log(response);
      this.setState({
        priceJne: response.data.data.price
      })
    } catch (error) {
      console.log(error);

    }
  }

  getListAddress = async () => {
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS);
      this.setState({
        addresses: response.data.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  actionShowAddFormAddress = () => {
    this.setState(prevState => ({
      visibleAddAddress: !prevState.visibleAddAddress
    }));
  };

  actionShowEditFormAddress = () => {
    this.setState(prevState => ({
      visibleEditAddress: !prevState.visibleEditAddress
    }));
  };

  actionShowListAddress = () => {
    this.setState(prevState => ({
      visibleListAddress: !prevState.visibleListAddress
    }));
  };

  actionSubmitAddFormAddress = async request => {
    try {
      const response = await apiPostWithToken(PATH_CUSTOMER.ADDRESS, request);
      if (response.data.data) {
        const customerAddressId = response.data.data;
        let customerAddress = {
          ...request,
          id: customerAddressId
        };
        this.setState({
          customerAddress: customerAddress
        });
        this.props.addressDefault();
        this.getListAddress();
        if (!this.isAddressAvailable) {
          this.props.addressDefault();
        }
        this.actionShowAddFormAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  actionSubmitEditFormAddress = async request => {
    try {
      const response = await apiPutWithToken(PATH_CUSTOMER.ADDRESS, request);
      if (response.data.data) {
        this.setState(
          {
            customerAddress: request
          },
          () => {
            this.getListAddress();
            this.actionShowEditFormAddress();
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  actionChangeShipping = (shipping) => {
    this.setState({
      shipment: shipping.shipment,
      shipping: shipping
    });
  };

  actionUpdateQuantity = quantity => {
    this.setState({
      quantity: quantity
    });
  };

  actionChangeNote = note => {
    this.setState({
      note: note
    });
  };

  actionChangeAddress = address => {
    this.setState(prevState => ({
      customerAddress: address,
      visibleListAddress: !prevState.visibleListAddress,
      tempCities: this.getCities(address.provinceId),
      tempSubdistrict: this.getSubdistrict(address.cityId)
    }));
    // this.getCities()
  };


  actionSubmitOrder = async () => {
    this.setState({ isLoading: true })
    const {
      variants,
      customerAddress,
      shipment,
      quantity,
      note,
      productId,
    } = this.state;
    const request = {
      customerAddressId: customerAddress.id,
      amount: this.countTotalAmount(),
      items: [
        {
          productId: productId,
          shipment: shipment,
          variants: variants,
          quantity: quantity,
          note: note
        }
      ]
    };
    try {
      const response = await apiPostWithToken(PATH_ORDER.ORDER, request);
      console.log('response scheckout', response);
      if (this.state.quantity > this.state.maxOrder) {
        alert('adasd')
        this.setState({ isLoading: false })
      } else {

        if (response.data.data) {
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 700)
          const token = response.data.data.token;
          this.snap.pay(token, {
            onSuccess: function (result) {
              history.push("/");
            },
            onPending: function (result) {
              console.log('iniiiii resul', result);

              let order = result.order_id
              console.log('ooooooooooorder', order);
              console.log(order);
              history.push({
                pathname: pageUrlPaymentInfo + order,
                state: { detail: result }
              });
            },
            onError: function (result) {
              history.push("/payment-failed")
              console.log("error");
              console.log('eeeeor snap', result);
            },
            onClose: function () {
              console.log(
                "customer closed the popup without finishing the payment"
              );
            }
          });
        }
      }
    }
    catch (error) {
      setTimeout(() => {
        this.setState({ isLoading: true })
      })
      console.log(error);
    }
  };

  handleChecked = () => {
    this.setState({ jneChecked: !this.state.jneChecked });
  }

  countTotalAmount = () => {
    const subTotal = Number(this.state.quantity) * Number(this.state.priceProduct);
    let totalShippingPrice = 0;
    if (this.state.shipment === "air") {
      totalShippingPrice = Number(this.state.shipmentFee.difference) * Number(this.state.quantity);
    };
    const totalAmount = Number(this.state.priceJne)
    const total = subTotal + totalShippingPrice + totalAmount
    return total;
  }

  render() {
    const total = this.countTotalAmount();
    const { isAddressAvailable } = this.props;
    const {
      addresses,
      payloadProductDetail,
      isProductDetailAvailable,
      customerAddress,
      quantity,
      shipment,
      priceProduct,
      jneChecked
    } = this.state;
    console.log(this.state.shipmentFee.difference);

    return (
      <Spin wrapperClassName="checkoutLoading" size="large" spinning={this.state.isLoading}>
        <div className="checkout">
          <div className="container">
            <Row>
              <Col md={24}>
                <center className="checkout__ongkir">Gratis Ongkir Hingga Rp. 30,000 Dengan Belanja Minimum Rp. 200,000</center>
              </Col>
              <Col md={5}>
                <Link to="/">
                  <img
                    src={require("assets/img/monggopesen_logo.png")}
                    className="header__logo"
                    alt=""
                  />
                </Link>
              </Col>
              <Col md={15}>
                <p className="checkout__text">{strings.checkout}</p>
              </Col>
            </Row>
            <div className="checkout__content">
              <Row>
                <Col md={15} style={{ marginTop: 25 }}>
                  <AddressCheckout
                    customerAddress={customerAddress}
                    isAddressAvailable={isAddressAvailable}
                    onEditAddress={this.actionShowEditFormAddress}
                    onSelectListAddress={this.actionShowListAddress}
                    onAddAddress={this.actionShowAddFormAddress}
                  />
                  <FormAddAddress
                    visible={this.state.visibleAddAddress}
                    onSubmit={this.actionSubmitAddFormAddress}
                    onCancle={this.actionShowAddFormAddress}
                    isAddressAvailable={this.props.isAddressAvailable}
                  />
                  {customerAddress.id && (
                    <FormEditAddress
                      visible={this.state.visibleEditAddress}
                      address={customerAddress}
                      onSubmit={this.actionSubmitEditFormAddress}
                      onCancle={this.actionShowEditFormAddress}
                      cities={this.state.cities}
                      subdistricts={this.state.subdistricts}
                      handleChangeCity={this.handleChangeCity}
                    />
                  )}
                  <AddressList
                    addresses={addresses}
                    visible={this.state.visibleListAddress}
                    onCancle={this.actionShowListAddress}
                    onChangeAddress={this.actionChangeAddress}
                    customerAddress={customerAddress}
                  />
                  {isProductDetailAvailable && (
                    <OrderDetailContainer
                      shipmentFee={this.state.shipmentFee.difference}
                      stock={this.state.maxOrder}
                      priceProduct={priceProduct}
                      payloadProductDetail={payloadProductDetail}
                      actionChangeShipping={this.actionChangeShipping}
                      actionUpdateQuantity={this.actionUpdateQuantity}
                      quantity={quantity}
                      actionChangeNote={this.actionChangeNote}
                    />
                  )}
                </Col>
                <Col md={9}>
                  <OrderSummary
                    isLoading={this.state.isLoading}
                    priceJne={this.state.priceJne}
                    shipmentFee={this.state.shipmentFee.difference}
                    quantity={quantity}
                    total={total}
                    priceProduct={priceProduct}
                    shipment={shipment}
                    checked={jneChecked}
                    handleChecked={this.handleChecked}
                    onOrder={() =>
                      isAddressAvailable
                        ? this.actionSubmitOrder()
                        : this.actionShowAddFormAddress()
                    }
                  />
                </Col>
              </Row>
              {this.props.message && (
                <ModalSuccess
                  textButton={this.state.textButton}
                  modalStatus={this.props.statusModal}
                  email={this.props.message.email}
                />
              )}
            </div>
          </div>
        </div>
      </Spin>
    );
  }

}

const mapStatetoProps = state => ({
  dataAddressDefault: state.address.addressDefault,
  isAddressAvailable: state.address.isAddressAvailable,
  statusModal: state.authentication.statusModal,
  message: state.authentication.message
});

export default connect(
  mapStatetoProps,
  { addressDefault, openModal }
)(Checkout);
