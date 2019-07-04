import React, { Component } from "react";
import { Tabs, Spin, Alert } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaitingInDelivery from "../OrderListWaitingInDelivery";
import OrderListWaitingFinish from "../OrderListWaitingFinish";
import OrderListWaitingNotSent from "../OrderListWaitingNotSent";
import OrderListWaitingNotPay from "../OrderListWaitingNotPay";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import OrderDetailsCancel from "../OrderDetailsCancel";
import OrderListWaitingCancel from "../OrderListWaitingCancel";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import NoOrderHistory from "../../components/NoOrderHistory";
import { Offline, Online, Detector } from "react-detect-offline";

const keyFnNames = {
  '1': 'updateTabNotPay',
  '2': 'updateTabNotSent',
  '3': 'updateTabInDelivery',
  '4': 'updateTabFinish',
  '5': 'updateTabCancel'
};

const polling = {
  enabled: false,
  interval: 2000,
  timeout: 1000
};

class CustomerOderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowOrderDetailsDashboard: false,
      order: [],
      activeKey: "1",
      isLoading: false,
      productOrderNotYetPay: [],
      productOrderNotYetSent: [],
      productOrderInDelivery: [],
      productOrderFinish: [],
      productOrderCancel: [],
      isShowImageEmpety: false
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    })
  }

  componentDidMount() {
    this.productOrderTabsNotYetPay();
  };


  actionShowOrderListWaiting = () => {
    this.setState({
      isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
    });
  };

  actionShowOrderDetailsDashboard = (order) => {
    this.actionShowOrderListWaiting();
    this.setState({
      order: order
    })
  };

  productOrderTabsNotYetPay = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD+0);
      this.setState({
        productOrderNotYetPay: response.data.data
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isShowImageEmpety: true, isLoading: false });
      }
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD+1);
      console.log(response);
      
      this.setState({
        productOrderNotYetSent: response.data.data
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isShowImageEmpety: true, isLoading: false });
      }
    }
  };

  productOrderTabsInDelivery = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      this.setState({
        productOrderInDelivery: response.data.data
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isShowImageEmpety: true, isLoading: false });
      }
    }
  };

  productOrderTabsFinish = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      this.setState({
        productOrderFinish: response.data.data
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isShowImageEmpety: true, isLoading: false });
      }
    }
  };

  productOrderTabsCancel = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_CANCEL);
      this.setState({
        productOrderCancel: response.data.data
      });
    } catch (error) {
      if (error.message) {
        this.setState({ isShowImageEmpety: true, isLoading: false });
      }
    }
  };

  updateTabNotPay = () => {
    this.setState({
      productOrderNotYetPay: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsNotYetPay());
  };

  updateTabNotSent = () => {
    this.setState({
      productOrderNotYetSent: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsNotYetSent());
  };

  updateTabInDelivery = () => {
    this.setState({
      productOrderInDelivery: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsInDelivery());
  };

  updateTabFinish = () => {
    this.setState({
      productOrderFinish: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsFinish());
  };

  updateTabCancel = () => {
    this.setState({
      productOrderCancel: [],
      isLoading: true,
      isShowOrderDetailsDashboard: false
    }, () => this.productOrderTabsCancel());
  };

  handleChange = (selectedkey) => {
    this.setState({ activeKey: selectedkey })
    const fnName = keyFnNames[selectedkey];
    if (fnName) {
      this[fnName]();
    }
  };

  render() {
    return (
      <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
        <CustomTabPane
          key={"1"}
          tab={<span>{"Belum Bayar"}</span>}
          my_prop={
            <React.Fragment>
              <Offline polling={polling}>
                <div style={{ backgroundColor: "red", padding: 15, color: "#FFFFFF", fontSize: 16 }}>
                  Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?
                </div>
              </Offline>
              <Online polling={polling}>
                {this.state.productOrderNotYetPay.length < 1 ?
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                    <Spin tip="Loading..." spinning={this.state.isLoading} delay={500} />
                    {this.state.isShowImageEmpety && <NoOrderHistory />}
                  </div> :
                  this.state.isShowOrderDetailsDashboard === false ?
                    <OrderListWaitingNotPay
                      productOrderNotYetPay={this.state.productOrderNotYetPay}
                      actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                      tabsNotPay={1}
                    /> :
                    <OrderDetailsDashboard
                      order={this.state.order}
                      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                      labelTabDetails={"Belum Bayar"}
                      tabsNotPay={1}
                    />
                }
              </Online>
            </React.Fragment>
          }
        />
        <CustomTabPane
          key={"2"}
          tab={<span>{"Sedang Diproses"}</span>}
          my_prop={
            <React.Fragment>
              <Offline polling={polling}>
                <Alert
                  message="Error"
                  description="Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?"
                  type="error"
                  showIcon
                />
              </Offline>
              <Detector
                render={() => (
                  this.state.productOrderNotYetSent.length < 1 ?
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                      <Spin tip="Loading..." spinning={this.state.isLoading} delay={500} />
                      {this.state.isShowImageEmpety && <NoOrderHistory />}
                    </div> :
                    this.state.isShowOrderDetailsDashboard === false ?
                      <OrderListWaitingNotSent
                        actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                        productOrderNotYetSent={this.state.productOrderNotYetSent}
                        tabsNotSent={2}
                      /> :
                      <OrderDetailsDashboard orderId={this.state.orderId}
                        actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                        labelTabDetails={"Belum Dikirim"}
                        tabsNotSent={2}
                      />)}
              />
            </React.Fragment>
          }
        />
        <CustomTabPane
          key={"3"}
          tab={<span>{"Dalam Pengiriman"}</span>}
          my_prop={
            <React.Fragment>
              <Offline polling={polling}>
                Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?
          </Offline>
              <Detector
                render={() => (
                  <Online polling={polling}>
                    {this.state.productOrderInDelivery.length < 1 ?
                      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                        <Spin tip="Loading..." spinning={this.state.isLoading} delay={500} />
                        {this.state.isShowImageEmpety && <NoOrderHistory />}
                      </div>
                      :
                      this.state.isShowOrderDetailsDashboard === false ?
                        <OrderListWaitingInDelivery
                          productOrderInDelivery={this.state.productOrderInDelivery}
                          actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                          tabsInDelivery={3}
                        /> :
                        <OrderDetailsDashboard orderId={this.state.orderId}
                          actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                          labelTabDetails={"Dalam Pengiriman"}
                          estimateAccepted={"Perkiraan Diterima"}
                          tabsInDeliveryOrderStatusUser={3}
                          tabsNotSent={2}
                          tabsInDelivery={3}
                        />}
                  </Online>
                )}
              />
            </React.Fragment>
          }
        />
        <CustomTabPane
          key={"4"}
          tab={<span>{"Selesai"}</span>}
          my_prop={
            <React.Fragment>
              <Offline polling={polling}>
                Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?
          </Offline>
              <Detector
                render={() => (
                  <Online polling={polling}>
                    {this.state.productOrderFinish.length < 1 ?
                      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                        <Spin tip="Loading..." spinning={this.state.isLoading} delay={500} />
                        {this.state.isShowImageEmpety && <NoOrderHistory />}
                      </div>
                      :
                      this.state.isShowOrderDetailsDashboard === false ?
                        <OrderListWaitingFinish
                          productOrderFinish={this.state.productOrderFinish}
                          actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                          tabsFinish={4}
                        /> :
                        <OrderDetailsDashboard orderId={this.state.orderId}
                          actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                          labelTabDetails={"Finish"}
                          estimateAccepted={"Pesenan Diterima"}
                          tabsFinishOrderStatusUser={4}
                          tabsNotSent={2}
                          tabsInDelivery={3}
                          tabsFinish={4}
                        />

                    }
                  </Online>
                )}
              />
            </React.Fragment>
          } />
        <CustomTabPane
          key={"5"}
          tab={<span>{"Batal"}</span>}
          my_prop={
            <React.Fragment>
              <Offline polling={polling}>
                Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?
              </Offline>
              <Detector
                render={() => (
                  <Online polling={polling}>
                    {
                      this.state.productOrderCancel.length < 1 ?
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                          <Spin tip="Loading..." spinning={this.state.isLoading} delay={500} />
                          {this.state.isShowImageEmpety && <NoOrderHistory />}
                        </div>
                        :
                        this.state.isShowOrderDetailsDashboard === false ?
                          <OrderListWaitingCancel
                            productOrderCancel={this.state.productOrderCancel}
                            actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
                          /> :
                          <OrderDetailsCancel orderId={this.state.orderId}
                            actionShowOrderListWaiting={() => this.actionShowOrderListWaiting()}
                            tabsCancel={5}
                          />
                    }
                  </Online>
                )}
              />
            </React.Fragment>
          }
        />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
