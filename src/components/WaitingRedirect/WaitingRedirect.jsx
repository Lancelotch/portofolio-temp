import React, { Component } from "react";
import { Row, Col } from "antd";

class WaitingRedirect extends Component {
  componentWillMount() {
    setTimeout(() => {
      window.location.assign("/dashboard-customer");
    }, 3000);
  }
  render() {
    const img = {
      margin: "auto"
    };
    return (
      <div className="waiting-redirect">
        <Row>
          <Col md="24">
            <img
              src={require("assets/img/waiting_redirect.png")}
              style={img}
              className="img-responsive"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default WaitingRedirect;
