import React, { Component } from "react"
import dummyProductDetail from "../../api/dummyProductDetail"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Row, Col, Breadcrumb, Card, Button } from "antd"
import SliderProductDetail from "../../components/SliderSecondary"
import ButtonQuantity from "../../components/ButtonQuantity"
import Variants from "../../components/Variant/Variants"
import strings from "../../localization/localization";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      size: 0,
      variants: [],
    };
  }

  componentDidMount() {
    this.productDetail();
  }

  productDetail = ()=> {
    const res = dummyProductDetail;
    const productDetail = {
        productId: res.data.productId,
        productTitle: res.data.name,
        size: 0 ,
        productImages: res.data.images,    
        productPrice: res.data.price,
        productDescriptions: res.data.description
      };
      this.setState({
          ...productDetail
      })
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={24}>
            <Header/>
            <div className="container" style={{ marginTop: 230 }}>
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
                    index={this.state.index}
                    selected={this.state.selected}
                  />
                </Col>
                <Col md={9}>
                  <Card>
                    <h2>{this.state.productTitle}</h2>
                    {/* <CurrencyRp price={this.state.productPrice} /> */}
                    <p>
                        {this.state.stockAlert}
                      </p>
                    <ButtonQuantity
                      title="Jumlah"
                      quantity={1}
                      onChange={this.onChangeQuantity}
                    />
                      <Button onClick={this.addToCart}>
                        {strings.add_to_cart}
                      </Button>
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
