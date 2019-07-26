import React, { Component } from "react";
import { Icon, Menu } from "antd";
import CustomerOderNavigation from "../../containers/CustomerOrderNavigation";
import "./style.sass";
import AddressListDashboard from "../../containers/AddressListDashboard";

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
        this.props.actionChangePage(<h1>Dashboard</h1>);
        break;
      case "my":
        this.props.actionChangePage(<CustomerOderNavigation />);
        break;
      case "edit-address":
        this.props.actionChangePage(<AddressListDashboard />);
        break;
      default:
        console.log('sukses');

    }
  };
  render() {
    let keyTabs = this.props.match.params
    const tabsActive = keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    return (
      <div className="dashboardUser">
        <Menu
          defaultSelectedKeys={[tabsActive]}
          mode="inline"
          defaultOpenKeys={['my-account']}
        >
          <SubMenu
            className="dashboardUser__Title"
            key={'my-account'}
            title={
              <span>
                <Icon type="user" style={{fontSize:19}} />
                Akun Saya
          </span>
            }>
            <Menu.Item key="my-account" onClick={() => this.changeMenu("my-account")}>Profile</Menu.Item>
            <Menu.Item key="edit-address" onClick={() => this.changeMenu("edit-address")}>Ubah Alamat</Menu.Item>
            <Menu.Item key="ads">option3</Menu.Item>
            <Menu.Item key="asd">option4</Menu.Item>
          </SubMenu>
          <Menu.Item key="my" className="dashboardUser__Title" onClick={() => this.changeMenu("my")}><Icon type="rocket" className="iconRocket" />Pesanan Saya</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomerNavigation;
