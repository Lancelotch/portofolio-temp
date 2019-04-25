import React, { Component } from "react";
import Checkout from ".";
import productDetail from "../../api/services/productDetail"; 
import { connect } from "react-redux";
import { addressDefault } from '../../store/actions/address';
import { AddOrder } from "../../api/services/order";

class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      shipping: "",
      warna: null,
      ukuran: null,
      visible: false,
      note: ""
    };
  }

  componentDidMount() {
    this.orderDetails();
  }

  orderDetails = async () => {
    const {
      productId,
      skuId,
      quantity,
      colorId,
      sizeId
    } = this.getOrderDetails();
    try {
      const res = await productDetail.getProductDetail(productId);
      const sku = res.data.sku;
      const selectedSku = sku.filter(item => item.id === skuId)[0];
      console.log(res.data.variants);
      const variants = res.data.variants;
      const dataUkuran = variants.filter(ukuran => ukuran.name === "ukuran")[0]
        .values;
      const dataWarna = variants.filter(warna => warna.name === "warna")[0]
        .values;
      const ukuran = dataUkuran.filter(ukuran => ukuran.id === sizeId)[0];
      const warna = dataWarna.filter(warna => warna.id === colorId)[0];
      // const res = await dummyProductDetail(productId);
      console.log("checcccckouuuut", res.data);
      const itemOderDetails = {
        productId: productId,
        sku: selectedSku,
        name: res.data.name,
        size: 0,
        price: res.data.price,
        quantity,
        totalPrice: Number(selectedSku.price) * Number(quantity),
        warna,
        ukuran
      };
      this.setState({
        ...itemOderDetails
      });
    } catch (error) {
      console.log(error);
    }
  };

  getOrderDetails = () => {
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

  onOrder = async ()=> {
    const {productId,shipping, warna, ukuran, sku, quantity, note} = this.state;
    if(!this.props.isAddressAvailable){
      this.isAddVisible();
    }else{
      // console.log(this.props.dataAddressDefault);
      // console.log(this.state);
      const customerAddressId = this.props.dataAddressDefault.id;
      const request = {
        customerAddressId: customerAddressId,
        indexes: [{
          productId: productId,
          shippingInternationalId: shipping.id,
          variants: [{
            variantId: "001",
            variantValue: "01"
          },{
            variantId: "002",
            variantValue: "02"
          }],
          productSkuId: sku.id,
          quantity: quantity,
          note: note
        }]
      }
      try{
        const response = await AddOrder(request);
        window.location.assign(response.data.redirect_url);
        console.log(response.data.redirect_url);
        
      }catch(error){
        console.log(error);
      }
    }
  }

  handleCancel = () => {
    this.isAddVisible()
  };

  isAddVisible = () =>{ 
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }

  getAddressDefault = () => {
    this.props.addressDefault();
  };

  render() {
    const {
      productId,
      warna,
      ukuran,
      quantity,
      totalPrice,
      name,
      shipping,
      visible
    } = this.state;
    const { onChangeQuantity, onChangeShipping } = {
      onChangeQuantity: this.onChangeQuantity,
      onChangeShipping: this.onChangeShipping
    };
    console.log("state", this.state);
    
    return (
      <React.Fragment>
        {quantity > 0 && (
          <Checkout
            productId={productId}
            warna={warna}
            ukuran={ukuran}
            name={name}
            quantity={quantity}
            totalPrice={totalPrice}
            onChangeQuantity={onChangeQuantity}
            onChangeShipping={onChangeShipping}
            shipping={shipping}
            visibleAddress={visible}
            onCancelAddress = {this.handleCancel}
            onSubmitAddress = {this.getAddressDefault}
            onOrder={this.onOrder}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => ({
  dataAddressDefault: state.address.addressDefault,
  isAddressAvailable: state.address.isAddressAvailable
});

export default connect(
  mapStatetoProps,
  { addressDefault }
)(CheckoutContainer);
