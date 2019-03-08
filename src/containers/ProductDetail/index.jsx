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
      warnaId: "01",
      ukranId: "01",
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
    } catch (error) {
      console.log(error);
    }
  };

  onChangeVariant = selected => {
    this.setState({
      changed: 0
    });
    if (selected.index === 1) {
      let idWarna = this.state.variants[0].id;
      let idUkuran = this.state.variants[1].id;
      let ukranId = selected.value.id;
      let warnaId = this.state.warnaId;
      this.setState({
        size: 0,
        changed: 0,
        ukranId: selected.value.id
      });
      for (let i = 0; i < this.state.sku.length; i++) {
        if (
          idWarna +  warnaId +  idUkuran + ukranId ===
          this.state.sku[i].id
        ) {
          if (this.state.price_changed !== -1) {
            this.setState({
              productPrice: this.state.sku[i].price,
              size: i
            });
          }
        }
      }
    } else if (selected.index === 0) {   
      let idWarna = this.state.variants[0].id;
      let idUkuran = this.state.variants[1].id;
      let warnaId = selected.value.id;
      let ukranId = this.state.variants[1].values[0].id;
      this.setState({
        changed: 1,
        price_changed: 1,
        productPrice: this.state.sku[0].price,
        warnaId: selected.value.id,
        ukranId: this.state.variants[1].values[0].id
      });
      for (let i = 0; i < this.state.sku.length; i++) {
        let sku_id = this.state.sku[i].id;      
        if (
          idWarna + warnaId + idUkuran  + ukranId ===
          sku_id
        ) {
          this.setState({
            index: i,
            productPrice: this.state.sku[i].price
          });
        }
      }
    }
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
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header />
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
                    {this.state.variants.map((variant, index) => {
                      return (
                        <Variants
                          key={variant.id}

                          index={index}
                          name={variant.name}
                          values={variant.values}
                          id={variant.id}
                          changed={this.state.changed}
                          onChangeVariant={this.onChangeVariant}
                        />
                      );
                    })}
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
