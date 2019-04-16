import React, { Component } from "react";
// import SliderProductDetailContainer from '../../containers/SliderProductDetail';
import productDetail from "../../api/services/productDetail";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import SkuContainer from "../../containers/Sku";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import ButtonQuantityContainer from "../../containers/ButtonQuantity";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isProductAvailable: false,
      sliderIndex: 0,
      images: [],
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

  // shouldComponentUpdate(nextProp, nextState){
  //     // if(nextState.data !== this.state.data){
  //     //     return false;
  //     // }else{
  //     //     return true;
  //     // }
  // }

  actionUpdateSku = sku => {
    const data = { ...this.state.data, sku };
    this.setState({ data }, this.actionSubmitToCheckout);
    // this.actionSubmitToCheckout();
  };

  actionUpdateQuantity = quantity => {
    console.log("ini button quantity", quantity);
    const data = { ...this.state.data, quantity };
    this.setState(
      {
        data
      },
      this.actionSubmitToCheckout
    );
  };

  actionUpdateImages = images => {
    images.unshift({
      images: this.state.data.sku.variants[0].value.image
    })
    this.setState({
      images: images
    })
    console.log('actionproductimages', images);
  }

  actionSubmitToCheckout = () => {
    console.log(this.state.data);
  };

  getProductDetail = async () => {
    const productId = this.props.match.params.productId;
    try {
      // const response = await productDetail.getProductDetail(productId);
      const response = dummyProductDetail;
      const product = response.data;
      this.setState({
        price: product.price,
        images: product.images,
        product: product,
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

    return (
      <React.Fragment>
        {this.state.isProductAvailable && this.state.data.quantity && (
          <React.Fragment>
            <div className="container">
              <Row>
                <Col md={8}>
                  <SliderProductDetailContainer images={this.state.images} index={this.sliderIndex} />
                </Col>
                <Col md={16}>
                  <h2>{currencyRupiah(this.state.data.sku.price)}</h2>
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
