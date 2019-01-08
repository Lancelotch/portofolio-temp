import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import PropTypes from "prop-types";

export default class CurrencyRp extends Component {
  render() {
    return (
      <CurrencyFormat
        value={this.props.price}
        prefix={"Rp "}
        displayType={"text"}
        thousandSeparator={true}
      />
    );
  }
}

CurrencyRp.propTypes = {
  price: PropTypes.number
};
