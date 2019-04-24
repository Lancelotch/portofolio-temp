import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import FormAddAddress from "../../containers/FormAddAddress";
import { addressDefault } from "../../store/actions/address";
import { postService, getService } from "../../api/services";
import { PATH_CUSTOMER, PATH_ORDER } from "../../api/path";
import { AddressCheckout } from "../../components/AddressCheckout";
import FormEditAddress from "../../containers/FormEditAddress";
import AddressList from "../../containers/AddressList";
import OrderDetailContainer from "../../containers/OrderDetail";
import OrderSummary from "../../components/OrderSummary";
import strings from "../../localization/localization";
import payloadProductDetail from "../../dummy/payloadProductDetail";

import "./style.sass";

class Checkout extends Component {
  constructor() {
    super();
    localStorage.setItem(
      "payloadProductDetail",
      JSON.stringify(payloadProductDetail)
    );
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
      isProductDetailAvailable: false
    };
  }

  componentDidMount() {
    this.props.addressDefault();
    this.getListAddress();
    this.getPayloadProductDetail();
  }

  variantsRequest = variants => {
    const variantsRequest = [];
    variants.map(variant => {
      variantsRequest.push({
        variantId: variant.variantId,
        idValue: variant.value.id
      });
    });
    return variantsRequest;
  };

  getPayloadProductDetail = () => {
    const payloadProductDetail = JSON.parse(
      localStorage.getItem("payloadProductDetail")
    );
    this.setState({
      isProductDetailAvailable: true,
      customerAddress: this.props.dataAddressDefault,
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
      const response = await getService(PATH_CUSTOMER.ADDRESS);
      this.setState({
        addresses: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  showAddFormAddress = () => {
    this.setState(prevState => ({
      visibleAddAddress: !prevState.visibleAddAddress
    }));
  };

  showEditFormAddress = () => {
    this.setState(prevState => ({
      visibleEditAddress: !prevState.visibleEditAddress
    }));
  };

  showListAddress = () => {
    this.setState(prevState => ({
      visibleListAddress: !prevState.visibleListAddress
    }));
  };

  handleSubmitAddFormAddress = async request => {
    try {
      const response = await postService(PATH_CUSTOMER.ADDRESS, request);
      this.getListAddress();
      this.showAddFormAddress();
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmitEditFormAddress = async request => {
    try {
      const response = await postService(PATH_CUSTOMER.ADDRESS, request);
      this.showEditFormAddress();
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
      visibleListAddress: !prevState.visibleListAddress
    }));
  };

  onSubmitOrder = async () => {
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
      const response = await postService(PATH_ORDER.ORDER, request);
      console.log(response);
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
          <Row>
            <Col md={15}>
              <AddressCheckout
                customerAddress={customerAddress}
                isAddressAvailable={isAddressAvailable}
                onEditAddress={this.showEditFormAddress}
                onSelectListAddress={this.showListAddress}
                onAddAddress={this.showAddFormAddress}
              />
              <FormAddAddress
                visible={this.state.visibleAddAddress}
                onSubmit={this.handleSubmitAddFormAddress}
                onCancle={this.showAddFormAddress}
              />
              {isAddressAvailable && (
                <FormEditAddress
                  visible={this.state.visibleEditAddress}
                  address={customerAddress}
                  onSubmit={this.handleSubmitEditFormAddress}
                  onCancle={this.showEditFormAddress}
                />
              )}
              <AddressList
                addresses={addresses}
                visible={this.state.visibleListAddress}
                onCancle={this.showListAddress}
                onChangeAddress={this.actionChangeAddress}
              />
              {isProductDetailAvailable && (
                <OrderDetailContainer
                  payloadProductDetail={payloadProductDetail}
                  onChangeShipping={this.actionChangeShipping}
                  onChangeQuantity={this.actionChangeQuantity}
                  onChangeNote={this.actionChangeNote}
                />
              )}
            </Col>
            <Col md={9}>
              <OrderSummary
                quantity={quantity}
                priceProduct={priceProduct}
                viaRoute={shipping}
                onOrder={this.onSubmitOrder}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  dataAddressDefault: state.address.addressDefault,
  isAddressAvailable: state.address.isAddressAvailable
});

export default connect(
  mapStatetoProps,
  { addressDefault }
)(Checkout);
