import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import Login from "../../components/Login/Login";
import { connect } from "react-redux";
import Benefits from "../../components/Benefits/Benefits"
import Categories from '../../components/Catagories/Categories'

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      openModalLogin: false,
      categoryFeature: []
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
      <div>
        <Row>
          <Col span={12} />
          <Col span={12}>
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
        </Row>
        <Benefits />
        <Categories />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(mapStateToProps)(HomePage);
