import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Footer from "components/Footer";
import Header from "components/Header";
import "sass/style.sass";
import ProductListCategory from "../../components/ProductListCategory";


class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="container__first-item">
            <Row>
              <Col xs={24} md={24}>
                <Header />
                  <ProductListCategory />
                <Footer />
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(CategoryPage);
