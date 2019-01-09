import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { DummyInspirationBottom } from "../../dummy/DummyInspirationBottom";
import { DummyInspiration } from "../../dummy/DummyInspiration";
import Benefits from "../../components/Benefits/Benefits";
import Categories from "../../components/Catagories/Categories";
import Inspirations from "../../components/Inspirations/Inspirations";
import SliderPrimary from "../../components/SliderPrimary/SliderPrimary.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";


class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <SliderPrimary />
            <Benefits />
            <Categories />
            <Inspirations inspirations={DummyInspiration} />
            <Inspirations inspirations={DummyInspirationBottom} />
            <Footer />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(mapStateToProps)(HomePage);
