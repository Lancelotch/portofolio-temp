import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import Search from "antd/lib/input/Search";
import Login from "../../components/Login/Login";
import { Link, NavLink } from "react-router-dom";
import "./style.sass";
import "../../sass/style.sass";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false
    };
  }

  openModalLogin = () => {
    const openModalLogin = this.state.openModalLogin;
    this.setState({
      openModalLogin: !openModalLogin
    });
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Col span={6}>
            <NavLink tag={Link} to="/">
              <img
                src={require("../../assets/img/monggopesen_logo.png")}
                className="img-responsive img-navbar"
                alt=""
              />
            </NavLink>
          </Col>
          <Col span={6}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Col>
          <Col span={6}>
            {this.props.isAuthenticated !== true ? (
              <div>
                <Button type="primary" onClick={this.openModalLogin}>
                  Login
                </Button>
                <Login
                  visible={this.state.openModalLogin}
                  onCancel={this.openModalLogin}
                />
              </div>
            ) : (
              <div>
                <Button type="primary" onClick={this.openModalLogin}>
                  Profil
                </Button>
              </div>
            )}
          </Col>
          <Col span={6} />
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

export default Header;
