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
import { actionAddCart, updateCartContentQty } from "../../store/actions/cart";


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
      lockAddToCartButton: false,
      propPath: {},
      skuBase: [],
      skuCore: [],
      infoRate: {}
    };
  }
  componentWillMount() {
    const productId = this.props.match.params.productId;
    apiGetProductById(productId)
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
          return null
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
          skuBase: details.skuBase,
          skuCore: details.skuCore,
          infoRate: details.infoRate,
          category: category
        };
        return productDetail;
      })
      .then(productDetail => {
        this.setState({
         ...productDetail,
          productDisplayState: !productDetail.productSalePrice
            ? "NOT_FOUND"
            : "DISPLAYING"
        });
      })
      .catch(error => {
        this.props.history.push("/notfound");
      });
  }

  updateVariants = responseVariant => {
    const variants = [...this.state.variants];
    var updatedvariant = variants;
    const result = variants.find(
      variant => variant.name === responseVariant.name
    );
    if (variants < 1) {
      updatedvariant.push({
        name: responseVariant.name,
        value: responseVariant.value.optionValText,
        imageUrl: responseVariant.value.optionValImage,
      });
    } else {
      if (result === undefined) {
        updatedvariant.push({
          name: responseVariant.name,
          value: responseVariant.value.optionValText,
          imageUrl: responseVariant.value.optionValImage,
        });
      } else {
        updatedvariant = variants.map(variant =>
          variant.name !== responseVariant.name
            ? variant
            : {
                ...variant,
                value: responseVariant.value.optionValText,
                imageUrl: responseVariant.value.optionValImage,
                valueId: responseVariant.value.optionValId
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

  compare = (a, b) => {
    const indexA = a.index;
    const indexB = b.index;
    let comparison = 0;
    if (indexA > indexB) {
      comparison = 1;
    } else if (indexA < indexB) {
      comparison = -1;
    }
    return comparison;
  };

  propPath = variants => {
    const sortVariants = variants.sort(this.compare);
    var propPath = sortVariants.reduce((accumulator, variant, index) => {
      if (index === 0) return accumulator + variant.optionId + ":" + variant.valueId;
      return accumulator + ";" + variant.optionId + ":" + variant.valueId
    }, "");
    return propPath;
  };

  onChangeQuantity = qyt => {
    let quantity = this.state.quantity;
    quantity = qyt;
    this.setState({
      quantity: quantity
    });
  };

  addToCart = () => {
    const { auth: {token}, addCart, contentQty, updateCartQty } = this.props;
    const { variants, options, productId, quantity, note } = this.state;
    if (token) {
      if (variants.length < options.length) {
        return this.setState({ variantNotificationOpen: true });
      }
      const requestAddtoCart = {
        productId,
        variants,
        quantity,
        note
      };
      addCart(requestAddtoCart, token)
        .then(_ => {
          this.setState({ productNotificationOpen: true });
          const newQty =
            contentQty == null ? 1 : contentQty + 1;
          updateCartQty(newQty);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.toggleModal();
    }
  };

  toggleModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <div className="container" style={{ marginTop: 111 }}>
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
                    {this.state.productTitle.length > 0 && (
                      <Button onClick={this.addToCart}>
                        {strings.add_to_cart}
                      </Button>
                    )}
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
                          productTitle={this.state.productTitle}
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
  contentQty : state.cart.contentQty,
  auth : state.auth
});

const mapDispatchToProps = (dispatch) => ({
  addCart : (data,token) => dispatch(actionAddCart(data,token)),
  updateCartQty: (qty) => dispatch(updateCartContentQty(qty))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
