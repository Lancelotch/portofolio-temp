import React, { Component } from "react";
import { Link } from "react-router-dom";
import strings from "../../config/localization";
import { Button, Col } from "antd";

var buttonCartPesan = {
  border: "1px solid #ACACBA",
  borderRadius: "3px",
  color: "#ffffff",
  backgroundColor: "#d71149",
  margin: "0 auto",
  display: "block",
  textTransform: "unset",
  marginBottom: "30px"
};

class EmptyCart extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Col md={24}>
          <img
            src={require("assets/img/monggopesen_empty.png")}
            style={{ margin: "auto", marginTop: "111px", display: "block" }}
            className="img-responsive"
            alt="Monggo pesen empty"
          />
        </Col>
        <Col md={24}>
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            {strings.warning_empty_cart}
          </h2>
          <p style={{ textAlign: "center" }}>{strings.quote_empty_cart}</p>
          <Link to="/">
            <Button style={buttonCartPesan}>{strings.button_empty_cart}</Button>
          </Link>
        </Col>
      </div>
    );
  }
}

export default EmptyCart;
