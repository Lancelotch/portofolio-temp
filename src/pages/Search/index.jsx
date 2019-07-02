import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import "sass/style.sass";
import "./style.sass";

//const Products = React.lazy(() => import("../../components/Products")); 

class SearchPage extends Component {
  render() {
    return (
      <React.Fragment>
            <Row>
              <Col>
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
