import React, { Component } from "react";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import productDetail from "../../api/services/productDetail";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import ProductDetail from ".";
import { chain, forEach } from "lodash";

export default class ProducDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      productId: "",
      price: 0,
      name: "",
      index: 0,
      size: 0,
      changed: 0,
      variants: [],
      details: [],
      images: [],
      sku: []
    };
    this.variantsRef = [];
    this.variantsRef[0] = React.createRef();
    this.variantsRef[1] = React.createRef();
  }

  async componentDidMount() {
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
        name: res.data.name,
        details: res.data.details,
        size: 0,
        images: res.data.images,
        price: res.data.price,
        description: res.data.description
      };
      this.setState({
        ...itemProductDetail
      });
      let { sizeId, colorId, lowestPrice } = this.lowestPrice();
      this.defaultSelectVariant(res.data.variants, colorId, res.data.images);
      this.setState({
        colorId: colorId,
        sizeId: sizeId,
        price: lowestPrice
      });
      this.variantsRef.map(variantRef =>
        variantRef.current.changedInfo(colorId, sizeId)
      );
      let { idColor, idSize } = {
        idColor: res.data.variants[0].id,
        idSize: res.data.variants[1].id
      };
      this.variantPrice(idColor, idSize);
    } catch (error) {
      console.log(error);
    }
  };

  defaultSelectVariant(variants, colorId, images) {
    variants[0].values.forEach(value => {
      if (value.id === colorId) {
        images.forEach((productValue, j) => {
          if (productValue.large === value.image.large) {
            this.setState({
              index: j
            });
          }
        });
      }
    });
  }

  lowestPrice() {
    let { colorId, sizeId } = "01";
    let { idSize, idColor } = { idSize: "002", idColor: "001" };
    let lowestPrice;
    let lowestPriceVariant = chain(this.state.sku)
      .sortBy("price")
      .map(function(value) {
        return value;
      })
      .head()
      .value();
    lowestPrice = lowestPriceVariant.price;
    let id = lowestPriceVariant.id.substring(0, 3);
    if (id === idSize || idColor) {
      (sizeId = lowestPriceVariant.id.substring(3, 5)) &&
        (colorId = lowestPriceVariant.id.substring(3, 5));
    }
    id = lowestPriceVariant.id.substring(5, 8);
    if (id === idSize || idColor) {
      (sizeId = lowestPriceVariant.id.substring(8, 10)) &&
        (colorId = lowestPriceVariant.id.substring(8, 10));
    }
    return { sizeId, colorId, lowestPrice };
  }

  colorVariant(variants, selected, sku, images) {
    let { idColor, idSize, colorId, sizeId, notZeroIndex, stockInfo } = {
      idColor: variants[0].id,
      idSize: variants[1].id,
      colorId: selected.value.id,
      sizeId: variants[1].values[0].id,
      stockInfo: {},
      notZeroIndex: 0
    };
    this.setState({
      changed: 1,
      price: sku[0].price,
      colorId: selected.value.id
    }); 
    sku.map(item => {
      return (stockInfo[item.id] = item.stock);
    });
    const variantSize = this.state.variants[1];
    forEach(variantSize.values, function(value, i) {
      if (stockInfo[`${idColor}${colorId}${idSize}${value.id}`] !== 0) {
        notZeroIndex = i;
        return false;
      }
    });
    sizeId = variants[1].values[notZeroIndex].id;
    this.defaultSelectVariant(variants, colorId, images);
    this.variantsRef.map((value, index) => {
      return this.variantsRef[index].current.changedInfo(colorId, sizeId);
    });
    this.variantPrice(sku, idColor, colorId, idSize, sizeId);
  }

  sizeVariant(variants, selected, sku) {
    let { idColor, idSize, colorId, sizeId } = {
      idColor: variants[0].id,
      idSize: variants[1].id,
      colorId: this.state.colorId,
      sizeId: selected.value.id
    };  
    this.setState({
      size: 0,
      changed: 0,
      sizeId: selected.value.id
    });
    this.variantPrice(sku, idColor, colorId, idSize, sizeId);
  }

  variantPrice(sku, idColor, colorId, idSize, sizeId) {
    sku.forEach((value, index) => {
      if (`${idColor}${colorId}${idSize}${sizeId}` === value.id) {
        this.setState({
          price: value.price,
          size: index
        });
      }
    });
  }

  onChangeVariant = selected => {
    const { variants, sku, images } = this.state;
    if (selected.index === 1) {
      this.sizeVariant(variants, selected, sku);
    } else if (selected.index === 0) {
      this.colorVariant(variants, selected, sku, images);
    }
  };

  addCheckout = () => {
    const token = localStorage.getItem('accessToken');
    if(token !== null){
      
    }
  }

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
    const {
      name,
      images,
      index,
      variants,
      changed,
      sizeId,
      colorId,
      sku,
      stockAlert,
      details
    } = this.state;
    const { price, match, variantsRef, onChangeVariant, onChangeQuantity } = {
      match: this.props,
      variantsRef: this.variantsRef,
      onChangeVariant: this.onChangeVariant,
      onChangeQuantity: this.onChangeQuantity,
      price: currencyRupiah(this.state.price)
    };
    return (
      <React.Fragment>
        <ProductDetail
          price={price}
          match={match}
          name={name}
          images={images}
          index={index}
          variants={variants}
          variantsRef={variantsRef}
          changed={changed}
          onChangeVariant={onChangeVariant}
          sizeId={sizeId}
          colorId={colorId}
          sku={sku}
          onChangeQuantity={onChangeQuantity}
          stockAlert={stockAlert}
          details={details}
        />
      </React.Fragment>
    );
  }
}
