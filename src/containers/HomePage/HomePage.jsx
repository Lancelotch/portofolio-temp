import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import Login from "../../components/Login/Login";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false
    };
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin;
    this.setState({
      openModalLogin: !openModalLogin
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12} />
          <Col span={24}>
            <Header />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(mapStateToProps)(HomePage);
