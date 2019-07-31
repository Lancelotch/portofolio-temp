import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown } from "antd";
import Search from "antd/lib/input/Search";
import Login from "components/Login";
import TopHeader from "../../components/TopHeader";
import { connect } from "react-redux";
import strings from "../../localization/localization";
import "./style.sass";
import "sass/style.sass";
import { logout } from "../../store/actions/authentication";
import customer from "../../api/services/customer";
import { Link } from "react-router-dom"
import maskot from "../../assets/img/mascot_monggodesignheroes_2.png"
import PATH from "../../routers/path"
import { getMethod } from "../../api/services"
import history from "../../routers/history"
import getParamUrl from "../../library/getParamUrl";
import CategoryMenuCascader from "../../components/CategoryMenu/cascaderMenu";



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.customerName,
      isShowUserMenu: false,
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      keyword: "",
      isAuthenticated: false,
      dropdownShow: null,
      allCategory: [],
      display: "",
      top: 0,
      marginTopDropdown: 0,
      overlayUserMenu: <Login />,
      isTopHeaderShow: true,
      topHeaderHeight: 50,
      headerHeight: 0,      
      wrapHeaderPosition: "absolute"
    };
    this.listenWindowScroll = this.listenScrollEvent.bind(this);
    this.listenWindowResize = this.listenResizeEvent.bind(this);
  }

  componentDidMount() {
    this.getAllCategory()
    window.addEventListener("scroll", this.listenWindowScroll);
    window.addEventListener("resize", this.listenResizeEvent);
    window.addEventListener("load", () => {
      this.updateHeaderHeight();
    })
    this.updateHeaderHeight();
    this.fixPosition();
    this.setState({
      isAuthenticated: this.props.isAuthenticated,
    }, () => this.updateOverlayUserMenu(this.props.isAuthenticated))
  }

  listenScrollEvent = e => {
    this.fixPosition();
  };

  fixPosition = () => {
    if (window.scrollY > this.state.topHeaderHeight) {
      this.setState({ display: "none", wrapHeaderPosition: "fixed", isTopHeaderShow: false, marginTopDropdown: 0 });
    } else if (window.scrollY < this.state.topHeaderHeight) {
      let marginTopDropdown = this.state.topHeaderHeight - window.scrollY;
      this.setState({ display: "", wrapHeaderPosition: "absolute", isTopHeaderShow: true, marginTopDropdown: marginTopDropdown });
    }
  }

  listenResizeEvent = e => {
    this.updateHeaderHeight();
  }

  updateHeaderHeight = () => {
    let bottomHeaderHeight = document.getElementById("bottomHeader").scrollHeight;
    let headerHeight = this.state.topHeaderHeight + bottomHeaderHeight;
    this.setState({
      headerHeight: headerHeight
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenWindowScroll);
    window.removeEventListener("resize", this.listenResizeEvent);
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated !== this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: props.isAuthenticated,
        isShowUserMenu: false,
      }, () => this.updateOverlayUserMenu(props.isAuthenticated));
    }
  }

  updateOverlayUserMenu = (isAuthenticated) => {
    this.setState({
      overlayUserMenu: isAuthenticated === true ? this.userMenu() : <Login />
    })
  }

  getAllCategory = async () => {
    try {
      const response = await getMethod(PATH.GET_CATEGORY)
      this.setState({
        allCategory: [...this.state.allCategory, ...response.data]
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleInputSearchChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  getCustomerDetail = async () => {
    try {
      const customerDetail = await customer.customerDetail();
      this.setState({
        name: customerDetail.data.name
      });
      this.render();
    } catch (error) {
      console.log(error);
    }
  };

  dropDownTriggerAuth = () => {
    return (
      <div style={{ display: "flex" }}>
        <div className="header-ellipsis">
          <span>{this.props.customerName}</span>
        </div>
        <Icon className="header__name-icon" type="down" />
      </div>
    );
  };

  dropDownTriggerNotAuth = () => {
    return (
      <div style={{ display: "flex" }}>
        <span>{strings.log_in}</span>
        <Icon className="header__name-icon" type="down" />
      </div>
    );
  };

  handleLogout = () => {
    this.props.logout();
  };

  isUrlIsCategory = value => {
    if (value === (history.push(`/search?q=${value}`))) return value;
    else return (history.push(`/search?q=${value}`));
  }

  getValue = (value) => {
    return value ? this.isUrlIsCategory(value) : false
  }

  getParams = () => {
    const { query } = getParamUrl(window.location)
    return query
  }


  userMenu = () => {
  
    return (
      <Menu className="header__user-menu">
        <Menu.Item key="0">
          <Row type="flex" align="middle">
            <Col md={5}>
              <img src={maskot} width="50%" alt="" />
            </Col>
            <Col md={19}>
              <Link to={"/dashboard-customer/my-order/my-account"} replace className="header__user-profile">Profile</Link>
            </Col>
          </Row>
        </Menu.Item>
        <hr className="header__user-divider"></hr>
        <Menu.Item key="1"><Link to={"/dashboard-customer/my-order"} replace className="header__user-li">Pesenan Saya</Link></Menu.Item>
        <Menu.Item key="2"><Link to={"/"} className="header__user-li">Pengaturan Privasi</Link></Menu.Item>
        <Menu.Item key="3"><Link to={"/"} className="header__user-li">Hubungi Kami</Link></Menu.Item>
        <Menu.Item key="4">
          <div onClick={() => this.handleLogout()} className="header__user-li">Log Out</div>
        </Menu.Item>
      </Menu>
    )
  };

  showUserMenu = () => {
    this.setState({
      isShowUserMenu: true
    });
  }

  hideUserMenu = () => {
    this.setState({
      isShowUserMenu: false
    });
  }

  render() {
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
    const dropdownTriggerUserMenu = this.state.isAuthenticated === true ? this.dropDownTriggerAuth() : this.dropDownTriggerNotAuth();
    return (
      <React.Fragment>
      <div className="header-fixed" style={{ position: this.state.wrapHeaderPosition }}>
        <Row id="topHeader" className="header__row">
          <Col md={24} style={{ display: this.state.display }}>
            <div className="topHeader">
              <TopHeader />
            </div>
          </Col>
        </Row>
        <Row id="bottomHeader" className="header">
          <Col md={5}>
            <Link to="/">
              <img
                src={require("assets/img/monggopesen_logo.png")}
                className="header__logo"
                alt=""
              />
            </Link>
          </Col>
          <Col md={15} className="header__search-box">
            <Search
              placeholder={strings.search_place_holder}
              style={{
                height: 35,
                fontSize: 17,
                width: 559
              }}
              id="filter"
             // enterButton
              name="q"
              defaultValue={this.getParams()}
              onSearch={this.getValue}
              onChange={this.handleInputSearchChange.bind(this)}
              className="header__search" />
          </Col>
          <Col md={4}>
            <div>
              <img
                src={require("assets/img/icon_header.png")}
                alt="header_icon"
                className="header__icon"
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="header__categories" key={""}>
              <CategoryMenuCascader key={"id"} match={match} allCategory={this.state.allCategory} />
            </div>
          </Col>
          <Col md={14}>
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
          <Col md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <React.Fragment>{greeting}</React.Fragment>
            <div onClick={this.showUserMenu} className="header__user-box">
              <Icon
                type="user"                
                className="header__user-icon"
              />
              <div className="wrap-header-dropdown">
                <Dropdown onVisibleChange={this.hideUserMenu} visible={this.state.isShowUserMenu} overlayStyle={{position:"fixed", marginTop:this.state.marginTopDropdown}} overlay={this.state.overlayUserMenu} trigger={["click"]}>
                  {dropdownTriggerUserMenu}
                </Dropdown>  
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{height: this.state.headerHeight}}></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  checkError: state.authentication.checkError,
  customerName: state.authentication.customerName
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
