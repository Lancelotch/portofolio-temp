import React, { Component } from "react";
import DetailPesanan from "./index";
import productDetail from "../../api/services/productDetail";
import dummyProductDetail from "../../dummy/dummyProductDetail";

class DetailPesananContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      skuId: "",
      quantity: 0,
      sku: [],
      name: "",
      price: 0,
      length: 0
    };
  }

  componentDidMount() {
    this.productDetail();
  }

  productDetail = async () => {
    const { productId, skuId, quantity } = this.getPesananDetail();
    try {
      // const res = await productDetail.getProductDetail(productId);
      const sku = res.data.sku;
      const selectedSku = sku.filter(item => item.id === skuId)[0];
      const res = await dummyProductDetail(productId);
      console.log(res.data);
      const itemProductDetail = {
        id: res.data.id,
        sku: selectedSku,
        variants: res.data.variants,
        name: res.data.name,
        details: res.data.details,
        size: 0,
        images: res.data.images,
        price: res.data.price,
        description: res.data.description,
        quantity,
        totalPrice: Number(selectedSku.price) * Number(quantity)
      };
      this.setState({
        ...itemProductDetail
      });
    } catch (error) {
      console.log(error);
    }
  };

  getPesananDetail = () => {
    const productFromLocalstorage = localStorage.getItem("product");
    const productFromLocalstorageParse = JSON.parse(productFromLocalstorage);
    return productFromLocalstorageParse;
  };

  incrementQuantity = () => {
    let { quantity, sku } = this.state;
    quantity += 1;
    this.setState({
      quantity,
      totalPrice: sku.price * quantity
    });
  };

  decrementQuantity = () => {
    let { quantity, sku } = this.state;
    quantity -= 1;
    if (quantity > 0) {
      this.setState({
        quantity,
        totalPrice: sku.price * quantity
      });
    }
  };

  onChangeQuantity= (quantity, operator) => {
    console.log("onchange quantity")
  }


  render() {
    const { productId, sku, quantity, totalPrice, name, price, length } = this.state;
    const { incrementQuantity, decrementQuantity, onChangeQuantity } = {
      incrementQuantity: this.incrementQuantity,
      decrementQuantity: this.decrementQuantity,  
      onChangeQuantity : this.onChangeQuantity 
    }; 
    return (
      <DetailPesanan
      length={length}
        name={name}
        productId={productId}
        sku={sku}
        quantity={quantity} 
        incrementCount={incrementQuantity}
        decrementCount={decrementQuantity}
        totalPrice={totalPrice}
        onChangeQuantity={onChangeQuantity}
      />
    );
  }
}

export default DetailPesananContainer;
