import React, { Component } from "react";
import { Icon, Menu } from "antd";
import CustomerOderNavigation from "../../containers/CustomerOrderNavigation";
import "./style.sass";
import ProfileCustomer from "../../containers/ProfileCustomer";

const { SubMenu } = Menu;

class CustomerNavigation extends Component {
  componentDidMount() {
    let keyTabs = this.props.match && this.props.match.params
    const tabsActive = this.props.match && keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    this.changeMenu(tabsActive)
    
  }

  changeMenu = menu => {
    switch (menu) {
      case "akun-saya":
        this.props.actionChangePage(<div style={{padding: "40px"}}><ProfileCustomer /></div>);
        break;
      case "pesanan":
        this.props.actionChangePage(<div className="customerOrderNavigation" style={{backgroundColor: "#FAFAFA"}}><CustomerOderNavigation /></div>);
        break;
      default:
        console.log('sukses');

    }
  };
  render() {
    let keyTabs = this.props.match && this.props.match.params
    const tabsActive = this.props.match && keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    return (
      <div className="dashboardUser">
        <Menu
          defaultSelectedKeys={[tabsActive]}
          mode="inline"
          defaultOpenKeys={["akun-saya"]}
          >
          <SubMenu
            key="akun-saya"
            title={
              <span>
                <Icon type="user" />
                Akun Saya
          </span>
            }>
            <Menu.Item key="akun-saya" onClick={() => this.changeMenu("akun-saya")}>Profile</Menu.Item>
            <Menu.Item key="">option2</Menu.Item>
            <Menu.Item key="">option3</Menu.Item>
            <Menu.Item key="">option4</Menu.Item>
          </SubMenu>
          <Menu.Item key="pesanan" onClick={() => this.changeMenu("pesanan")}>Pesanan Saya</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomerNavigation;
