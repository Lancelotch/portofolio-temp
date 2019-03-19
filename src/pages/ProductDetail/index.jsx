import React, { Component } from "react";

import "./style.sass";

import currencyRupiah from "../../library/currency";
import productDetail from "../../api/services/productDetail";
import dummyProductDetail from "../../dummy/dummyProductDetail";
import ProductDetail from "./ProductDetailContainer.jsx";
import _ from "lodash";

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
      const res = await productDetail.getProductDetail(productId);
      // const res = await dummyProductDetail;
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
      res.data.variants[0].values.map((value) => {
        if (value.id === colorId) {
          res.data.images.map((productValue, j) => {
            if (productValue.large === value.image.large) {
              this.setState({
                index: j
              });
            }
          });
        }
      });
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
      this.idVariant(idColor, idSize);
    } catch (error) {
      console.log(error);
    }
  };

  lowestPrice() {
    let { colorId, sizeId } = "01";
    let { idSize, idColor } = { idSize: "002", idColor: "001" };
    let lowestPrice;
    let lowest = _.chain(this.state.sku)
      .sortBy("price").map(function(value) {
        return value;
      }).head()
        .value();
    lowestPrice = lowest.price;
    let id = lowest.id.substring(0, 3);
    if (id === idSize) {
      sizeId = lowest.id.substring(3, 5);
    } else if (id === idColor) {
      colorId = lowest.id.substring(3, 5);
    }
    id = lowest.id.substring(5, 8);
    if (id === idSize) {
      sizeId = lowest.id.substring(8, 10);
    } else if (id === idColor) {
      colorId = lowest.id.substring(8, 10);
    }
    return { sizeId, colorId, lowestPrice };
  }

  colorVariant(variants, selected, sku, images) {
    let { idColor, idSize, colorId, sizeId } = {
      idColor: variants[0].id,
      idSize: variants[1].id,
      colorId: selected.value.id,
      sizeId: variants[1].values[0].id
    };
    let stockInfo = {};
    let notZeroIndex = 0;
    this.setState({
      changed: 1,
      price: sku[0].price,
      colorId: selected.value.id
    });
    sku.map(item => {
      stockInfo[item.id] = item.stock;
    });
    _.forEach(variants[1].values, function(value) {
      if (stockInfo[idColor + colorId + idSize + value.id] !== 0) {
        sizeId = value.id;
        return false;
      }
    });
    sizeId = variants[1].values[notZeroIndex].id;
    variants[0].values.map((value, i) => {
      if (value.id === colorId) {
        images.map((productValue, j) => {
          if (productValue.large === value.image.large) {
            this.setState({
              index: j
            });
          }
        });
      }
    });
    this.variantsRef.map((value, index) => {
      this.variantsRef[index].current.changedInfo(colorId, sizeId);
    });
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
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
    this.idVariant(sku, idColor, colorId, idSize, sizeId);
  }

  idVariant(sku,idColor, colorId, idSize, sizeId) {
    sku.map((value, index) => {
      if (idColor+colorId+idSize+sizeId === value.id) {
        this.setState({
          price: value.price,
          size: index
        });
      }
    });
  }

  onChangeVariant = selected => {
    this.setState({
      changed: 0
    });
    const { variants, sku, images } = this.state;
    if (selected.index === 1) {
      this.sizeVariant(variants, selected, sku);
    } else if (selected.index === 0) {
      this.colorVariant(variants, selected, sku, images);
    }
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
    const price = currencyRupiah(this.state.price);
    const { match } = this.props;
    const variantsRef = this.variantsRef;
    const onChangeVariant = this.onChangeVariant;
    const onChangeQuantity = this.onChangeQuantity;

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

