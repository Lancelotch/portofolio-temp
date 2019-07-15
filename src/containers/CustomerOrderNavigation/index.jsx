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
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isShowOrderDetailsDashboardNotPay: false,
      isShowOrderDetailsDashboardInDelivery: false,
      isShowOrderDetailsDashboardNotSent: false,
      isShowOrderDetailsDashboardFinish: false,
      isShowOrderDetailsDashboardCancel: false,
      order: [],
      activeKey: "1",
      isLoading: false,
      productOrderNotYetPay: [],
      productOrderNotYetSent: [],
      productOrderInDelivery: [],
      productOrderFinish: [],
      productOrderCancel: [],
      invoiceNumber: "",
      id: "",
      stateReceivedOrder: [],
      index: 0,
      display: ""
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    })
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.productOrderTabsNotYetPay();
  };

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
        const receivedOrder = allOrder.splice(index, 1)
        const newOrder = [...allOrder]
        this.setState({
          productorder: newOrder,
          stateReceivedOrder: [...this.state.stateReceivedOrder, ...receivedOrder]
        })
        console.log(orderId)
        this.actionReceivedConfirm(orderId);
      },
    });
  };

  actionReceivedConfirm = async (index) => {
    console.log('actionCancelConfirm', index);
    try {
      const orderId = index
      const response = await patchService(PATH_ORDER.ORDER_BY_RECEIVED + orderId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  actionShowOrderListWaitingNotPay = () => {
    this.setState({
      isShowOrderDetailsDashboardNotPay: !this.state.isShowOrderDetailsDashboardNotPay
    })
  }

  actionShowOrderListWaitingNotSent = () => {
    this.setState({
      isShowOrderDetailsDashboardNotSent: !this.state.isShowOrderDetailsDashboardNotSent
    })
  }

  actionShowOrderListWaitingInDelivery = () => {
    this.setState({
      isShowOrderDetailsDashboardInDelivery: !this.state.isShowOrderDetailsDashboardInDelivery
    })
  };

  actionShowOrderListWaitingFinish = () => {
    this.setState({
      isShowOrderDetailsDashboardFinish: !this.state.isShowOrderDetailsDashboardFinish
    })
  }

  actionShowOrderListWaitingCancel = () => {
    this.setState({
      isShowOrderDetailsDashboardCancel: !this.state.isShowOrderDetailsDashboardCancel
    })
  }

  actionShowOrderDetailsDashboardNotPay = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaitingNotPay();
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardNotSent = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaitingNotSent();
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardInDelivery = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaitingInDelivery()
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardFinish = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaitingFinish()
    this.responseDetailDashboard(order, invoiceNumber, id, index);
  };

  actionShowOrderDetailsDashboardCancel = (order, invoiceNumber, id, index) => {
    this.actionShowOrderListWaitingCancel()
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

  productOrderTabsNotYetPay = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + 0);
      this.setState({
        productOrderNotYetPay: response.data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  productOrderTabsNotYetSent = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + 1);
      this.setState({
        productOrderNotYetSent: response.data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  productOrderTabsInDelivery = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + 2);
      this.setState({
        productOrderInDelivery: response.data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  productOrderTabsFinish = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + 3);
      this.setState({
        productOrderFinish: response.data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  productOrderTabsCancel = async () => {
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + 4);
      this.setState({
        productOrderCancel: response.data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

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
    />}

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
      productOrderInDelivery={this.state.productOrderInDelivery}
      actionShowOrderListWaitingNotPay={() => this.actionShowOrderListWaitingNotPay()}
      actionShowOrderListWaitingNotSent={() => this.actionShowOrderListWaitingNotSent()}
      actionShowOrderListWaitingInDelivery={() => this.actionShowOrderListWaitingInDelivery()}
      actionShowOrderListWaitingFinish={() => this.actionShowOrderListWaitingFinish()}
      actionShowOrderListWaitingCancel={() => this.actionShowOrderListWaitingCancel()}
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

  loadingItems() {
    return <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      {this.state.isLoading === true ? <Spin spinning={this.state.isLoading} /> : <NoOrderHistory />}
    </div>;
  }

  updateTabNotPay = () => {
    this.setState({
      productOrderNotYetPay: [],
      isLoading: true,
      isShowOrderDetailsDashboardNotPay: false
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
      isShowOrderDetailsDashboardInDelivery: false
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

  alertOffline = () => {
    return <Alert
      message="Error"
      description="Oooops Internet Anda Terputus, Coba cek modem sudah bayar apa belum ?"
      type="error"
      showIcon
    />
  }

  render() {
    const {
      isShowOrderDetailsDashboardNotPay,
      isShowOrderDetailsDashboardInDelivery,
      isShowOrderDetailsDashboardNotSent,
      isShowOrderDetailsDashboardFinish,
      isShowOrderDetailsDashboardCancel
    } = this.state
    return (
      <React.Fragment>
        <ScrollToTopOnMount />
        {isShowOrderDetailsDashboardNotPay === false &&
          isShowOrderDetailsDashboardInDelivery === false &&
          isShowOrderDetailsDashboardNotSent === false &&
          isShowOrderDetailsDashboardFinish === false &&
          isShowOrderDetailsDashboardCancel === false ?
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
                    {this.state.productOrderNotYetPay.length < 1 ?
                      this.loadingItems()
                      :
                      this.responseListWaiting(this.state.productOrderNotYetPay, "", 1)}
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
                      this.state.productOrderNotYetSent.length < 1 ?
                        this.loadingItems() : this.responseListWaiting(this.state.productOrderNotYetSent, "", "", 2)} />
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
                        {this.state.productOrderInDelivery.length < 1 ?
                          this.loadingItems() : this.responseListWaiting(this.state.productOrderInDelivery, this.showReceivedConfirm, "", "", 3)}
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
                        {this.state.productOrderFinish.length < 1 ?
                          this.loadingItems() : this.responseListWaiting(this.state.productOrderFinish, "", "", "", "", 4)}
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
                        {this.state.productOrderCancel.length < 1 ?
                          this.loadingItems() : this.responseListWaiting(this.state.productOrderCancel, "", "", "", "", "", 5)}
                      </Online>)} />
                </React.Fragment>} />
          </Tabs>
          :
          <React.Fragment>
            {isShowOrderDetailsDashboardNotPay && this.responseOrderDetailsDashboard("Belum Bayar", "", "", "", 1, "", "", "", "", "buttonTabsNotPay")}
            {isShowOrderDetailsDashboardNotSent && this.responseOrderDetailsDashboard("Belum Dikirim", "", "", "", "", "", 2, "", "", "", "buttonTabsNotSent")}
            {isShowOrderDetailsDashboardInDelivery && this.responseOrderDetailsDashboard("Dalam Pengiriman", "Perkiraan Diterima", "", 3, "", 2, 3, "", "", "", "", "buttonTabsInDelivery")}
            {isShowOrderDetailsDashboardFinish && this.responseOrderDetailsDashboard("Finish", "Pesenan Diterima", "", 4, "", 2, 3, 4, "", "", "", "", "buttonTabsFinish")}
            {isShowOrderDetailsDashboardCancel && this.responseOrderDetailsDashboard("Batal", "Pesenan Diterima", "", "", "", "", "", "", 5, "", "", "", "", "buttonTabsCancel")}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default CustomerOderNavigation;
