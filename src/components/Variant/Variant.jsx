import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Variant.sass";
import { Tooltip } from "antd";

class Variant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValId: this.props.optionValId,
      optionValImage: this.props.optionValImage,
      optionValText: this.props.optionValText
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
    //jika image source kosong maka tampilkan title
    if (this.state.optionValImage === "") {
      return this.product(<p style={{ cursor: "context-menu" }}>{this.state.optionValText}</p>);
    } else {
      return this.product(
        <Tooltip
          id="tooltip-top"
          title={this.state.optionValText}
          placement="topLeft"
        >
          <img
            src={this.state.optionValImage}
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
  optionValId: PropTypes.string,
  optionValImage: PropTypes.string,
  optionValText: PropTypes.string
};

export default Variant;
