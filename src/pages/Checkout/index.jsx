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
      shipping: {},
      variants: [],
      productSkuId: "",
      quantity: 1,
      note: "",
      isProductDetailAvailable: false,
      textButton: "Lanjut Belanja",
      cities: [],
      subdistricts: [],
      jneChecked: false,
      totalAmount: 0
    };
  }

  snap = window.snap;

  componentDidMount() {
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
    this.setState({
      isProductDetailAvailable: true,
      productId: payloadProductDetail.productId,
      priceProduct: payloadProductDetail.price,
      payloadProductDetail: { ...payloadProductDetail },
      variants: this.variantsRequest(payloadProductDetail.sku),
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
      productId,
    } = this.state;
    // const totalAmount = this.actionChangeTotalAmount().amounts
    const request = {
      customerAddressId: customerAddress.id,
      amount: this.actionChangeTotalAmount(),
      items: [
        {
          productId: productId,
          shipment: shipping.via,
          variants: variants,
          quantity: quantity,
          note: note
        }
      ]
    };
    console.log(this.state.shipping.via);
    try {
      const response = await apiPostWithToken(PATH_ORDER.ORDER, request);
      console.log(response);
      
      if (response.data.data) {
        const token = response.data.data.token;
        this.snap.pay(token, {
          onSuccess: function (result) {
            history.push("/");
          },
          onPending: function (result) {
            let order = result.order_id
            console.log('ooooooooooorder',order);
            
            console.log(order);
            history.push({
              pathname: pageUrlPaymentInfo + order,
              state: { detail: result }
            });
          },
          onError: function (result) {
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
    } catch (error) {
      console.log(error);
    }
  };

  handleChecked = () => {
    this.setState({ jneChecked: !this.state.jneChecked });
  }

  actionChangeTotalAmount() {
    const subTotal = this.state.priceProduct * this.state.quantity;
    const totalViaRoutePrice = this.state.shipping.price * this.state.quantity;
    const total = subTotal + totalViaRoutePrice;
    return total;
  }


  render() {
    const total = this.actionChangeTotalAmount();
    const { isAddressAvailable } = this.props;
    const {
      addresses,
      payloadProductDetail,
      isProductDetailAvailable,
      customerAddress,
      quantity,
      shipping,
      priceProduct,
      jneChecked
    } = this.state;
    return (
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
                    priceProduct={priceProduct}
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
                  total={total}
                  priceProduct={priceProduct}
                  viaRoute={shipping}
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
