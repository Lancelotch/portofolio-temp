import React, { Component } from "react";
import Variant from "./Variant";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

class Variants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      optionType: this.props.optionType,
      optionValue: this.props.optionValue,
      optionId: this.props.optionId,
      variantSelected: []
    };
  }

  onChangeVariant = selected => {
    this.setState(
      {
        variantSelected: selected
      },
      () => {
        let variant = {
          name: this.state.optionType,
          index: this.state.index,
          optionId: this.state.optionId,
          value: this.state.variantSelected
        };
        this.props.onChangeVariant(variant);
      }
    );
  };

  loopVariantProduct = () => {
    return this.state.optionValue.map(option => (
      <Variant
        key={option.optionValId}
        optionValId={option.optionValId}
        optionValImage={option.optionValImage}
        optionValText={option.optionValText}
        onChangeVariant={this.onChangeVariant}
        selected={
          this.state.variantSelected.optionValId === option.optionValId
            ? true
            : false
        }
      />
    ));
  };

  render() {
    return (
      <div className="container">
        <Row style={{ marginTop: "16px" }}>
          <Col lg={12} md={12} xs={12}>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
              {this.state.optionType}
            </p>
          </Col>
          <Col lg={12} md={12} xs={12}>
            {this.loopVariantProduct()}
          </Col>
        </Row>
      </div>
    );
  }
}
Variants.propTypes = {
  optionType: PropTypes.string,
  optionValue: PropTypes.arrayOf(Object),
  optionId: PropTypes.string
};

export default Variants;
