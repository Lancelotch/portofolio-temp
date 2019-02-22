import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Variant from ".";

class Variants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      values: this.props.values,
      description : this.props.description,
      id: this.props.id,
      changed: this.props.changed,
      variantSelected: []
    };
  }

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
  };

  loopVariantProduct = () => {
    if(this.state.index===1) {
      return this.state.values.map((value,index) => (
        <Variant
          key={value.id}
          id={value.id}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          description={value.description}
          selected={
            ((this.state.variantSelected.id === value.id && this.props.changed===0) || (this.props.changed === 1 && index === 0))
              ? true
              : false
          }
        />
      ));
    }
    else {
      return this.state.values.map(value => (
        <Variant
          key={value.id}
          id={value.id}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          description={value.description}
          selected={
            (this.state.variantSelected.id === value.id)
              ? true
              : false
          }
        />
      ));
        }
  };

  render() {
    return (
        <Row>
          <Col md={24}>
            <p style={{ fontSize: "14px" }}>
              {this.state.name}&nbsp;
              <font style={{fontWeight: 600}}>{
                this.state.selectedValue}</font>
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
  id: PropTypes.string
};

export default Variants;