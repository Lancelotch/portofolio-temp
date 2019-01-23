import React, { Component } from "react";
import SidebarCustomer from "../../components/SidebarCustomer/SidebarCustomer";
import { Row, Col } from "antd";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../../sass/style.sass'

class DashboardCustomer extends Component {
  render() {
    let activeTab =
      this.props.match.params.tab == undefined
        ? 1
        : this.props.match.params.tab;

    return (
      <div>
        <Header />
        <div className="container">
          <Row>
            <SidebarCustomer activeTab={activeTab} />
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardCustomer;
