import React, { Component } from "react";
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import SkuContainer from "../../containers/Sku";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import { Redirect } from "react-router-dom";
import ButtonQuantityContainer from "../../containers/ButtonQuantity";
import { Row, Col, Card } from "antd";
import currencyRupiah from "../../library/currency";
import ProductAttibutes from "../../components/ProductAttributes";
import Shipping from "../../components/Shipping";
import strings from "../../localization/localization";
import { connect } from "react-redux";
import "./style.sass";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeCheckout: false,
      open: false,
      id: "",
      name: "",
      product: {},
      isProductAvailable: false,
      images: [],
      thumbnailImage: [],
      details: [],
      note: null,
      shippingInternationalId: null,
      data: {
        quantity: 1,
        sku: 0,
        price: 0
      }
    };
  }

  componentDidMount() {
    this.getProductDetail();
  }

  getProductDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      //const response = await productDetail.getProductDetail(productId);
      const response = dummyProductDetail;
      const product = response.data;
      this.setState({
        thumbnailImage: product.images,
        name: product.name,
        price: product.price,
        id: product.id,
        images: product.images,
        product: product,
        details: product.details,
        isProductAvailable: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  actionUpdateSku = sku => {
    const { variants } = sku
    const images = variants
      .filter(variant => variant.hasOwnProperty('value') && variant.value.hasOwnProperty('image'))
      .map(variant => variant.value.image)[0]
      console.log('ini filterrr image product-detail2',variants);
      
    this.actionUpdateImages(images)
    const data = { ...this.state.data, sku };
    this.setState({
      data
    });
  };

  actionUpdateQuantity = quantity => {
    const data = { ...this.state.data, quantity };
    this.setState({ data });
  };

  actionUpdateImages = image => {
    let images = [...this.state.images]
    images.shift()
    images.unshift(image)
    this.setState({ images })
    console.log("========images", image);
  }

  redirectLogin = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  redirectCheckout = () => {
    this.setState(prevState => ({
      changeCheckout: !prevState.changeCheckout
    }));
  }

  actionSubmitToCheckout = () => {
    const {
      id,
      note,
      thumbnailImage,
      data,
      name
    } = this.state
    const image = thumbnailImage.find(image => image.isDefault === true).medium;
    const indexes = {
      image,
      name: name,
      productId: id,
      quantity: data.quantity,
      shippingInternationalId: "3knk2noib2oi22o23r",
      sku: data.sku,
      note
    }
    const indexesToLocalstorage = JSON.stringify(indexes);
    localStorage.setItem("product", indexesToLocalstorage);
    if (this.props.isAuthenticated !== false) {
      this.redirectCheckout();
    } else {
      this.redirectLogin();
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isProductAvailable && this.state.data.quantity && (
          <React.Fragment>
            <div className="container productDetail">
              <Row>
                <Col md={10}>
                  <h2>{this.state.name}</h2>
                  <SliderProductDetailContainer
                    thumbnailImage={this.state.thumbnailImage}
                    images={this.state.images} />
                </Col>
                <Col md={12} offset={2}>
                  <div style={{}}>
                    <p className="productDetail__price">
                      {currencyRupiah(this.state.data.sku.price > 1 || null ?
                        this.state.data.sku.price : this.state.price)}
                    </p>
                    <SkuContainer
                      product={this.state.product}
                      actionUpdateSku={this.actionUpdateSku}
                      actionUpdateImages={this.actionUpdateImages}
                      defaultValueSku={this.state.data.sku}
                    />
                    <ButtonQuantityContainer
                      stock={this.state.data.sku.stock}
                      quantity={this.state.data.quantity}
                      onChange={this.actionUpdateQuantity}
                    />
                    <Shipping />
                    <button
                      className="productDetail__addCart"
                      onClick={this.actionSubmitToCheckout}
                    >
                      {strings.pay_now}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ marginTop: 50 }}>
                  <Card>
                    <h2 style={{ padding: 12 }}>{strings.detail_product}</h2>
                    <ProductAttibutes
                      product={this.state.details}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            {this.state.open === true && <Redirect to={{ pathname: "/login", state: { nextPage: "checkout" } }} />}
            {this.state.changeCheckout === true && <Redirect to="/checkout" />}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(ProductDetail);
