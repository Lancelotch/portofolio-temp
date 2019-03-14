import React, { Component } from "react";
import { Col } from "antd";

class ProductAttibutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      label: this.props.label
    };
  }
  render() {
    return (
      <div style={{paddingLeft:20}} >
        <Col md={3}>
          <p>{this.state.label}</p>
        </Col>
        <Col md={21}>
          <p>:&nbsp;{this.state.description}</p>
        </Col>
      </div>
    );
  }
}

export default ProductAttibutes;
