import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown } from "antd";
import Search from "antd/lib/input/Search";
import Login from "components/Login";
import TopHeader from "components/TopHeader";
// import Categories from "components/Categories"
import { connect } from "react-redux";
import strings from "../../localization/localization";
import "./style.sass";
import "sass/style.sass";
import { logout } from "../../store/actions/authentication";
import customer from "../../api/services/customer";
import CategoryMenu from "../CategoryMenu";
import {Link} from "react-router-dom"
import maskot from "../../assets/img/mascot_monggodesignheroes_2.png"
import PATH from "../../routers/path"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.customerName,
      openModalLogin: false,
      openModalLogout: false,
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      keyword: this.props.keyword,
      isAuthenticated: this.props.isAuthenticated,
      dropdownShow: null
    };
  }

  componentDidMount(){
    // this.getCustomerDetail()
  }

 
  handleInputSearchChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  closeModal = () => {
    this.setState({
      openModalLogin : false
    })
  }

  openModal = () => {
    if(this.props.isAuthenticated){
      this.setState({
        openModalLogout : true
      })
    }else{
      this.setState({
        openModalLogin : true
      })
    }
   
  }

  handleLogout = () => {
    this.props.logout();
    this.setState({
      openModalLogout : false,
      openModalLogin : false
    })
  };

  getCustomerDetail = async () => {
    try {
      const payload = await customer.customerDetail();
      this.setState({
        name: payload.data.name
      });
      this.render();
    } catch (error) {
      // console.log(error);
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ openModalLogin: flag });
  }

  handleVisibleLogout = (flag) => {
    this.setState({
      openModalLogout: flag
    })
  }

  showCustomerName = () => {
    const name = this.props.customerName;
    let resultName = name;
    if(name) {
      if(name.length > 8) {
          resultName = name.substr(0, 8) + "...";
      }  
    }
    return resultName;
  };

  renderAuthList = () => {
    return (
      <Dropdown onVisibleChange={this.handleVisibleLogout} visible={this.state.openModalLogout} overlay={this.userMenu()} trigger={["click"]}>
        <li className="ant-dropdown-link" href="#" style={{ display: "unset" }}>
          <span>{this.showCustomerName()}</span>
        </li>
      </Dropdown>
    );
  };

  renderNotAuthList = () => {
    return (
      <Dropdown onVisibleChange={this.handleVisibleChange} visible={this.state.openModalLogin} overlay={<Login closeModal={this.closeModal} />} trigger={["click"]}>
        <li className="ant-dropdown-link" href="#" style={{ display: "unset" }}>
          <span>{strings.log_in}</span>
        </li>
      </Dropdown>
    );
  };

  userMenu = () => (
    <Menu className="header__user-menu">
      <Menu.Item key="0">
        <Row type="flex" align="middle">
          <Col span={5}>
            <img src={maskot} width="50%" alt=""/>
          </Col>
          <Col span={19}>
            <div className="header__user-profile">Profile</div>
          </Col>
        </Row>
      </Menu.Item>
      <hr className="header__user-divider"></hr>    
        <Menu.Item  key="1"><Link to={PATH.DASHBOARD_CUSTOMER} className="header__user-li">Pesanan Saya</Link></Menu.Item>
        <Menu.Item  key="2"><div className="header__user-li">Pengaturan Privasi</div></Menu.Item>
        <Menu.Item  key="3"><div className="header__user-li">Hubungi Kami</div></Menu.Item>
        <Menu.Item  key="4">
          <div onClick={() =>this.handleLogout()} className="header__user-li">Log Out</div>
        </Menu.Item>
    </Menu>
  );

  showUserDropDown = isAuthenticated =>
    isAuthenticated === true ? this.renderAuthList() : this.renderNotAuthList();

  render() {
    const { keyword } = this.state;
    const { isAuthenticated, match } = this.props;
    const greeting = (
      <div className="header__greeting">
        {isAuthenticated !== true ? (
          <div>{strings.header_greeting}</div>
        ) : (
          <div>{strings.header_greeting_auth}</div>
        )}
      </div>
    );

    return (
      <div>
        <Row className="header__row">
          <Col md={24}>
            <div className="topHeader">
              <TopHeader />
            </div>
          </Col>
          <div className="header">
            <Col md={5}>
              <a href="/">
                <img
                  src={require("assets/img/monggopesen_logo.png")}
                  className="header__logo"
                  alt=""
                />
              </a>
            </Col>
            <Col md={13} className="header__search-box">
              <form action="/search">
                <Search
                  placeholder={strings.search_place_holder}
                  id="filter"
                  name="q"
                  value={keyword}
                  onChange={this.handleInputSearchChange.bind(this)}
                  className="header__search"
                />
              </form>
            </Col>
            <Col md={6} className="header__icon">
              <div>
                <img
                src={require("assets/img/icon_header.png")}
                alt="header_icon"
                />
              </div>
            </Col>
              <Col md={2}>
                <div className="header__categories">
                  <CategoryMenu match={match} />
                </div>
              </Col>
              <Col md={16}>
                <div className="header__menus">
                  <Link to="/" className="header__menu">
                    Lacak Pengiriman
                  </Link>
                  <Link to="/" className="header__menu">
                    Cara Belanja
                  </Link>
                  <Link to="/" className="header__menu">
                    Tentang Kami
                  </Link>
                  <Link to="/" className="header__menu">
                    Bantuan
                  </Link>
                  
                </div>
              </Col>
              <Col md={4}>
                <React.Fragment>{greeting}</React.Fragment>
              </Col>
              <Col md={2}>
                <div className="header__user-box">
                  <Icon
                    type="user"
                    onClick={() => this.openModal()}
                    className="header__user-icon"
                  />
                  {this.showUserDropDown(isAuthenticated)}
                  {/* <Icon style={{color: "#999999"}} type="down"></Icon> */}
                </div>
              </Col>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  checkError : state.authentication.checkError,
  customerName: state.authentication.customerName
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
