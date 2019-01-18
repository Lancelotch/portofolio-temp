import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrencyRp from "../Typography/CurrencyRp";
import { Row, Col } from "antd";
import PriceLabelCourier from "../LabelCourier/PriceLabelCourier";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      label: this.props.label,
      price: this.props.price,
      imageSrc: this.props.imageSrc
    };
  }
  render() {

    const priceLabelCart = {
      borderRadius: "3px",
      backgroundColor: "#F6F6F6",
      padding: " 10px 10px",
      marginTop: "10px"
    };

    return (
      <Row style={{ marginLeft: "10px", marginTop: "15px" }}>
        <Col md={24}>
          <p>{this.state.title}</p>
        </Col>
        <Col md={24}>
          <PriceLabelCourier />
        </Col>
        <Col md={24} style={priceLabelCart}>
          <p style={{ display: "unset", paddingRight: "10rem" }}>
            {this.state.label}
          </p>
          <CurrencyRp price={this.props.price} />
        </Col>
      </Row>
    );
  }
}
OrderDetail.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  imageSrc: PropTypes.string
};
