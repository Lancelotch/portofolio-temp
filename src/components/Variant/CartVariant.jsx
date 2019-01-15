import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@material-ui/core";
import { Row, Col } from "antd";

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
    const { classes } = this.props;
    if (this.state.optionValImage === "") {
      return this.product(<div>{this.state.optionValText}</div>);
    } else {
      return this.product(
        <Tooltip
          id="tooltip-top"
          title={this.state.optionValText}
          placement="top"
          // classes={{ tooltip: classes.tooltip }}
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
        <Col xs={12} lg={6}>
          <p>{this.state.optionValName}</p>
        </Col>
        <Col xs={12} lg={6}>
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
