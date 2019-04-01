import React, { Component } from "react";
import Checkout from ".";
import productDetail from "../../api/services/productDetail"; 

export default class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      skuId: "",
      quantity: 0,
      sku: [],
      name: "",
      price: 0,
      length: 0,
      shipping: "",
      variants: [],
      warna: null,
      ukuran: null
    };
  }

  componentDidMount() {
    this.productDetail();
  }

  productDetail = async () => {
    const {
      productId,
      skuId,
      quantity,
      colorId,
      sizeId
    } = this.getPesananDetail();
    try {
      const res = await productDetail.getProductDetail(productId);
      const sku = res.data.sku;
      const selectedSku = sku.filter(item => item.id === skuId)[0];
      console.log(res.data.variants);    
      const variants = res.data.variants
      const dataUkuran = variants.filter( ukuran => ukuran.name === 'ukuran')[0].values 
      const dataWarna = variants.filter( warna => warna.name === 'warna')[0].values
      const ukuran = dataUkuran.filter(ukuran => ukuran.id === sizeId)[0]
      const warna = dataWarna.filter(warna => warna.id === colorId )[0]
      // const res = await dummyProductDetail(productId);
      console.log(res.data);
      const itemProductDetail = {
        id: res.data.id,
        sku: selectedSku,
        name: res.data.name,
        details: res.data.details,
        size: 0,
        images: res.data.images,
        price: res.data.price,
        description: res.data.description,
        quantity,
        totalPrice: Number(selectedSku.price) * Number(quantity),
        warna,
        ukuran
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

  onChangeQuantity = (quantity, operator) => {
    if (quantity > 0) {
      let { sku } = this.state;
      this.setState({
        quantity,
        totalPrice: sku.price * quantity
      });
    }
  };

  onChangeShipping = ship => {
    this.setState({
      shipping: ship
    });
  };

  render() {
    const {
      warna,
      ukuran,
      variants,
      productId,
      sku,
      quantity,
      totalPrice,
      name,
      length,
      shipping
    } = this.state;
    const { onChangeQuantity, onChangeShipping } = {
      onChangeQuantity: this.onChangeQuantity,
      onChangeShipping: this.onChangeShipping
    };
    return (
      <React.Fragment>
        {quantity > 0 && (
          <Checkout
            warna={warna}
            ukuran={ukuran}
            variants={variants}
            length={length}
            name={name}
            productId={productId}
            sku={sku}
            quantity={quantity}
            totalPrice={totalPrice}
            onChangeQuantity={onChangeQuantity}
            onChangeShipping={onChangeShipping}
            shipping={shipping}
          />
        )}
      </React.Fragment>
    );
  }
}


