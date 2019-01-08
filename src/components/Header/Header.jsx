import React, { Component } from "react";
import { Row, Col, Button, Icon, Menu } from "antd";
import Search from "antd/lib/input/Search";
import Login from "../../components/Login/Login";
import { Link, NavLink } from "react-router-dom";
import "./style.sass";
import "sass/style.sass";
import serviceCategory from "api/services/ServiceCategory";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false,
      categoryFeature: [],
      isDataCategoryFeatureLoaded: false
    };
  }

  componentWillMount() {
    this.getCategoryFeature();
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin;
    this.setState({
      openModalLogin: !openModalLogin
    });
  };

  getCategoryFeature = () => {
    serviceCategory
      .CategoryFeature()
      .then(response => {
        const categoryFeature = response.data;
        this.setState({
          categoryFeature: categoryFeature,
          isDataCategoryFeatureLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Row gutter={40}>
            <Col md={6}>
              <a href="/">
                <img
                  src={require("assets/img/monggopesen_logo.png")}
                  className="img-navigation"
                />
              </a>
            </Col>
            <Col md={8}>
              <Search
                size="large"
                placeholder="input search text"
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col md={10}>
              <div className="item-navigation">
                <Icon type="shopping-cart" className="icon-cart-navigation" />
                {this.props.isAuthenticated !== true ? (
                  <div>
                    <button
                      className="button-navigation"
                      onClick={this.openModalLogin}
                    >
                      Login
                    </button>
                    <Login
                      visible={this.state.openModalLogin}
                      onCancel={this.openModalLogin}
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      className="button-navigation"
                      onClick={this.openModalLogin}
                    >
                      Profil
                    </button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>

        <div className="container-fluid">
          <hr className="line-navigation" />
          <Row>
            <Col md={24}>
              <div className="container">
                <div className="categories-navigation">
                  {this.state.isDataCategoryFeatureLoaded !== false &&
                    this.state.categoryFeature[0].subCategory[1].childSubCategory.map(
                      (category, index) => {
                        if (index <= 5) {
                          var link = "/category-product/" + category.id;
                          return (
                            <NavLink
                              key={category.id}
                              to={link}
                              className="link-navigation"
                            >
                              {category.name}
                            </NavLink>
                          );
                        }
                      }
                    )}
                </div>
              </div>
            </Col>
          </Row>
          <hr className="line-navigation" />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;