import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import PATH_URL from "../../routers/path";

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
          <Col md={12}>
            <span className="top-header__download">
              Download Aplikasi Mobile
              <Icon type="down" />
            </span>
          </Col>
          <Col md={12} className="top-header__helper">
            <span className="top-header__helper__link">
              <Link to={PATH_URL.HOME}>Bantuan</Link>
              <Link to={PATH_URL.HOME}>Cara Belanja</Link>
              <Link to={PATH_URL.HOME}>Tentang Kami</Link>
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopHeader;
