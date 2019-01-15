import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SliderProductDetail from "components/SliderSecondary/SliderSecondary";
import { Col, Row, Card, Breadcrumb, Button } from "antd";
import { apiGetProductById } from "../../api/services/ServiceProductDetail";
import Variants from "../../components/Variant/Variants";
import strings from "../../config/localization";
import ProductAttributes from "components/Typography/productAttibutes";
import ProductDescription from "components/ProductDescription/ProductDescription";
import CurrencyRp from "components/Typography/CurrencyRp";
import "./style.sass";
import ButtonQuantity from "../../components/ButtonQuantity/ButtonQuantity";
import { apiAddToCart } from "../../api/services/ServiceCart";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variants: [],
      details: {},
      productDisplayState: "SKELETON",
      productId: "",
      options: [],
      productAttributes: [],
      productImages: [],
      productSalePrice: 0,
      productTitle: "",
      note: "",
      productDescriptions: [],
      open: false,
      productNotificationOpen: false,
      variantNotificationOpen: false,
      category: "",
      lockAddToCartButton: false
    };
  }
  
  componentWillMount() {
    const productId = this.props.match.params.productId;
    const response = apiGetProductById(productId)
      .then(res => {
        var details = JSON.parse(decodeURIComponent(res.data.details));
        const category = res.data.category.indonesian;
        var productPriceIdr = "";
        if (details.resp) {
          details = details.resp;
        }
        details.productSalePrice.map(productPrice => {
          if (productPrice.price.code === "IDR") {
            productPriceIdr = productPrice.price.value;
          }
        });
        var productSalePrice = productPriceIdr;
        const productDetail = {
          productId: res.data.productId,
          productTitle: details.productTitle,
          options: details.options,
          productAttributes: details.productAttributes,
          productImages: details.productImages,
          productSalePrice: productSalePrice,
          productDescriptions: details.productDescription,
          // skuBase: details.skuBase,
          // skuCore: details.skuCore,
          // infoRate: details.infoRate,
          category: category
        };
        return productDetail;
      })
      .then(productDetail => {
        this.setState({
          category: productDetail.category,
          productId: productDetail.productId,
          productTitle: productDetail.productTitle,
          options: productDetail.options,
          productAttributes: productDetail.productAttributes,
          productImages: productDetail.productImages,
          productDescriptions: productDetail.productDescriptions,
          productSalePrice: productDetail.productSalePrice,
          // skuBase: productDetail.skuBase,
          // skuCore: productDetail.skuCore,
          // infoRate: productDetail.infoRate,
          productDisplayState: !productDetail.productSalePrice
            ? "NOT_FOUND"
            : "DISPLAYING"
        });
      })
      .catch(error => {
        this.props.history.push("/notfound");
      });
  }

  toggleModal() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      lockAddToCartButton: false,
      open: !this.state.open
    });
  }

  handleProductNotificationClose() {
    this.setState({
      lockAddToCartButton: false,
      productNotificationOpen: !this.state.productNotificationOpen
    });
  }

  handleVariantNotificationClose() {
    this.setState({
      lockAddToCartButton: false,
      variantNotificationOpen: !this.state.variantNotificationOpen
    });
  }

  updateVariants = responseVariant => {
    const variants = [...this.state.variants];
    var updatedvariant = variants;
    const result = variants.find(
      variant => variant.name == responseVariant.name
    );
    if (variants < 1) {
      updatedvariant.push({
        name: responseVariant.name,
        value: responseVariant.value.optionValText,
        imageUrl: responseVariant.value.optionValImage
      });
    } else {
      if (result === undefined) {
        updatedvariant.push({
          name: responseVariant.name,
          value: responseVariant.value.optionValText,
          imageUrl: responseVariant.value.optionValImage
        });
      } else {
        updatedvariant = variants.map(
          variant =>
            variant.name !== responseVariant.name
              ? variant
              : {
                  ...variant,
                  value: responseVariant.value.optionValText,
                  imageUrl: responseVariant.value.optionValImage
                }
        );
      }
    }
    this.setState({
      variants: updatedvariant
    });
  };

  onChangeVariant = selected => {
    const productImages = [...this.state.productImages];
    this.updateVariants(selected);
    if (selected.value.optionValImage.length > 0) {
      productImages.shift();
      productImages.unshift({
        small: selected.value.optionValImage,
        medium: selected.value.optionValImage.replace("100x100", "300x300"),
        big: selected.value.optionValImage.replace("100x100", "800x800")
      });
      this.setState({
        productImages: productImages
      });
    }
  };

  onChangeQuantity = qyt => {
    let quantity = this.state.quantity;
    quantity = qyt;
    this.setState({
      quantity: quantity
    });
  };

  addToCart = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      if (this.state.variants.length < this.state.options.length) {
        return this.setState({ variantNotificationOpen: true });
      }

      const state = { ...this.state };
      const requestAddtoCart = {
        productId: state.productId,
        variant: state.variants,
        quantity: state.quantity,
        note: state.note
      };
      apiAddToCart(requestAddtoCart)
        .then(res => {
          console.log(res);
          this.setState({ productNotificationOpen: true });

          const newQty = this.props.cartContentQty + state.quantity;
          this.props.updateCartContentQty(newQty);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.toggleModal();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <div className="container" style={{ marginTop: "111px" }}>
              <Row>
                <Col md={15}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/">{strings.monggoPesen}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="{this.state.linkProductDetail}">
                        {this.state.category}
                      </a>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <SliderProductDetail
                    productImages={this.state.productImages}
                  />
                </Col>
                <Col md={9}>
                  <Card>
                    <h2>{this.state.productTitle}</h2>
                    <CurrencyRp price={this.state.productSalePrice} />
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={this.onChangeQuantity}
                    />
                   
                      <Button onClick={this.addToCart}>
                        {strings.add_to_cart}
                      </Button>
                  
                    {this.state.options !== undefined &&
                      this.state.options.map((option, index) => {
                        return (
                          <Variants
                            key={option.optionId}
                            index={index}
                            optionType={option.optionType}
                            optionValue={option.optionValue}
                            optionId={option.optionId}
                            onChangeVariant={this.onChangeVariant}
                          />
                        );
                      })}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <h4 className="deskripsi-produk-text">
                    {strings.product_detail_description}
                  </h4>
                  <ProductAttributes
                    productAttributes={this.state.productAttributes}
                  />
                  <React.Fragment>
                    {this.state.productDescriptions.length > 0 &&
                      this.state.productDescriptions[0] !== null && (
                        <ProductDescription
                          productDescriptions={this.state.productDescriptions}
                        />
                      )}
                  </React.Fragment>
                </Col>
              </Row>
            </div>
            <Footer />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartContentQty: state.cartContentQty
});

const mapDispatchToProps = dispatch => {
  return {
    updateCartContentQty: qty =>
      dispatch({ type: `UPDATE_CART_CONTENT_QTY`, payload: qty })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
