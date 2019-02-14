import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown } from "antd";
import Search from "antd/lib/input/Search";
import Login from "components/Login";
import { connect } from "react-redux";
import "./style.sass";
import "sass/style.sass";
import { logout } from "../../store/actions/authentication";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      openModalLogin: false,
      categoryFeature: [],
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      keyword: this.props.keyword
    };
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin;
    this.setState({
      openModalLogin: !openModalLogin
    });
  };

  handleInputSearchChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {

    const menuItems = this.state.categoryFeature.map(category => (
      <Menu.Item key={category.id}>
        <a href={"/category-product/" + category.id}>{category.name}</a>
      </Menu.Item>
    ));

    const usetItems = (
      <font
        style={{
          marginLeft: "0px",
          marginTop: "5px",
          cursor: "pointer"
        }}
        onClick={this.handleLogout}
      >
        Logout
      </font>
    );

    const userItems = <Menu>{usetItems}</Menu>;

    const menu = <Menu>{menuItems}</Menu>;

    return (
      <div className="navigation">
        <Row>
          <Col md={24}>
            <p style={{ textAlign: "center" }}>
              Terbuka juga untuk pemesanan grosir dengan harga spesial, monggo
              mampir &nbsp;
              <a
                style={{
                  fontSize: "14px",
                  fontWight: "600",
                  color: "#007E80"
                }}
                href=" "
              >
                kesini
              </a>
            </p>
          </Col>
          <Col md={5} style={{ marginTop: 25 }}>
            <a href="/">
              <img
                src={require("assets/img/monggopesen_logo.png")}
                className="img-navigation"
                alt=""
              />
            </a>
          </Col>
          <Col md={13} style={{ marginTop: 25 }}>
            <form action="/search">
              <Search
                placeholder="input search text"
                id="filter"
                name="q"
                value={this.state.keyword}
                onChange={this.handleInputSearchChange.bind(this)}
                enterButton
              />
            </form>
          </Col>
          <Col md={6}>
            <img
              src={require("assets/img/monggopesen_header_discount.png")}
              style={{ maxWidth: "100%", marginLeft: 110 }}
              alt=""
            />
          </Col>
          <Col md={18} style={{ marginTop: 24 }}>
            <div className="categories-navigation">
              <Dropdown overlay={menu}>
                <a
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#007E80"
                  }}
                  href={" "}
                >
                  Kategori <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Col>
          <Col md={6} style={{ marginTop: 16 }}>
            <div className="item-navigation">
              {this.props.isAuthenticated !== true ? (
                <React.Fragment>
                  <Icon
                    type="user"
                    style={{ fontSize: "35px" }}
                    onClick={this.openModalLogin}
                  />
                  <font
                    style={{
                      marginLeft: 0,
                      marginTop: 5,
                      cursor: "pointer"
                    }}
                    onClick={this.openModalLogin}
                  >
                    Login
                  </font>
                  <Login
                    visible={this.state.openModalLogin}
                    onCancel={this.openModalLogin}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Icon
                    type="user"
                    style={{ fontSize: "35px" }}
                    onClick={this.handleLogout}
                  />
                  <Dropdown overlay={userItems}>
                    <a
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#007E80"
                      }}
                      href="/dashboard-customer/1"
                    >
                      {this.state.name}
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                </React.Fragment>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(
  mapStateToProps,
  {logout}
)(Header);
