import React, { Component } from "react";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import ProductAttibutes from "../../components/ProductAttributes";
import Variants from "../../containers/Variants";
import { Redirect } from "react-router-dom";
import { Row, Col, Card } from "antd";
import currencyRupiah from "../../library/currency";
import Shipping from "../../components/Shipping";
import strings from "../../localization/localization";
import ButtonQuantityContainer from "../../containers/ButtonQuantity";
import { connect } from "react-redux";
import "./style.sass";
import { apiGetWithoutToken } from "../../api/services";
import { PATH_PRODUCT } from "../../api/path";


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {},
      defaultImage: {},
      price: {},
      variants: [],
      changeCheckout: false,
      open: false,
      id: "",
      name: "",
      product: {},
      isProductAvailable: false,
      images: [],
      imageVariant: {},
      details: [],
      note: null,
      shippingInternationalId: null,
      arr: [],
      data: {
        quantity: 1,
        sku: {}
      },
      variantIsVailable: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getProductDetail();
  }

  getProductDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      const response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_BY_ID_DRAFT + productId)
      console.log(response);

      //const response = dummyProductDetail;
      const product = response.data.data;
      this.setState({
        information: product.information,
        price: product.price,
        defaultImage: product.defaultImage,
        id: product.id,
        images: product.images,
        isProductAvailable: true,
        product: product,
        variants: product.variants
      });
    } catch (error) {
      console.log(error);
    }
  };

  actionUpdateSku = sku => {
    const data = { ...this.state.data, sku };
    this.setState({ data });
  };

  actionUpdateQuantity = quantity => {
    const data = { ...this.state.data, quantity };
    this.setState({ data });
  };

  actionUpdateImageVariant = image => {
    this.setState({
      imageVariant: image
    })
  };

  actionSubmitToCheckout = () => {
    console.log(this.state.data.sku);
    if (this.props.isAuthenticated !== false) {
      if (this.state.data.quantity > this.state.information.maxOrder) {
        alert("Stock tidak cukup hanya " + this.state.information.maxOrder);
      }
      if (this.state.data.sku.length === undefined) {
        alert('Pilih Variant Yang ada')
      }
      if (this.state.data.sku.length < this.state.variants.length) {
        alert('Variant Belum Dipilih Semua')
      }
      else {
        if (this.state.data.sku.length === this.state.variants.length) {
          const {
            id,
            note,
            price,
            images,
            information,
            data,
          } = this.state
          const image = images.find(image => image.isDefault === true).defaultImage;
          const items = {
            shipmentFee: price.fee.shipmentFee,
            image,
            name: information.name,
            price: price.amount,
            productId: id,
            quantity: data.quantity,
            note,
            sku: data.sku,
            maxOrder: information.maxOrder
          }
          const indexesToLocalstorage = JSON.stringify(items);
          localStorage.setItem("product", indexesToLocalstorage);
          this.redirectCheckout();
        }
      }
    }
    else {
      this.redirectLogin();
    }
  };

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


  render() {
    console.log(this.state.variants);

    return (
      <React.Fragment>
        {this.state.isProductAvailable && (
          <React.Fragment>
            <div className="container productDetail">
              <Row>
                <Col md={10}>
                  <p className="productDetail__product-name">{this.state.information.name}</p>
                  <SliderProductDetailContainer imagess={this.state.defaultImage} images={this.state.images} imageVariant={this.state.imageVariant} />
                </Col>
                <Col md={12} offset={1}>
                  <div style={{}}>
                    <p className="productDetail__price">
                      {currencyRupiah(this.state.price.amount)}
                    </p>
                    <Variants product={this.state.product} actionUpdateImageVariant={this.actionUpdateImageVariant} actionUpdateSku={this.actionUpdateSku} />

                    <span style={{ fontSize: "18px", color: "#5d5d5d", display: "block" }}>Jumlah</span>
                    <ButtonQuantityContainer
                      stock={this.state.information.maxOrder}
                      quantity={this.state.data.quantity}
                      onChange={this.actionUpdateQuantity}
                    />
                    <Shipping priceShippment={this.state.price.fee} />
                    <button
                      className="productDetail__addCart"
                      onClick={this.actionSubmitToCheckout}
                    >
                      {strings.order_now}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ marginTop: 50 }}>
                  <Card className="product-description">
                    <h2>{strings.detail_product}</h2>
                    <ProductAttibutes
                      product={this.state.information}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            {this.state.open === true && <Redirect to={{ pathname: "/login", state: { nextPage: "/checkout" } }} />}
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

