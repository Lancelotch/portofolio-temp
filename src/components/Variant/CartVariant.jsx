import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Tooltip } from "antd";

class CartVariant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValName: this.props.name,
      optionValImage: this.props.imageUrl,
      optionValText: this.props.value
    };
  }

  product = img => {
    // let classname = this.state.selected ? 'active' : ''
    return <div style={{ fontSize: "13px" }}>{img}</div>;
  };

  productImage = () => {
    //jika image source kosong maka tampilkan title
    if (this.state.optionValImage === "") {
      return this.product(<React.Fragment>{this.state.optionValText}</React.Fragment>);
    } else {
      return this.product(
        <Tooltip
          id="tooltip-top"
          title={this.state.optionValText}
          placement="top"
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
    return (
      <Row style={{ marginTop: "1.4em" }}>
        <Col xs={12} md={12}>
          <p>{this.state.optionValName}</p>
        </Col>
        <Col xs={12} md={12}>
          {this.productImage()}
        </Col>
      </Row>
    );
  };

  onVariantSelected = () => {
    this.props.onChangeVariant(this.state);
  };

  render() {
    return this.tooltip();
  }
}

CartVariant.propTypes = {
  optionValId: PropTypes.string,
  optionValImage: PropTypes.string,
  optionValText: PropTypes.string
};

export default CartVariant;
