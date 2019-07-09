import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Variant from ".";
import { forEach, mapKeys } from "lodash";

class Variants extends Component {
  constructor(props) {
    super(props);
    let selected = this.variantSelectDefault(
      this.props.colorId,
      this.props.sizeId
    );
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
    }
  };

  changedInfo = (colorId, sizeId) => {
    this.setState({
      colorId: colorId,
      sizeId: sizeId
    });
    let selected = this.variantSelectDefault(colorId, sizeId);
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
      return this.state.values.map((value, index) => (
        <Variant
          key={value.id}
          id={value.id}
          ref={this.variantsRef[index]}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          disabled={1}
          selected={this.state.variantSelected.id === value.id ? true : false}
        />
      ));
  };

  render() {
    return (
      <Row style={{ marginTop: 12, marginBottom: 24 }}>
        <Col md={24}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>
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
