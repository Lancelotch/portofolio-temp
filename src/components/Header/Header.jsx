import React, { Component } from "react";
import { Row, Col} from "antd";
import Search from "antd/lib/input/Search";
import Login from "../../components/Login/Login";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authentication";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./style.sass";
import "sass/style.sass";
import serviceCategory from "api/services/ServiceCategory";
import { apiGetProductsFromCart } from "../../api/services/ServiceCart";
import authentication from "../../api/services/authentication";

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
          const sumProduct = response.data.length;
          if (response.code === "200") {
            // If the qty in Redux is different than that of server, overwrite it
            console.log(11, this.props.cartContentQty, sumProduct)
            if (this.props.cartContentQty !== sumProduct) {
                this.props.updateCartContentQty(sumProduct);
            }
            // this.setState({
            //   sumProduct: sumProduct
            // });
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
              {this.props.cartContentQty === 0 ? (
                      <IconButton aria-label="Cart">
                        <ShoppingCartIcon
                          style={{ fontSize: "30px" }}
                          onClick={this.toPageCart.bind(this)}
                        />
                      </IconButton>
                    ) : (
                        <IconButton aria-label="Cart">
                          <Badge
                            badgeContent={this.props.cartContentQty}
                            color="secondary"
                          >
                            <ShoppingCartIcon
                              style={{ fontSize: "30px" }}
                              onClick={this.toPageCart.bind(this)}
                            />
                          </Badge>
                        </IconButton>
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
    isAuthenticated: state.authReducer.isAuthenticated,
    cartContentQty: state.authRedycer.cartContentQty
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
      updateCartContentQty: (qty) => dispatch({ type: `UPDATE_CART_CONTENT_QTY`, payload: qty }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps,{logout})(Header);
