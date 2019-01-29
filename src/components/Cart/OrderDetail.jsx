import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrencyRp from "../Typography/CurrencyRp";
import { Row, Col } from "antd";
import PriceLabelCourier from "../LabelCourier/PriceLabelCourier";

const priceLabelCart = {
  borderRadius: "3px",
  backgroundColor: "#F6F6F6",
  padding: " 10px 10px",
  marginTop: "10px"
};

export default class OrderDetail extends Component {
  render() {
    const { title, label, price } = this.props
    return (
      <Row style={{ marginLeft: "10px", marginTop: "15px" }}>
        <Col md={24}>
          <p>{title}</p>
        </Col>
        <Col md={24}>
          <PriceLabelCourier />
        </Col>
        <Col md={24} style={priceLabelCart}>
          <p style={{ display: "unset", paddingRight: "10rem" }}>
            {label}
          </p>
          <CurrencyRp price={price} />
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
