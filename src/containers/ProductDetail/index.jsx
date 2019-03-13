import React, { Component } from "react"
import Header from "../../components/Header"
import SliderProductDetail from "components/SliderSecondary"
import { Col, Row, Card, Spin } from "antd"
import Variants from "../../components/Variant/Variants"
import "./style.sass"
import ButtonQuantity from "../../components/ButtonQuantity"
import dummyProductDetail from "../../dummy/dummyProductDetail"
import strings from "../../localization/localization"
import ProductAttibutes from "../../components/ProductAttributes"
import Footer from "../../components/Footer"
import currencyRupiah from "../../library/currency"
import productDetail from "../../api/services/productDetail"
import Shipping from "../../components/Shipping"

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      productId: "",
      productSalePrice: 0,
      productTitle: "",
      index: 0,
      price_changed: -1,
      size: 0,
      changed: 0,
      variants: [],
      details: [],
      productImages: [],
      lowestPrice: 0,
      sku: [],
      colorId: "01",
      sizeId: "01",
      idSize: "002",
      idColor: "001"
    };
    this.variantsRef = [];
    this.variantsRef[0] = React.createRef();
    this.variantsRef[1] = React.createRef();
  }

  async componentDidMount() {
    this.productDetail();
  }

  productDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      const res = await productDetail.getProductDetail(productId);
      // const res = await dummyProductDetail;
      const itemProductDetail = {
        productId: res.data.productId,
        sku: res.data.sku,
        variants: res.data.variants,
        productTitle: res.data.name,
        details: res.data.details,
        size: 0,
        productImages: res.data.images,
        productSalePrice: res.data.price,
        productPrice: res.data.price,
        productDescriptions: res.data.description
      };
      this.setState({
        ...itemProductDetail
      });
      let { sizeId, colorId, lowestPrice } = this.functionLowestPrice();
      this.setState({
        colorId: colorId,
        sizeId: sizeId,
        productPrice: lowestPrice
      });
      for (let i = 0; i < this.state.variants.length; i++) {
        this.variantsRef[i].current.changedInfo(colorId, sizeId);
      }
      let { idColor, idSize } = idColoridSize(res.data.variants);
      this.idVariant(res.data.sku, idColor, colorId, idSize, sizeId);
    } catch (error) {
      console.log(error);
    }
  };

  colorVariant(variants, selected, sku, productImages) {
    let { idColor, idSize } = idColoridSize(variants);
    let colorId = selected.value.id;
    let sizeId = variants[1].values[0].id;
    let stockInfo = {};
    for (let j = 0; j < sku.length; j++) {
      stockInfo[sku[j].id] = sku[j].stock;
    }
    let notZeroIndex = 0;
    for (let i = 0; i < variants[1].values.length; i++) {
      let value = variants[1].values[i];
      if (stockInfo[idColor + colorId + idSize + value.id] !== 0) {
        notZeroIndex = i;
        break;
      }
    }
    this.setState({
      changed: 1,
      productPrice: sku[0].price,
      colorId: selected.value.id
    });
    sizeId = variants[1].values[notZeroIndex].id;
    for (let j = 0; j < variants[0].values.length; j++) {
      if (variants[0].values[j].id === colorId) {
        for (let i = 0; i < productImages.length; i++) {
          if (productImages[i].large === variants[0].values[j].image.large) {
            this.setState({
              index: i
            });
          }
        }
      }
    }
    for (let i = 0; i < this.state.variants.length; i++) {
      this.variantsRef[i].current.changedInfo(colorId, sizeId);
    }
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
  }

  sizeVariant(variants, selected, sku) {
    let { idColor, idSize } = idColoridSize(variants);
    let colorId = this.state.colorId;
    let sizeId = selected.value.id;
    this.setState({
      size: 0,
      changed: 0,
      sizeId: selected.value.id
    });
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
  }

  idVariant(sku, idColor, colorId, idSize, sizeId) {
    for (let i = 0; i < sku.length; i++) {
      if (idColor + colorId + idSize + sizeId === sku[i].id) {
        this.setState({
          productPrice: sku[i].price,
          size: i
        });
      }
    }
  }

  selectVariant = selected => {
    this.setState({
      changed: 0
    });
    const { variants, sku, productImages } = this.state;
    if (selected.index === 1) {
      this.sizeVariant(variants, selected, sku);
    } else if (selected.index === 0) {
      this.colorVariant(variants, selected, sku, productImages);
    }
  };

  onChangeVariant = selected => {
    this.selectVariant(selected);
  };

  onChangeQuantity = qyt => {
    let quantity = this.state.quantity;
    quantity = qyt;
    if (this.state.sku[this.state.size].stock < quantity) {
      this.setState({
        stockAlert:
          "Current Stock: " +
          this.state.sku[this.state.size].stock +
          ". Please Reduce amount of Products."
      });
    } else {
      this.setState({
        stockAlert: ""
      });
    }
    this.setState({
      quantity: quantity
    });
  };

  functionLowestPrice() {
    let { colorId, sizeId } = "01";
    let idSize = "002";
    let idColor = "001";
    let lowestPrice = 9999999999;
    let i = 0;
    this.state.sku.map(variantLowestPrice => {
      if (
        variantLowestPrice.stock !== 0 &&
        variantLowestPrice.price < lowestPrice
      ) {
        lowestPrice = variantLowestPrice.price;
        let id = variantLowestPrice.id.substring(0, 3);
        if (id === idSize) {
          sizeId = variantLowestPrice.id.substring(3, 5);
        } else if (id === idColor) {
          colorId = variantLowestPrice.id.substring(3, 5);
        }
        id = variantLowestPrice.id.substring(5, 8);
        if (id === idSize) {
          sizeId = variantLowestPrice.id.substring(8, 10);
        } else if (id === idColor) {
          colorId = variantLowestPrice.id.substring(8, 10);
        }
      }
      i = i + 1;
    });
    return { sizeId, colorId, lowestPrice };
  }

  render() {
    const price = currencyRupiah(this.state.productPrice);
    const { match } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header match={match} />
            <div className="container productDetail">
              <Row>
                <Col md={10}>
                  <h2> {this.state.productTitle || <Spin />}</h2>
                  <SliderProductDetail
                    productImages={this.state.productImages}
                    index={this.state.index}
                  />
                </Col>
                <Col md={14}>
                  <div className="productDetail__variantContent">
                    {!this.state.productSalePrice ? (
                      <Spin />
                    ) : (
                      <p className="productDetail__price">{price}</p>
                    )}
                    {this.state.variants.map((variant, index) => (
                      <Variants
                        ref={this.variantsRef[index]}
                        key={variant.id}
                        index={index}
                        name={
                          variant.name.charAt(0).toUpperCase() +
                          variant.name.substring(1)
                        }
                        productImages={this.state.productImages}
                        values={variant.values}
                        id={variant.id}
                        changed={this.state.changed}
                        onChangeVariant={this.onChangeVariant}
                        sizeId={this.state.sizeId}
                        colorId={this.state.colorId}
                        sku={this.state.sku}
                      />
                    ))}
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={this.onChangeQuantity}
                    />
                    <p className="productDetail__stock">
                      {this.state.stockAlert}
                    </p>

                    <div className="productDetail__delivery">
                      {!this.state.productSalePrice ? (
                        <Spin />
                      ) : (
                        <p>
                          {strings.delivery_from}:{" "}
                          <b className="productDetail__china">
                            {strings.china}
                          </b>{" "}
                          {strings.delivery_to}
                        </p>
                      )}
                    </div>
                    <Shipping />
                    <button className="productDetail__addCart">
                      {strings.add_to_cart}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{ marginTop: 50 }}>
                  <Card>
                    <h2 style={{ padding: 12 }}>{strings.detail_product}</h2>
                    {Object.keys(this.state.details).map(detail => {
                      return (
                        <ProductAttibutes
                          description={this.state.details[detail]}
                          label={
                            detail.charAt(0).toUpperCase() + detail.substring(1)
                          }
                        />
                      );
                    })}
                  </Card>
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

export default ProductDetail;
function idColoridSize(variants) {
  let idColor = variants[0].id;
  let idSize = variants[1].id;
  return { idColor, idSize };
}
