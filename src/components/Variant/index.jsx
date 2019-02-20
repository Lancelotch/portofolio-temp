import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Variant.sass";
import { Tooltip } from "antd";

class Variant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      images: this.props.images,
      name: this.props.name,
      description : this.props.description
    };
  }
  
  product = img => {
    return (
      <div className="box-parent">
        <div
          className={
            this.props.selected ? "box-image tes active" : "box-image tes"
          }
          onClick={this.onVariantSelected}
        >
          <div className="radio-tile-content">{img}</div>
        </div>
      </div>
    );
  };

  productImage = () => {
    if (this.state.images.large === "") {
      return this.product(<p>{this.state.name}</p>);
    } else {
      return this.product(
        <Tooltip
          id="tooltip-top"
          title={this.state.name}
          placement="topLeft"
        >
          <img
            src={this.state.images.large}
            alt=""
            className="radio-content-image"
          />
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
  images: PropTypes.string,
  name: PropTypes.string
};

export default Variant;
