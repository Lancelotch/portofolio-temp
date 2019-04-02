import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Variant.sass";
import { Tooltip } from "antd";

class Variant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      image: this.props.image,
      name: this.props.name,
      description: this.props.description
    };
  }

  product = img => {
    return (
      <div className="variant">
        <div
          className={this.props.selected ? "box-variant active" : "box-variant"}
          onClick={this.onVariantSelected}
        >
          {img}
        </div>
      </div>
    );
  };

  productText = img => {
    let disabled = {
      border: "1px solid #eee",
      backgroundColor: "#bdc3c7"
    }
    return (
      <div className="variant">    
        <div
          className={
            this.props.selected ? "box-variant-text active" : "box-variant-text"
          }
          style={this.props.disabled === 0 ? disabled : null}
          onClick={this.props.disabled === 0 ? null : this.onVariantSelected}
        >
          <div className="variant__titleContent">{img}</div>
        </div>
      </div>
    );
  };
 
  productImage = () => {
    if (!this.state.image || !this.state.image.large) {
      return this.productText(<p>{this.state.name}</p>);
    } else {
      return this.product(
        <Tooltip id="tooltip-top" title={this.state.name} placement="topLeft">
          <img src={this.state.image.large} alt="" className="variant_image" />
        </Tooltip>
      );
    }
  };

  tooltip = () => {
    return this.productImage();
  };

  onVariantSelected = () => {
    this.props.onChangeVariant(this.state);
  };

  render() {
    return this.tooltip();
  }
}

Variant.propTypes = {
  id: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string,
  disabled: PropTypes.number
};

export default Variant;
