import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { DummyInspirationBottom } from "../../dummy/DummyInspirationBottom";
import { DummyInspiration } from "../../dummy/DummyInspiration";
import Benefits from "../../components/Benefits/Benefits";
import Categories from "../../components/Catagories/Categories";
import Inspirations from "../../components/Inspirations/Inspirations";
import { apiGetProductByCategory } from "../../api/services/ServiceHomePage";

import SliderPrimary from "../../components/SliderPrimary/SliderPrimary.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import Products from "../../components/Product/Products";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      productsTshirt: [],
      productsPants: [],
      productsTas: [],
      openModalLogin: false,
      categoryFeature: []
    };
  }

  componentWillMount() {
    this.productTrend("5b72520497ac1c1984473660", "baju");
    this.productTrend("5b725c5c97ac1c1984473661", "celana");
    this.productTrend("computer backpack", "tas");
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin;
    this.setState({
      openModalLogin: !openModalLogin
    });
  };

  productTrend = (id, name) => {
    var products = [];
    apiGetProductByCategory(id)
      .then(res => {
        res.data.map(product => {
          const productDecode = JSON.parse(
            decodeURIComponent(product.homePageDetails)
          );
          productDecode.productId = product.productId;
          products.push(productDecode);
        });
        this.setProducts(name, products);
      })
      .catch(error => {
        console.log(error);
      });
  };

  setProducts = (name, products) => {
    if (name === "baju") {
      this.setState({
        productsTshirt: products
      });
    } else if (name === "celana") {
      this.setState({
        productsPants: products
      });
    } else if (name === "tas") {
      this.setState({
        productsTas: products
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            <Header />
            <SliderPrimary />
            <Benefits />
            <Categories />
            <Inspirations inspirations={DummyInspiration} />
            <Inspirations inspirations={DummyInspirationBottom} />

            <Col md={{ span: 24 }} style={{ marginBottom: "2em" }}>
              <font className="contentHomeProductText">
                <h2>Tops Trending</h2>
              </font>
              <Products
                products={this.state.productsPants}
                maxProductCount={6}
              />

              <font>
                <h2>Pakaian Trend</h2>
              </font>

              <Products
                products={this.state.productsTshirt}
                maxProductCount={6}
              />
              <font>
                <h2>Tas Trend</h2>
              </font>
              <Products products={this.state.productsTas} maxProductCount={6} />
            </Col>
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
