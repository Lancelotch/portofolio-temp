import React, { Component } from "react";
import { Row, Col, Icon, Badge } from "antd";
import Search from "antd/lib/input/Search";
import Login from "../../components/Login/Login";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./style.sass";
import "sass/style.sass";
import serviceCategory from "api/services/ServiceCategory";
import { apiGetProductsFromCart } from "../../api/services/ServiceCart";
import authentication from "../../api/services/authentication";
import { pageCart } from "../../routers/paths";
import { logout } from "../../redux/actions/auth";
import { updateCartContentQty } from "../../redux/actions/cart";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false,
      categoryFeature: [],
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      redirectToCart: false
    };
  }

  componentWillMount() {
    this.getCategoryFeature();
    this.getListCart();
    this.getUserDetail();
  }

  getUserDetail = () => {
    authentication
      .apiGetDetailUser()
      .then(response => {
        const detailUser = response.data;
        this.setState({
          name: detailUser.name
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getListCart = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      apiGetProductsFromCart()
        .then(response => {
          const sumProduct = response.data.length;
          if (response.code === "200") {
            if (this.props.contentQty !== sumProduct) {
              this.props.updateCartContentQty(sumProduct);
            }
            this.setState({
              sumProduct: sumProduct
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

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

  toPageCart() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.setState = { redirectToCart: true };
    } else {
      this.toggleModal();
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  renderRedirectToCart() {
    if (this.state.redirectToCart) {
      return <Redirect to={pageCart} />;
    }
  }

  render() {
    return (
      <div className="navigation">
        {this.renderRedirectToCart}
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
              <form action="/search">
                <Search
                  size="large"
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                />
              </form>
            </Col>
            <Col md={10}>
              <div className="item-navigation">
                {this.props.contentQty === 0 ? (
                  <Icon
                    type="shopping-cart"
                    className="icon-cart-navigation"
                    style={{ fontSize: "35px" }}
                    onClick={this.toPageCart.bind(this)}
                  />
                ) : (
                  <Badge
                    count={this.props.contentQty}
                    badgeContent={this.state.contentQty}
                    color="secondary"
                  >
                    <Icon
                      type="shopping-cart"
                      className="icon-cart-navigation"
                      style={{ fontSize: "35px" }}
                      onClick={this.toPageCart.bind(this)}
                    />
                  </Badge>
                )}
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
                      onClick={this.handleLogout}
                    >
                      logout
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    contentQty: state.cart.contentQty
  };
};

const mapDispatchToProps = dispatch => ({
  updateCartQty: qty => dispatch(updateCartContentQty(qty)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
