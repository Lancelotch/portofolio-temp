import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Footer from "components/Footer";
import Header from "components/Header";
import "sass/style.sass";


class HomePage extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
              HOME
            <Footer />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(HomePage);
