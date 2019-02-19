import React, { Component } from "react";
import dummyProductDetail from "../../api/dummyProductDetail";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  productDetail = ()=> {
    const res = dummyProductDetail;
    const productDetail = {
        productId: res.data.productId,
        productTitle: res.data.name,
        ukuran: 0 ,
        productImages: res.data.images,
        productSalePrice: res.data.price,
        productPrice: res.data.price,
        productDescriptions: res.data.description
      };
      this.setState({
          ...productDetail
      })
  }

  render() {
    return <React.Fragment/>;
  }
}

export default ProductDetail;
