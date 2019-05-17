import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import FormAddAddress from "../../containers/FormAddAddress";
import { addressDefault } from "../../store/actions/address";
import {
  apiPostWithToken,
  apiGetWithToken,
  apiPutWithToken
} from "../../api/services";
import { PATH_CUSTOMER, PATH_ORDER } from "../../api/path";
import { AddressCheckout } from "../../components/AddressCheckout";
import FormEditAddress from "../../containers/FormEditAddress";
import AddressList from "../../containers/AddressList";
import OrderDetailContainer from "../../containers/OrderDetail";
import OrderSummary from "../../components/OrderSummary";
import strings from "../../localization/localization";
import ModalSuccess from '../../modal/ModalRegisterSuccess'
import {openModal} from "../../store/actions/authentication"

import "./style.sass";
import history from "../../routers/history";

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
      shipping: {},
      variants: [],
      productSkuId: "",
      quantity: 1,
      note: "",
      isProductDetailAvailable: false,
      textButton: "Lanjut Belanja",
      cities: [],
      subdistricts: []
    };
  }

  snap = window.snap;

  componentDidMount() {
    this.props.addressDefault();
    this.getListAddress();
    this.getPayloadProductDetail();
    this.initCustomerAddress();
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

  initCustomerAddress = () => {
    this.setState(
      {
        customerAddress: this.props.dataAddressDefault
      },
      () => {
        this.getCities(this.state.customerAddress.provinceId);
        this.getSubdistrict(this.state.customerAddress.cityId);
      }
    );
  };

  variantsRequest = variants => {
    const variantsRequest = [];
    variants.forEach(variant => {
      variantsRequest.push({
        variantId: variant.variantId,
        idValue: variant.value.id
      });
    });
    return variantsRequest;
  };

  getPayloadProductDetail = () => {
    const payloadProductDetail = JSON.parse(localStorage.getItem("product"));
    this.setState({
      isProductDetailAvailable: true,
      productId: payloadProductDetail.productId,
      priceProduct: payloadProductDetail.sku.price,
      payloadProductDetail: { ...payloadProductDetail },
      variants: this.variantsRequest(payloadProductDetail.sku.variants),
      productSkuId: payloadProductDetail.sku.id,
      quantity: payloadProductDetail.quantity,
      note: payloadProductDetail.note
    });
  };

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

  actionChangeShipping = shipping => {
    this.setState({
      shipping: shipping
    });
  };

  actionChangeQuantity = quantity => {
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
    const {
      variants,
      customerAddress,
      shipping,
      quantity,
      note,
      productSkuId,
      productId
    } = this.state;
    const request = {
      customerAddressId: customerAddress.id,
      indexes: [
        {
          productId: productId,
          shippingInternationalId: shipping.id,
          variants: variants,
          productSkuId: productSkuId,
          quantity: quantity,
          note: note
        }
      ]
    };
    try {
      const response = await apiPostWithToken(PATH_ORDER.ORDER, request);
      if (response.data.data) {
        const token = response.data.data.token;
        this.snap.pay(token, {
          onSuccess: function(result) {
            history.push("/");
          },
          onPending: function(result) {
            history.push({
              pathname: "/payment-info",
              state: { detail: result }
            });
            console.log("...", result);
          },
          onError: function(result) {
            console.log("error");
            console.log(result);
          },
          onClose: function() {
            console.log(
              "customer closed the popup without finishing the payment"
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isAddressAvailable } = this.props;
    const {
      addresses,
      payloadProductDetail,
      isProductDetailAvailable,
      customerAddress,
      quantity,
      shipping,
      priceProduct
    } = this.state;
    return (
      <div className="checkout">
        <div className="container">
          <Row>
            <Col md={5}>
              <a href="/">
                <img
                  src={require("assets/img/monggopesen_logo.png")}
                  className="header__logo"
                  alt=""
                />
              </a>
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
                {isAddressAvailable && (
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
                    payloadProductDetail={payloadProductDetail}
                    onChangeShipping={this.actionChangeShipping}
                    onChangeQuantity={this.actionChangeQuantity}
                    quantity={quantity}
                    onChangeNote={this.actionChangeNote}
                  />
                )}
              </Col>
              <Col md={9}>
                <OrderSummary
                  quantity={quantity}
                  priceProduct={priceProduct}
                  viaRoute={shipping}
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
