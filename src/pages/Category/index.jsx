import React, { Component, Suspense, Fragment } from "react";
import { Row, Col, BackTop, Spin, Card } from "antd";
import { connect } from "react-redux";
import "sass/style.sass";
import "./style.sass";

const Products = React.lazy(() => import("../../components/Products"));

class CategoryPage extends Component {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            {this.props.children}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(CategoryPage);
