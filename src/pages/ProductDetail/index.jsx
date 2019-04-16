import React, { Component } from "react";
// import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import SkuContainer from "../../containers/Sku";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import ButtonQuantityContainer from "../../containers/ButtonQuantity";
import { Row, Col, Card } from "antd";
import currencyRupiah from "../../library/currency";
import ProductAttibutes from "../../components/ProductAttributes";
import Shipping from "../../components/Shipping";
import strings from "../../localization/localization";
import "./style.sass";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      product: {},
      isProductAvailable: false,
      images: [],
      details: [],
      data: {
        quantity: 1,
        sku: {},
        price: 0
      }
    };
  }

  componentDidMount() {
    this.getProductDetail();
  }

  actionUpdateSku = sku => {
    const data = { ...this.state.data, sku };
    this.setState({ data }, this.actionSubmitToCheckout);
    // this.actionSubmitToCheckout();
  };

  actionUpdateQuantity = quantity => {
    console.log("ini button quantity", quantity);
    const data = { ...this.state.data, quantity };
    this.setState(
      { data }, this.actionSubmitToCheckout);
  };

  actionUpdateImages = image => {
    console.log(image);
  }

  actionSubmitToCheckout = event => {
    // event.prevenDefault();
    const quantity = this.state.data.quantity
    const { id } = this.state
    const data = {
      productId: id,
      quantity,

    }
    const indexes = JSON.stringify(data);
    console.log('localstorageeeeeeeeeee', indexes);
    console.log(this.state.data.sku);


    localStorage.setItem = ("product", indexes)
    console.log(this.state.data);
  };

  getProductDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      // const response = await productDetail.getProductDetail(productId);
      const response = dummyProductDetail;
      const product = response.data;
      this.setState({
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

  render() {
    //   if(this.state.data.sku.variants){
    //     console.log(this.state.data.sku.variants[0].value.image);
    //   }
    console.log('detailsss=product', this.state.details);

    return (
      <React.Fragment>
        {this.state.isProductAvailable && this.state.data.quantity && (
          <React.Fragment>
            <div className="container productDetail">
              <Row>
                <Col md={8}>
                  <h2>{this.state.name}</h2>
                  <SliderProductDetailContainer images={this.state.images} />
                </Col>
                <Col md={16}>
                  <div style={{ marginLeft: 50 }}>
                    <p className="productDetail__price">{currencyRupiah(this.state.data.sku.price > 1 || null ? this.state.data.sku.price : this.state.price)}</p>
                    <SkuContainer
                      product={this.state.product}
                      actionUpdateSku={this.actionUpdateSku}
                      actionUpdateImages={this.actionUpdateImages}
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ProductDetail;
