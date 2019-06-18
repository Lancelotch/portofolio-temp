import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown, Affix } from "antd";
import Search from "antd/lib/input/Search";
import Login from "components/Login";
import TopHeader from "../../components/TopHeader";
// import Categories from "components/Categories"
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
      openModalLogin: false,
      openModalLogout: false,
      isDataCategoryFeatureLoaded: false,
      sumProduct: 0,
      keyword: "",
      isAuthenticated: this.props.isAuthenticated,
      dropdownShow: null,
      allCategory: [],
      display: "",
      top: 0
      // isHover: false
    };
  }

  // handleHover = () => {
  //   this.setState(prevState => ({
  //     isHover: !prevState.isHover
  //   }))
  // }




  componentDidMount() {
    // this.getCustomerDetail()
    this.getAllCategory()
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  listenScrollEvent = e => {
    if (window.scrollY > 100) {
      this.setState({ display: "none" });
    } else if (window.scrollY < 900) {
      this.setState({ display: "" });
    }
  };

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

  closeModal = () => {
    this.setState({
      openModalLogin: false
    })
  }

  openModal = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        openModalLogout: true
      })
    } else {
      this.setState({
        openModalLogin: true
      })
    }

  }

  handleLogout = () => {
    this.props.logout();
    this.setState({
      openModalLogout: false,
      openModalLogin: false
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
    this.setState({
      openModalLogin: flag,
      openModalLogout: false
    });
  }

  handleVisibleLogout = (flag) => {
    this.setState({
      openModalLogout: flag,
      openModalLogin: false
    })
  }

  showCustomerName = () => {
    const name = this.props.customerName;
    let resultName = name;
    if (name) {
      if (name.length > 10) {
        resultName = name.substr(0, 10) + "...";
      }
    }
    return resultName;
  };

  renderAuthList = () => {
    return (
      <Dropdown onVisibleChange={this.handleVisibleLogout} visible={this.state.openModalLogout} overlay={this.userMenu()} trigger={["click"]}>
        <li className="ant-dropdown-link" href="#" style={{ display: "unset" }}>
          <span>{this.showCustomerName()}</span><Icon style={{ color: "#999999" }} type="down"></Icon>
        </li>
      </Dropdown>
    );
  };

  renderNotAuthList = () => {
    return (
      <Dropdown onVisibleChange={this.handleVisibleChange} visible={this.state.openModalLogin} overlay={<Login closeModal={this.closeModal} />} trigger={["click"]}>
        <li className="ant-dropdown-link" href="#" style={{ display: "unset" }}>
          <span>{strings.log_in}</span><Icon style={{ color: "#999999" }} type="down"></Icon>
        </li>
      </Dropdown>
    );
  };

  getValue = (value) => {
    history.push(`/search?q=${value}`)
  }

  getParams = () => {
    const { query } = getParamUrl(window.location)
    return query
  }

  userMenu = () => (
    <Menu className="header__user-menu">
      <Menu.Item key="0">
        <Row type="flex" align="middle">
          <Col span={5}>
            <img src={maskot} width="50%" alt="" />
          </Col>
          <Col span={19}>
            <div className="header__user-profile">Profile</div>
          </Col>
        </Row>
      </Menu.Item>
      <hr className="header__user-divider"></hr>
      <Menu.Item key="1"><Link to={PATH.DASHBOARD_CUSTOMER} className="header__user-li">Pesanan Saya</Link></Menu.Item>
      <Menu.Item key="2"><div className="header__user-li">Pengaturan Privasi</div></Menu.Item>
      <Menu.Item key="3"><div className="header__user-li">Hubungi Kami</div></Menu.Item>
      <Menu.Item key="4">
        <div onClick={() => this.handleLogout()} className="header__user-li">Log Out</div>
      </Menu.Item>
    </Menu>
  );

  showUserDropDown = isAuthenticated =>
    isAuthenticated === true ? this.renderAuthList() : this.renderNotAuthList();

  render() {
    // const { keyword } = this.state;
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
      <Affix offsetTop={this.state.top}>
        <Row className="header__row">
          <Col md={24} style={{ display: this.state.display }}>
            <div className="topHeader">
              <TopHeader />
            </div>
          </Col>
        </Row>
        <Row className="header">
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
            <form action="/search">
              <Search
                // placeholder={strings.search_place_holder}
                style={{
                  height: 35,
                  fontSize: 17,
                  width: 559
                }}
                id="filter"
                name="q"
                defaultValue={this.getParams()}
                onSearch={this.getValue}
                onChange={this.handleInputSearchChange.bind(this)}
                className="header__search"
              >
              </Search>
            </form>
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
          <Col md={5} style={{ display: "flex", justifyContent: "flex-end" }}>
            <React.Fragment>{greeting}</React.Fragment>
          </Col>
          <Col md={3} style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="header__user-box">
              <Icon
                type="user"
                onClick={() => this.openModal()}
                className="header__user-icon"
              />
              {this.showUserDropDown(isAuthenticated)}
            </div>
          </Col>
        </Row>
      </Affix>
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
