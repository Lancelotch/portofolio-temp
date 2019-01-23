import React, { Component } from "react"
import { Row, Col, Icon, Badge } from "antd"
import Search from "antd/lib/input/Search"
import Login from "components/Login/Login"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import "./style.sass"
import "sass/style.sass"
import serviceCategory from "api/services/ServiceCategory"
import { apiGetProductsFromCart } from "api/services/ServiceCart"
import authentication from "api/services/authentication"
import {logout} from "../../store/actions/auth"
import {updateCartContentQty} from "store/actions/cart"


class Header extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false,
      categoryFeature: [],
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0
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
          name: detailUser.name,
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      window.location.assign("/cart");
    } else {
      this.toggleModal();
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  getListCart = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      apiGetProductsFromCart()
        .then(response => {
          console.log('lenght '+response.data.length)
          const sumProduct = response.data.length;
          if (response.code === "200") {
            // If the qty in Redux is different than that of server, overwrite it
            if (this.props.contentQty !== sumProduct) {
                this.props.updateCartQty(sumProduct)
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

  render() {
    return (
      <div className="navigation">
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
              {this.props.contentQty == 0 ? (
                  <Icon
                    type="shopping-cart"
                    className="icon-cart-navigation"
                    style={{ fontSize: "35px" }}
                    onClick={this.toPageCart.bind(this)}
                  />
                ) : (
                  <Badge count={this.props.contentQty} badgeContent={this.state.contentQty} color="secondary">
                    <Icon
                      type="shopping-cart"
                      className="icon-cart-navigation"
                      style={{ fontSize: "35px" }}
                      onClick={this.toPageCart.bind(this)}
                    />
                  </Badge>
                )}
                {/* {this.state.sumProduct === 0 ? (
                  <Icon type="shopping-cart" className="icon-cart-navigation" />
                ) : (
                  <Icon type="shopping-cart" className="icon-cart-navigation">
                    <Badge count={this.state.sumProduct} />
                  </Icon>
                )} */}

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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  contentQty: state.cart.contentQty
});

const mapDispatchToProps = (dispatch) => ({
  updateCartQty: (qty) => dispatch(updateCartContentQty(qty)),
  logout: () => dispatch(logout()),
});

// const mapStateToProps = createStructuredSelector({
//   isAuthenticated: authSelector('isAuthenticated'),
//   contentQty: cartSelector('contentQty')
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateCartContentQty: (qty) => dispatch(updateCartContentQty(qty)),
//   logout: () => dispatch(logout()),
// });


export default connect(mapStateToProps, mapDispatchToProps)(Header);
