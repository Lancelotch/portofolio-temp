import React, { Component } from "react";

import "./style.sass";

import currencyRupiah from "../../library/currency";
import productDetail from "../../api/services/productDetail";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import ProductDetail from ".";

export default class ProducDetailContainer extends Component {
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
      lowestPrice: 0,
      sku: [],
      colorId: "01",
      sizeId: "01",
      idSize: "002",
      idColor: "001"
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
      let { sizeId, colorId, lowestPrice } = this.functionLowestPrice();
      this.setState({
        colorId: colorId,
        sizeId: sizeId,
        productPrice: lowestPrice
      });
      for (let i = 0; i < this.state.variants.length; i++) {
        this.variantsRef[i].current.changedInfo(colorId, sizeId);
      }
      let { idColor, idSize } = idColoridSize(res.data.variants);
      this.idVariant(idColor, idSize);
    } catch (error) {
      console.log(error);
    }
  };

  colorVariant(variants, selected, sku, productImages) {
    let { idColor, idSize } = idColoridSize(variants);
    let colorId = selected.value.id;
    let sizeId = variants[1].values[0].id;
    let stockInfo = {};
    for (let j = 0; j < sku.length; j++) {
      stockInfo[sku[j].id] = sku[j].stock;
    }
    let notZeroIndex = 0;
    for (let i = 0; i < variants[1].values.length; i++) {
      let value = variants[1].values[i];
      if (stockInfo[idColor + colorId + idSize + value.id] !== 0) {
        notZeroIndex = i;
        break;
      }
    }
    this.setState({
      changed: 1,
      productPrice: sku[0].price,
      colorId: selected.value.id
    });
    sizeId = variants[1].values[notZeroIndex].id;
    for (let j = 0; j < variants[0].values.length; j++) {
      if (variants[0].values[j].id === colorId) {
        for (let i = 0; i < productImages.length; i++) {
          if (productImages[i].large === variants[0].values[j].image.large) {
            this.setState({
              index: i
            });
          }
        }
      }
    }
    for (let i = 0; i < this.state.variants.length; i++) {
      this.variantsRef[i].current.changedInfo(colorId, sizeId);
    }
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
  }

  sizeVariant(variants, selected, sku) {
    let { idColor, idSize } = idColoridSize(variants);
    let colorId = this.state.colorId;
    let sizeId = selected.value.id;
    this.setState({
      size: 0,
      changed: 0,
      sizeId: selected.value.id
    });
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
  }

  idVariant(sku, idColor, colorId, idSize, sizeId) {
    for (let i = 0; i < sku.length; i++) {
      if (idColor + colorId + idSize + sizeId === sku[i].id) {
        this.setState({
          productPrice: sku[i].price,
          size: i
        });
      }
    }
  }

  selectVariant = selected => {
    this.setState({
      changed: 0
    });
    const { variants, sku, productImages } = this.state;
    if (selected.index === 1) {
      this.sizeVariant(variants, selected, sku);
    } else if (selected.index === 0) {
      this.colorVariant(variants, selected, sku, productImages);
    }
  };
  
  onChangeVariant = selected => {
    this.selectVariant(selected);
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

  functionLowestPrice() {
    let { colorId, sizeId } = "01";
    let { idSize, idColor } = { idSize: "002", idColor: "001" };
    let lowestPrice = 9999999999;
    let i = 0;
    this.state.sku.map(variantLowestPrice => {
      if (
        variantLowestPrice.stock !== 0 &&
        variantLowestPrice.price < lowestPrice
      ) {
        lowestPrice = variantLowestPrice.price;
        let id = variantLowestPrice.id.substring(0, 3);
        if (id === idSize) {
          sizeId = variantLowestPrice.id.substring(3, 5);
        } else if (id === idColor) {
          colorId = variantLowestPrice.id.substring(3, 5);
        }
        id = variantLowestPrice.id.substring(5, 8);
        if (id === idSize) {
          sizeId = variantLowestPrice.id.substring(8, 10);
        } else if (id === idColor) {
          colorId = variantLowestPrice.id.substring(8, 10);
        }
      }
      i = i + 1;
    });
    return { sizeId, colorId, lowestPrice };
  }

  render() {
    const {
      productTitle,
      productImages,
      index,
      productSalePrice,
      variants,
      changed,
      sizeId,
      colorId,
      sku,
      stockAlert,
      details
    } = this.state;
    const price = currencyRupiah(this.state.productPrice);
    const { match } = this.props;
    const variantsRef = this.variantsRef;
    const onChangeVariant = this.onChangeVariant;
    const onChangeQuantity = this.onChangeQuantity;

    return (
      <React.Fragment>
        <ProductDetail
          price={price}
          match={match}
          productTitle={productTitle}
          productImages={productImages}
          index={index}
          productSalePrice={productSalePrice}
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
function idColoridSize(variants) {
  let idColor = variants[0].id;
  let idSize = variants[1].id;
  return { idColor, idSize };
}
