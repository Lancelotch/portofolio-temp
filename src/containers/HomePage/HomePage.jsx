import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
<<<<<<< HEAD
import Benefits from "../../components/Benefits/Benefits"
=======
import Header from "../../components/Header/Header.jsx";
import SliderPrimary from "../../components/SliderPrimary/SliderPrimary.jsx";
>>>>>>> f538d30d067732f90fa808e75bb9ba537427cf8e

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false,
      categoryFeature: []
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
          </Col>
        </Row>
        <Benefits />

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
