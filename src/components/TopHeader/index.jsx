import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Icon } from "antd";

class TopHeader extends Component {
  render() {
    return (
      <div className="top-header">
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="container top-header__content"
        >
          <Col md={4} className="top-header__download">
            <span>Download Aplikasi Mobile</span>
            <Icon type="down" />
          </Col>
          <Col md={6} className="top-header__helper">
            <span>Bantuan</span>
            <span>Cara Belanja</span>
            <span>Tentang Kami</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopHeader;
