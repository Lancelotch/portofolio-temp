import React, { Component } from "react";
import { Tabs, Spin, Alert, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaiting from "../OrderListWaiting";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import NoOrderHistory from "../../components/NoOrderHistory";
import { Offline, Online, Detector } from "react-detect-offline";
import strings from "../../localization/localization";
import { patchService } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

const confirm = Modal.confirm;

const polling = {
  enabled: false,
  interval: 30000,
  timeout: 1000
};

class CustomerOderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailDashboard: false,
      isShowOrderDetailsDashboardNotPay: false,
      isShowOrderDetailsDashboardInDelivery: false,
      isShowOrderDetailsDashboardNotSent: false,
      isShowOrderDetailsDashboardFinish: false,
      isShowOrderDetailsDashboardCancel: false,
      order: [],
      activeKey: "1",
      isLoading: false,
      productOrder: [],
      invoiceNumber: "",
      id: "",
      stateReceivedOrder: [],
      index: 0,
      display: "",
      isProductAlvailabel: false
    };
  }

  componentDidMount() {
    this.productOrderTabs(0);
  }

  showReceivedConfirm = (allOrder, index, orderId) => {
    console.log('allOrder', allOrder);
    console.log('index', index);
    confirm({
      iconClassName: "iconWaitingPaymentCancel",
      title: strings.tab_belum_bayar,
      content: strings.tabs_belum_bayar_pesan_batalkan,
      okText: strings.cancel,
      okType: "danger",
      cancelText: strings.back,
      centered: true,
      onOk: () => {
        this.actionReceivedConfirm(orderId);
      },
    });
  };

  actionReceivedConfirm = async (index) => {
    console.log('actionCancelConfirm', index);
    try {
      const orderId = index
      const response = await patchService(PATH_ORDER.ORDER_BY_RECEIVED + orderId);
      if(response.code === 200 || response.code === "200") {
        this.props.actionUpdateTab(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  actionShowOrderListWaiting = (listener) => {
    this.setState({
      [listener]: !this.state[listener],
      isShowDetailDashboard: !this.state.isShowDetailDashboard
    })
  }

  actionShowOrderDetailsDashboardNotPay = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaiting("isShowOrderDetailsDashboardNotPay");
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardNotSent = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaiting("isShowOrderDetailsDashboardNotSent");
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardInDelivery = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaiting("isShowOrderDetailsDashboardInDelivery")
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardFinish = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaiting("isShowOrderDetailsDashboardFinish")
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardCancel = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaiting("isShowOrderDetailsDashboardCancel")
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  responseDetailDashboard(order, invoiceNumber, id, index) {
    this.setState({
      order: order,
      invoiceNumber: invoiceNumber,
      id: id,
      index: index
    })
  };

  productOrderTabs = async (value) => {
    this.setState({ isLoading: true })
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + value);
      console.log('productordertabsnotpay', response);
      if (response.data.data) {
        this.setState({
          productOrder: response.data.data,
          isLoading: false,
          isProductAlvailabel: false
        });
        console.log("masuk if",this.state.isLoading)
        console.log('productOrder ====>', this.state.productOrder);
      }
        if (response.data.data.length < 1) {
          this.setState({
            isProductAlvailabel: true
          })
        }
    } catch (error) {
      this.setState({ isLoading: false, isProductAlvailabel: true });
    }
  };

  loadingItems(value) {
    console.log('valueeee', value);

    return <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      {value && <Spin spinning={value} />}
    </div>
  }

  updateTab = (functions) => {
    this.setState({
      productOrder: []
    }, () => functions());
  };

  handleChange = (selectkey) => {
    this.setState({ activeKey: selectkey })
    switch (selectkey) {
      case "1":
        this.updateTab(() => this.productOrderTabs(0));
        break;
      case "2":
        this.updateTab(() => this.productOrderTabs(1));
        break;
      case "3":
        this.updateTab(() => this.productOrderTabs(2));
        break;
      case "4":
        this.updateTab(() => this.productOrderTabs(3));
        break;
      case "5":
        this.updateTab(() => this.productOrderTabs(4));;
        break;
      default:
        console.log("error");
    }
  }

  alertOffline = () => {
    return <Alert
      message="Error"
      description="Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?"
      type="error"
      showIcon
    />
  }

  actionUpdateTab = (tabPosition) => {
    this.productOrderTabs(tabPosition);
  }


  responseListWaiting(
    responseProductOrder,
    showReceivedConfirm,
    tabsNotPay,
    tabsNotSent,
    tabsInDelivery,
    tabsFinish,
    tabsCancel) {
    return <OrderListWaiting
      productOrder={responseProductOrder}
      actionUpdateTab={this.actionUpdateTab}
      actionShowOrderDetailsDashboardNotPay={this.actionShowOrderDetailsDashboardNotPay}
      actionShowOrderDetailsDashboardNotSent={this.actionShowOrderDetailsDashboardNotSent}
      actionShowOrderDetailsDashboardInDelivery={this.actionShowOrderDetailsDashboardInDelivery}
      actionShowOrderDetailsDashboardFinish={this.actionShowOrderDetailsDashboardFinish}
      actionShowOrderDetailsDashboardCancel={this.actionShowOrderDetailsDashboardCancel}
      showReceivedConfirm={showReceivedConfirm}
      tabsNotPay={tabsNotPay}
      tabsNotSent={tabsNotSent}
      tabsInDelivery={tabsInDelivery}
      tabsFinish={tabsFinish}
      tabsCancel={tabsCancel}
    />
  }

  responseOrderDetailsDashboard(
    labelTabDetails,
    labelEstimateAccepted,
    tabsInDeliveryOrderStatusUser,
    tabsFinishOrderStatusUser,
    tabsNotPay,
    tabsNotSent,
    tabsInDelivery,
    tabsFinish,
    tabsCancel,
    buttonTabsNotPay,
    buttonTabsNotSent,
    buttonTabsInDelivery,
    buttonTabsFinish,
    buttonTabsCancel) {
    return <OrderDetailsDashboard
      invoiceNumber={this.state.invoiceNumber}
      indexDetails={this.state.index}
      id={this.state.id}
      order={this.state.order}
      showReceivedConfirm={this.showReceivedConfirm}
      productOrderInDelivery={this.state.productOrder}
      actionShowOrderListWaitingNotPay={() => this.actionShowOrderListWaiting("isShowOrderDetailsDashboardNotPay")}
      actionShowOrderListWaitingNotSent={() => this.actionShowOrderListWaiting("isShowOrderDetailsDashboardNotSent")}
      actionShowOrderListWaitingInDelivery={() => this.actionShowOrderListWaiting("isShowOrderDetailsDashboardInDelivery")}
      actionShowOrderListWaitingFinish={() => this.actionShowOrderListWaiting("isShowOrderDetailsDashboardFinish")}
      actionShowOrderListWaitingCancel={() => this.actionShowOrderListWaiting("isShowOrderDetailsDashboardCancel")}
      labelTabDetails={labelTabDetails}
      estimateAccepted={labelEstimateAccepted}
      tabsInDeliveryOrderStatusUser={tabsInDeliveryOrderStatusUser}
      tabsFinishOrderStatusUser={tabsFinishOrderStatusUser}
      tabsNotPay={tabsNotPay}
      tabsNotSent={tabsNotSent}
      tabsInDelivery={tabsInDelivery}
      tabsFinish={tabsFinish}
      tabsCancel={tabsCancel}
      buttonTabsNotPay={buttonTabsNotPay}
      buttonTabsNotSent={buttonTabsNotSent}
      buttonTabsInDelivery={buttonTabsInDelivery}
      buttonTabsFinish={buttonTabsFinish}
      buttonTabsCancel={buttonTabsCancel} />
  }

  render() {
    const {
      isShowDetailDashboard,
      isShowOrderDetailsDashboardNotPay,
      isShowOrderDetailsDashboardInDelivery,
      isShowOrderDetailsDashboardNotSent,
      isShowOrderDetailsDashboardFinish,
      isShowOrderDetailsDashboardCancel
    } = this.state
    return (
      <React.Fragment>
        <ScrollToTopOnMount />
        {isShowDetailDashboard === false ?
          <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
            <CustomTabPane
              key={"1"}
              tab={<span>{"Belum Bayar"}</span>}
              my_prop={
                <React.Fragment>
                  <Offline polling={polling}>
                    {this.alertOffline()}
                  </Offline>
                  <Online polling={polling}>
                    {this.state.isLoading ?
                      this.loadingItems(this.state.isLoading) :
                      this.responseListWaiting(this.state.productOrder, "", 1)
                    }
                    {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                  </Online>
                </React.Fragment>} />
            <CustomTabPane
              key={"2"}
              tab={<span>{"Sedang Diproses"}</span>}
              my_prop={
                <React.Fragment>
                  <Offline polling={polling}>
                    {this.alertOffline()}
                  </Offline>
                  <Detector
                    render={() =>
                      <React.Fragment>
                        {this.state.isLoading ?
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting(this.state.productOrder, "", "", 2)}
                        {this.state.isLoading === true ?false : this.state.isProductAlvailabel && <NoOrderHistory />}
                      </React.Fragment>
                    } />
                </React.Fragment>} />
            <CustomTabPane
              key={"3"}
              tab={<span>{"Dalam Pengiriman"}</span>}
              my_prop={
                <React.Fragment>
                  <Offline polling={polling}>
                    {this.alertOffline()}
                  </Offline>
                  <Detector
                    render={() => (
                      <Online polling={polling}>
                        {this.state.isLoading ?
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting(this.state.productOrder, this.showReceivedConfirm, "", "", 3)}
                        {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                      </Online>)} />
                </React.Fragment>} />
            <CustomTabPane
              key={"4"}
              tab={<span>{"Selesai"}</span>}
              my_prop={
                <React.Fragment>
                  <Offline polling={polling}>
                    {this.alertOffline()}
                  </Offline>
                  <Detector
                    render={() => (
                      <Online polling={polling}>
                        {this.state.isLoading ?
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting(this.state.productOrder, "", "", "", "", 4)}
                        {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                      </Online>
                    )}
                  />
                </React.Fragment>} />
            <CustomTabPane
              key={"5"}
              tab={<span>{"Batal"}</span>}
              my_prop={
                <React.Fragment>
                  <Offline polling={polling}>
                    {this.alertOffline()}
                  </Offline>
                  <Detector
                    render={() => (
                      <Online polling={polling}>
                        {this.state.isLoading ?
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting(this.state.productOrder, "", "", "", "", "", 5)}
                        {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                      </Online>)} />
                </React.Fragment>} />
          </Tabs>
          :
          <React.Fragment>
            {isShowOrderDetailsDashboardNotPay && this.responseOrderDetailsDashboard("Belum Bayar", "", "hiddenDeliveryOrderStatusUser", "hiddenfinishorderuser", 1, "hiddentabsnotsent", "hiddentabsindelivery", "hiddentabsfinish", "hiddentabscancel", "buttonTabsNotPay")}
            {isShowOrderDetailsDashboardNotSent && this.responseOrderDetailsDashboard("Belum Dikirim", "", "hiddenDeliveryOrderStatusUser", "hiddenfinishorderuser", "hiddentabsnotpay", 2, "hiddentabsindelivery", "hiddentabsfinish", "hiddentabscancel", "hiddenbuttontabnotpay", "buttonTabsNotSent")}
            {isShowOrderDetailsDashboardInDelivery && this.responseOrderDetailsDashboard("Dalam Pengiriman", "Perkiraan Diterima", 3, "hiddenFinishOrderStatusUser", "hiddentabsnotpay", 2, 3, "hiddentabsfinish", "hiddentabscancel", "hiddenbuttontabnotpay", "hiddenbuttontabnotsent", "buttonTabsInDelivery")}
            {isShowOrderDetailsDashboardFinish && this.responseOrderDetailsDashboard("Finish", "Pesenan Diterima", "hiddendeliveryhorderstatususer", 4, "hiddentabsnotpay", 2, 3, 4, "hiddentabscancel", "hiddenbuttonnotpay", "hiddenbuttontabsnotsent", "hiddenbuttonindelivery", "buttonTabsFinish")}
            {isShowOrderDetailsDashboardCancel && this.responseOrderDetailsDashboard("Batal", "Pesenan Diterima", "hiddendeliveryhorderstatususer", "hiddenfinishorderstatususer", "hiddentabsnotpay", "hiddentabsnotsent", "hiddentabsindelivery", "hiddentabsfinish", 5, "hiddenbuttonnotpay", "hiddenbuttontabsnotsent", "hiddenbuttonindelivery", "hiddenbuttonfinish", "buttonTabsCancel")}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default CustomerOderNavigation;
