import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import SliderPrimary from "../../components/SliderPrimary/SliderPrimary.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
            <SliderPrimary />
            <Footer/>
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
