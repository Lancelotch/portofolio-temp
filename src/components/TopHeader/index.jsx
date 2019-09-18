import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Icon } from "antd";
import { Link } from "docz";
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
          <Col md={4}>
            <span className="top-header__download">
              Download Aplikasi Mobile
              <Icon type="down" />
            </span>
          </Col>
          <Col md={6}>
            <span className="top-header__helper">
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
