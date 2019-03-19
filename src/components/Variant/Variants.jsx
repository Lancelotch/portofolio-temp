import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Variant from ".";
import {forEach} from "lodash";

class Variants extends Component {
  constructor(props) {
    super(props);
    let selected = this.variantDefault(this.props.colorId, this.props.sizeId);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      values: this.props.values,
      id: this.props.id,
      changed: this.props.changed,
      colorId: this.props.colorId,
      sizeId: this.props.sizeId,
      sku: this.props.sku,
      variantSelected: selected
    };
    let sku = this.props.sku;
    this.stockInfo = {};
    sku.map(item => {
     return this.stockInfo[item.id] = item.stock;
    });

    this.variantsRef = [];
    this.state.values.map((item, index) => {
     return this.variantsRef[index] = React.createRef();
    });  
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
      let temp_stockInfo = this.stockInfo;
      let colorId = this.state.colorId;
      console.log(this.stockInfo);
      forEach(this.state.values, function (value, i) {
        if (temp_stockInfo[idColor+colorId+idSize+value.id] !== 0) {
          notZeroIndex = i;
         return false;
        }
     });
      // for (let i = 0; i<this.state.values.length; i++) {
      //   let value = this.state.values[i];
      //   console.log(value);     
      //   if (this.stockInfo[idColor+this.state.colorId+idSize+value.id] !== 0) {
      //     notZeroIndex = i;
      //     break;
      //   }
      // }
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

//variand default select price lowest
  variantDefault = (colorId, sizeId) => {
    let selected = [];
    let id = 0;
    if (this.props.index === 0) id = colorId;
    else id = sizeId;
    this.props.values.map(value => {
      if (value.id === id) selected = value;
    });
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

