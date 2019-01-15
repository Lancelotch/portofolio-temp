import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrencyRp from "../Typography/CurrencyRp";
import { Row, Col } from "antd";



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
      borderRadius: "6px",
      backgroundColor: "#F6F6F6",
      padding: "20px",
    }

    return (
      <Row className="label-cart" >
        <Col xs={12}>
          <p>{this.state.title}</p>
        </Col>
        <Col xs={12}
          style={{
            paddingLeft: "0px",
            paddingRight: "0px"
          }}>
          {/* <PriceLabelCourier /> */}
        </Col>
        <Col lg={12} className="price-label-cart" style={priceLabelCart}>
          <p>{this.state.label}</p>
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
