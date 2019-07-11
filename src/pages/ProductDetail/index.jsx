import React, { Component } from "react";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import ProductAttibutes from "../../components/ProductAttributes";
import Variants from "../../containers/Variants";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, notification } from "antd";
import currencyRupiah from "../../library/currency";
import Shipping from "../../components/Shipping";
import strings from "../../localization/localization";
import ButtonQuantityContainer from "../../containers/ButtonQuantity";
import { connect } from "react-redux";
import "./style.sass";
import { apiGetWithoutToken } from "../../api/services";
import { PATH_PRODUCT } from "../../api/path";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const categoryTextResult = (stock) => strings.formatString(
  strings.product_detail_info_stock,
  <b style={{ color: "#FF416C" }}> &nbsp;{stock}</b>
);


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
        sku: {}
      },
      quantity: 1,
      variantIsVailable: false,
      isUpdateImageVariant: false,
      infoQuantity: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getProductDetail();
  }

  checkStockAvailability = (stock) => {
    if (this.state.quantity === this.state.information.maxOrder) {
      let notif = notification["info"]({
        message: categoryTextResult(this.state.information.maxOrder),
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });
      this.setState(prevState => ({
        quantity: stock,
        text: notif
      })
      )
    }
  }

  checkStockQuantity = () => {
    if (this.state.quantity === 0 || this.state.quantity === "") {
      this.setState({
        infoQuantity: "Quantity Jangan Kosong"
      })
    }
  }

  getProductDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      const response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_BY_ID_DRAFT + productId)
      console.log("ini respon", response);

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
    this.setState({
      quantity: quantity,
      isUpdateImageVariant: false
    });
  };

  actionUpdateImageVariant = image => {
    this.setState({
      imageVariant: image,
      isUpdateImageVariant: true
    })
  };

  actionSubmitToCheckout = () => {
    const {
      id,
      note,
      price,
      images,
      data,
      information,
      quantity,
    } = this.state
    const image = images.find(image => image.isDefault === true).defaultImage;
    const items = {
      shipmentFee: price.fee.shipmentFee,
      image,
      name: information.name,
      price: price.amount,
      productId: id,
      quantity: quantity,
      note,
      sku: data.sku,
      maxOrder: information.maxOrder
    }
    const indexesToLocalstorage = JSON.stringify(items);
    localStorage.setItem("product", indexesToLocalstorage);
    if (this.state.variants.length > 0) {
      if (this.state.data.sku.length === undefined) {
        alert('Variant Belum Dipilih')
      } else {
        if (this.state.data.sku.length < this.state.variants.length) {
          alert('Variant Belum Dipilih Semua')
        } else {
          if (this.props.isAuthenticated !== false) {
            if (this.state.data.quantity > this.state.information.maxOrder) {
              alert("Stock tidak cukup hanya " + this.state.information.maxOrder);
            } else {
              if (this.state.quantity === 0 || this.state.quantity === "") {
                alert('quantity tidak boleh 0')
              } else {
                this.redirectCheckout();
              }
            }
          } else {
            this.redirectLogin();
          }
        }
      }
    } else if (this.state.variants.length < 1) {
      if (this.props.isAuthenticated !== false) {
        if (this.state.quantity === 0 || this.state.quantity === "") {
          alert('quantity tidak boleh 0')
        } else {
          this.redirectCheckout();
        }
      } else {
        this.redirectLogin();
      }
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
          <div className="container productDetail">
            <Row>
              <Col md={10}>
                <p className="productDetail__product-name">{this.state.images.length < 1 ? <Skeleton height={20} /> : this.state.information.name}</p>
                {this.state.images.length < 1 ? <Skeleton height={300} /> :
                  <SliderProductDetailContainer isUpdateImageVariant={this.state.isUpdateImageVariant} imageDefault={this.state.defaultImage} images={this.state.images} imageVariant={this.state.imageVariant} />}
              </Col>
              <Col md={12} offset={1}>
                <div style={{}}>
                  <p className="productDetail__price">
                    {this.state.images.length < 1 ? <Skeleton height={25} /> : (currencyRupiah(this.state.price.amount))}
                  </p>
                  {this.state.images.length < 1 ? <Skeleton height={25} width={200} /> :
                    <Variants product={this.state.product} actionUpdateImageVariant={this.actionUpdateImageVariant} actionUpdateSku={this.actionUpdateSku} />}
                  {this.state.images.length < 1 ?
                    <div style={{ marginTop: 10 }}>
                      <Skeleton height={40} width={200} />
                    </div>
                    :
                    <React.Fragment>
                      <span style={{ fontSize: "18px", color: "#5d5d5d", display: "block" }}>Jumlah</span>
                      <ButtonQuantityContainer
                        stock={this.state.information.maxOrder}
                        quantity={this.state.quantity}
                        actionUpdateQuantity={this.actionUpdateQuantity}
                        incrementItem={this.incrementItem}
                        decrementItem={this.decrementItem}
                        infoQuantity={this.state.infoQuantity}
                      />
                    </React.Fragment>
                  }
                  {this.state.isProductAvailable && (
                    <Shipping priceShippment={this.state.price.fee} />)}
                  {this.state.images.length < 1 ?
                    <div style={{ marginTop: 55 }}>
                      <Skeleton height={40} width={350} />
                    </div> :
                    <button
                      className="productDetail__addCart"
                      onClick={this.actionSubmitToCheckout}
                    >
                      {strings.order_now}
                    </button>
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={24} style={{ marginTop: 50 }}>
              {this.state.isProductAvailable && 
                <Card className="product-description">
                  <h2>{strings.detail_product}</h2>
                
                    <ProductAttibutes
                      product={this.state.information}
                    />
                </Card>}
              </Col>
            </Row>
          </div>
          {this.state.open === true && <Redirect to={{ pathname: "/login", state: { nextPage: "/checkout" } }} />}
          {this.state.changeCheckout === true && <Redirect to={{ pathname: "/checkout", state: { nextPage: "/checkout" } }} />}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(ProductDetail);

