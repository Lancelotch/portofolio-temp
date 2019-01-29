import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import strings from "../../config/localization";
import CurrencyRp from "../Typography/CurrencyRp";
import PropTypes from "prop-types";

export default class CheckoutDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      totalProduct: this.props.totalProduct,
      totalPriceProduct: this.props.totalPriceProduct,
      totalPriceDelivery: this.props.totalPriceDelivery,
      totalPriceInvoice: this.props.totalPriceInvoice
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      totalProduct: props.totalProduct,
      totalPriceProduct: props.totalPriceProduct,
      totalPriceDelivery: props.totalPriceDelivery,
      totalPriceInvoice: props.totalPriceInvoice
    });
  }

  render() {
    return (
      <Row>
        <Col md={24}>
          <h4>{this.state.title}</h4>
        </Col>
        <Col md={24}>
          <Card style={{ backgroundColor: " #F6F6F6", marginTop: "0px" }}>
            <p>
              {strings.total_price_product} x ({this.state.totalProduct})
            </p>
            <CurrencyRp price={this.state.totalPriceProduct} />
            <br />
            <br />
            <p>{strings.total_price_courier}</p>
            <CurrencyRp price={this.state.totalPriceDelivery} />
            <hr />
            <h4>{strings.total_invoice}</h4>
              <CurrencyRp price={this.state.totalPriceInvoice} />
          </Card>
        </Col>
      </Row>
    );
  }
}

CheckoutDetail.propTypes = {
  title: PropTypes.string,
  totalProduct: PropTypes.number,
  totalPriceProduct: PropTypes.number,
  totalPriceDelivery: PropTypes.number,
  totalPriceInvoice: PropTypes.number
};
