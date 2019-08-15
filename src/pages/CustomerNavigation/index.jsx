import React, { Component } from "react";
import { Icon, Menu } from "antd";
import CustomerOderNavigation from "../../containers/CustomerOrderNavigation";
import "./style.sass";
import AddressListDashboard from "../../containers/AddressListDashboard";
import ProfileCustomer from "../../containers/ProfileCustomer";
import ProfileMain from "../../containers/ProfileMain";
import PasswordDashboard from "../../containers/PasswordDashboard";
import strings from "../../localization/localization";

const { SubMenu } = Menu;

class CustomerNavigation extends Component {
  componentDidMount() {
    let keyTabs = this.props.match.params
    const tabsActive = keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    this.changeMenu(tabsActive)
  }

  changeMenu = menu => {
    switch (menu) {
      case "my-account":
        this.props.actionChangePage(<ProfileCustomer />);
        break;
      case "my":
        this.props.actionChangePage(<CustomerOderNavigation />);
        break;
      case "edit-address":
        this.props.actionChangePage(<AddressListDashboard />);
        break;
      case "password":
        this.props.actionChangePage(<PasswordDashboard />);
        break;
      default:
        console.log('sukses');

    }
  };
  render() {
    let keyTabs = this.props.match.params
    const tabsActive = keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    return (
      <div className="mp-dashboard-user">
        <ProfileMain />
        <Menu
          defaultSelectedKeys={[tabsActive]}
          mode="inline"
          defaultOpenKeys={['my-account']}
        >
          <SubMenu
            className="mp-dashboard-user__title"
            key={'my-account'}
            title={
              <span>
                <Icon type="user" style={{ fontSize: 19 }} />
                {strings.my_account}
          </span>
            }>
            <Menu.Item key="my-account" onClick={() => this.changeMenu("my-account")}>{strings.profile}</Menu.Item>
            <Menu.Item key="edit-address" onClick={() => this.changeMenu("edit-address")}>{strings.change_address}</Menu.Item>
            <Menu.Item key="password" onClick={() => this.changeMenu("password")}>{strings.password}</Menu.Item>
          </SubMenu>
          <Menu.Item key="my" className="mp-dashboard-user__title" onClick={() => this.changeMenu("my")}><Icon type="rocket" className="iconRocket" />Pesanan Saya</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomerNavigation;
