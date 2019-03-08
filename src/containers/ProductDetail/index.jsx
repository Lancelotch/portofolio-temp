import React, { Component } from "react";
import Header from "../../components/Header";
import SliderProductDetail from "components/SliderSecondary";
import { Col, Row, Card } from "antd";
import Variants from "../../components/Variant/Variants";
import "./style.sass";
import ButtonQuantity from "../../components/ButtonQuantity";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import strings from "../../localization/localization";
import ProductAttibutes from "../../components/ProductAttributes";
import productDetail from "../../api/services/productDetail";

class DummyProductDetail extends Component {
  constructor(props) {
    super(props);
    const res = dummyProductDetail;
    let warnaId = "01";
    let ukranId = "01";
    let idUkuran = "002";
    let idWarna = "001";
    let lowestPrice = 9999999999;
    let i = 0;
    res.data.sku.map(variant1 => {
      if (variant1.price < lowestPrice) {
        lowestPrice = variant1.price;
        let id = variant1.id.substring(0, 3);
        if (id === idUkuran) {
          ukranId = variant1.id.substring(3, 5);
        } else if (id === idWarna) {
          warnaId = variant1.id.substring(3, 5);
        }
        id = variant1.id.substring(5, 8);
        if (id === idUkuran) {
          ukranId = variant1.id.substring(8, 10);
        } else if (id === idWarna) {
          warnaId = variant1.id.substring(8, 10);
        }
      }
      i = i + 1;
    });
    console.log(ukranId);
    console.log(warnaId);
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
      sku: [],
      warnaId: warnaId,
      ukranId: ukranId,
      idUkuran: "002",
      idWarna: "001"
    };
  }

  componentDidMount() {
    this.productDetail();
  }

  productDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      // const res = await productDetail.getProductDetail(productId);
      const res = await dummyProductDetail;
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
      let warnaId = "01";
      let ukranId = "01";
      let idUkuran = "002";
      let idWarna = "001";
      let lowestPrice = 9999999999;
      let i = 0;
      res.data.sku.map(variant1 => {
        if (variant1.price < lowestPrice) {
          lowestPrice = variant1.price;
          let id = variant1.id.substring(0, 3);
          if (id === idUkuran) {
            ukranId = variant1.id.substring(3, 5);
          } else if (id === idWarna) {
            warnaId = variant1.id.substring(3, 5);
          }
          id = variant1.id.substring(5, 8);
          if (id === idUkuran) {
            ukranId = variant1.id.substring(8, 10);
          } else if (id === idWarna) {
            warnaId = variant1.id.substring(8, 10);
          }
        }
        i = i + 1;
      });
      console.log(ukranId);
      console.log(warnaId);
      let variants = res.data.variants;
      let productImages = res.data.images;
      for (let j = 0; j < variants[0].values.length; j++) {
        if (variants[0].values[j].id === warnaId) {
          for (let i = 0; i < productImages.length; i++) {
            if (productImages[i].large === variants[0].values[j].image.large) {
              this.setState({
                index: i
              });
            }
          }
        }
      }
      for (let j = 0; j < variants[1].values.length; j++) {
        if (variants[1].values[j].id === ukranId) {
          this.setState({
            size: j
          });
        }
      }
      this.setState({
        warnaId: warnaId,
        ukranId: ukranId,
        productPrice: lowestPrice
      });
    } catch (error) {
      console.log(error);
    }
  };

  selectVariant = selected => {
    this.setState({
      changed: 0
    });
    const { variants, sku, productImages } = this.state;
    if (selected.index === 1) {
      let idWarna = variants[0].id;
      let idUkuran = variants[1].id;
      let warnaId = this.state.warnaId;
      let ukranId = selected.value.id;
      this.setState({
        size: 0,
        changed: 0,
        ukranId: selected.value.id
      });
      for (let i = 0; i < sku.length; i++) {
        if (idWarna + warnaId + idUkuran + ukranId === sku[i].id) {
          //if (this.state.price_changed !== -1) {
            this.setState({
              productPrice: sku[i].price,
              size: i
            });
          //}
        }
      }
    } else if (selected.index === 0) {
      let idWarna = variants[0].id;
      let idUkuran = variants[1].id;
      let warnaId = selected.value.id;
      let ukranId = variants[1].values[0].id;
      this.setState({
        changed: 1,
        price_changed: 1,
        productPrice: sku[0].price,
        warnaId: selected.value.id,
        ukranId: variants[1].values[0].id
      });
      for (let j = 0; j < variants[0].values.length; j++) {
        if (variants[0].values[j].id == warnaId) {
          for (let i = 0; i < productImages.length; i++) {
            if (productImages[i].large === variants[0].values[j].image.large) {
              this.setState({
                index: i
              });
            }
          }
        }
      }
      for (let i = 0; i < sku.length; i++) {
        let sku_id = sku[i].id;
        if (idWarna + warnaId + idUkuran + ukranId === sku_id) {
          this.setState({
            productPrice: sku[i].price
          });
        }
      }
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

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header match={match} />
            <div className="container productDetail">
              <Row>
                <Col md={11}>
                  <h2>{this.state.productTitle}</h2>
                  <SliderProductDetail
                    productImages={this.state.productImages}
                    index={this.state.index}
                  />
                </Col>
                <Col md={13}>
                  <div className="productDetail__variantContent">
                    <p className="productDetail__price">
                      {this.state.productPrice}
                    </p>
                    {this.state.variants.map((variant, index) => (
                    <Variants
                      key={variant.id}
                      index={index}
                      name={variant.name}
                      values={variant.values}
                      id={variant.id}
                      changed={this.state.changed}
                      onChangeVariant={this.onChangeVariant}
                      ukranId={this.state.ukranId}
                      warnaId={this.state.warnaId}
                    />
                    )
                    )};
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={this.onChangeQuantity}
                    />
                    <p className="productDetail__stock">
                      {this.state.stockAlert}
                    </p>
                    <button className="productDetail__addCart">
                      {strings.add_to_cart}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <h2>Produk Terkait</h2>
                  <Card>
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
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default DummyProductDetail;
