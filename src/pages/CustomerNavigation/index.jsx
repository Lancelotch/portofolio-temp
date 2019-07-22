import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import CustomerOderNavigation from "../../containers/CustomerOrderNavigation";
import { Link } from "react-router-dom"
import "./style.sass";
import { CustomTabPane } from "../../components/CustomTabDashboard";


class CustomerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyTabs : ""
    };
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.setState({
      keyTabs : params
    })
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(props) {
    const params = props.match.params;
    this.setState({
      keyTabs : params
    })
  }

  render() {
    let keyTabs = this.props.match.params
    const tabsActive = keyTabs[Object.keys(keyTabs)[Object.keys(keyTabs).length - 1]];
    console.log(tabsActive);
    
    return (
      <div className="dashboardUser" style={{ marginTop: 20 }}>
        <Tabs defaultActiveKey={tabsActive} animated={false} tabPosition={"left"}>
          <CustomTabPane
            key={"akun-saya"}
            tab={
              <React.Fragment>
                <Icon type="rocket"
                  style={{
                    fontSize: 20,
                    color: "#999999"
                  }} />
                <span>{"Akun Saya"}</span>
              </React.Fragment>
            }
            className={"customerOrderNavigation"}
            my_prop={<p>TESS INI DI AKUN SAYA <Link to='/detail-dashboard-customrer'>Detail</Link></p>}
          />
          <CustomTabPane
            key={"pesanan"}
            tab={
              <React.Fragment>
                <Icon type="rocket"
                  style={{
                    fontSize: 20,
                    color: "#999999"
                  }} />
                <span>{"Pesanan Saya"}</span>
              </React.Fragment>
            }
            className={"customerOrderNavigation"}
            my_prop={<CustomerOderNavigation />}
          />
        </Tabs>
      </div>
    );
  }
}

export default CustomerNavigation;
