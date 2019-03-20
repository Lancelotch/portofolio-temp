import React, { Component, Suspense, Fragment } from "react";
import { Row, Col, BackTop, Spin, Card } from "antd";
import { connect } from "react-redux";
import Header from "components/Header";
import "sass/style.sass";
import "./style.sass";

const Products = React.lazy(() => import("../../components/Products"));

class SearchPage extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
            <Row>
              <Col>
                <Header match={match}/>
                <div className='container'>
                  {this.props.children}
                </div>
              </Col>
            </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(SearchPage);
