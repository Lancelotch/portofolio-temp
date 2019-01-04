import React, { Component } from "react";
import { Row, Col } from "antd";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row>
            <Col md={24}>
              <div className="Footer" />
            </Col>
          </Row>
        </div>
        />
      </React.Fragment>
    );
  }
}

export default Footer;
