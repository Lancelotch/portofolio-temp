import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SliderSecondary from "../../components/SliderSecondary/SliderSecondary";
import { Col, Row } from "antd";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variants: [],
      details: {},
      productDisplayState: 'SKELETON',
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
      propPath : {},
      skuBase : [],
      skuCore : [],
      infoRate : {}
    };
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <div className="container">
              <Row>
                <Col md={18}>
                  <SliderSecondary />
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
