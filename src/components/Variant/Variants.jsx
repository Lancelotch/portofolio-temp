import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Variant from ".";

class Variants extends Component {
  constructor(props) {
    super(props);
    let selected = this.variantDefault(this.props.colorId, this.props.sizeId);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      values: this.props.values,
      productImages: this.props.productImages,
      id: this.props.id,
      changed: this.props.changed,
      colorId: this.props.colorId,
      sizeId: this.props.sizeId,
      sku: this.props.sku,
      variantSelected: selected
    };
    let sku = this.props.sku;
    this.stockInfo = {};
    for (let j = 0; j < sku.length; j++) {
      this.stockInfo[sku[j].id] = sku[j].stock;
    }
    this.variantsRef = [];
    for (let i = 0; i < this.state.values.length; i++)
      this.variantsRef[i] = React.createRef();
  }

  changedInfo = (colorId, sizeId) => {
    this.setState({
      colorId: colorId,
      sizeId: sizeId
    });
    let selected = this.variantDefault(colorId, sizeId);
    this.setState({
      variantSelected: selected,
      selectedValue: selected.description.substring(5)
    });
    if (this.state.index === 1) {
      this.setState({
        selectedValue: ""
      });
    }
  };

  onChangeVariant = selected => {
    this.setState(
      {
        variantSelected: selected,
        selectedValue: selected.description
      },
      () => {
        let variant = {
          name: this.state.name,
          index: this.state.index,
          id: this.state.id,
          value: this.state.variantSelected
        };
        this.props.onChangeVariant(variant);
      }
    );
    if (this.state.index === 1) {
      this.setState({
        selectedValue: ""
      });
    }
  };

  loopVariantProduct = () => {
    let { idSize, idColor } = { idSize: "002", idColor: "001" };
    if (this.state.index === 1) {
      let notZeroIndex = 0;
      for (let i = 0; i < this.state.values.length; i++) {
        let value = this.state.values[i];
        if (
          this.stockInfo[idColor + this.state.colorId + idSize + value.id] !== 0
        ) {
          notZeroIndex = i;
          break;
        }
      }
      return this.state.values.map((value, index) => (
        <Variant
          key={value.id}
          id={value.id}
          ref={this.variantsRef[index]}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          disabled={
            this.stockInfo[idColor + this.state.colorId + idSize + value.id]
          }
          selected={
            (this.state.variantSelected.id === value.id &&
              this.props.changed === 0) ||
            (this.props.changed === 1 && index === notZeroIndex)
              ? true
              : false
          }
        />
      ));
    } else {
      return this.state.values.map((value, index) => (
        <Variant
          key={value.id}
          id={value.id}
          ref={this.variantsRef[index]}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          disabled={"1"}
          selected={this.state.variantSelected.id === value.id ? true : false}
        />
      ));
    }
  };

  variantDefault = (colorId, sizeId) => {
    let selected = [];
    let i = 0;
    if (this.props.index === 0) {
      for (i = 0; i < this.props.values.length; i++) {
        if (this.props.values[i].id === colorId) {
          selected = this.props.values[i];
        }
      }
    }
    if (this.props.index === 1) {
      for (i = 0; i < this.props.values.length; i++) {
        if (this.props.values[i].id === sizeId) {
          selected = this.props.values[i];
        }
      }
    }
    console.log(selected);
    return selected;
  };

  render() {
    return (
      <Row style={{ marginTop: 12 }}>
        <Col md={24}>
          <p style={{ fontSize: 18 }}>
            {this.state.name}&nbsp;
            <font style={{ fontWeight: 600 }}>{this.state.selectedValue}</font>
          </p>
          {this.loopVariantProduct()}
        </Col>
      </Row>
    );
  }
}
Variants.propTypes = {
  name: PropTypes.string,
  value: PropTypes.arrayOf(Object),
  id: PropTypes.string,
  sizeId: PropTypes.string,
  colorId: PropTypes.string,
  sku: PropTypes.arrayOf(Object)
};

export default Variants;
