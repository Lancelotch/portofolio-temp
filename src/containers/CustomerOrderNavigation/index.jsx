import React, { Component } from "react";
import { Tabs, Spin, Alert, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaiting from "../OrderListWaiting";
import OrderDetailsDashboard from "../OrderDetailsDashboard";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB, PATH_INVOICE } from "../../api/path";
import NoOrderHistory from "../../components/NoOrderHistory";
import { Offline, Online, Detector } from "react-detect-offline";
import strings from "../../localization/localization";
import { patchService } from "../../api/services";
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
      keyIndex: 0,
      isProductAlvailabel: false
    };
  }

  componentDidMount() {
    this.productOrderTabs(0);
   //this.productOrderTabs(2);
  }

  showReceivedConfirm = (allOrder, keyIndex, orderId) => {
    confirm({
      title: strings.tabs_in_delivery,
      content: strings.tabs_in_delivery_message_in_delivery,
      okText: strings.received,
      cancelText: strings.back,
      okType:"default",
      centered: true,
      onOk: () => {
        this.actionReceivedConfirm(orderId);
      },
    });
  };

  actionReceivedConfirm = async (idReceived) => {
    try {
      const orderId = idReceived
      const response = await patchService(PATH_INVOICE.INVOICE_BY_RECEIVED + orderId);
      if (response.code === 200 || response.code === "200") {
        this.productOrderTabs(2);
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

  actionShowOrderDetailsDashboard = (order, invoiceNumber, id, keyIndex, buttonValue) => {
    this.actionShowOrderListWaiting(buttonValue);
    this.responseDetailDashboard(order, invoiceNumber, id, keyIndex);
  };

  responseDetailDashboard(order, invoiceNumber, id, keyIndex) {
    this.setState({
      order: order,
      invoiceNumber: invoiceNumber,
      id: id,
      keyIndex: keyIndex
    })
  };

  productOrderTabs = async (value) => {
    this.setState({ isLoading: true })
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD + value);
      if (response.data.data) {
        this.setState({
          productOrder: response.data.data,
          isLoading: false,
          isProductAlvailabel: false
        })
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
    showOrderDetailsDashboard,
    responseProductOrder,
    tabsShowItem) {
    return <OrderListWaiting
      productOrder={responseProductOrder}
      actionUpdateTab={this.actionUpdateTab}
      actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
      showOrderDetailsDashboard={showOrderDetailsDashboard}
      showReceivedConfirm={this.showReceivedConfirm}
      tabsShowItem={tabsShowItem}
    />
  }

  responseOrderDetailsDashboardNotPay(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      labelTabDetails={"Belum Bayar"}
      tabsNotPay={1}
      order={this.state.order}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  responseOrderDetailsDashboardNotSent(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      labelTabDetails={"Belum Dikirim"}
      tabsNotSent={2}
      invoiceNumber={this.state.invoiceNumber}
      id={this.state.id}
      order={this.state.order}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  responseOrderDetailsDashboardInDelivery(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      labelTabDetails={"Dalam Pengiriman"}
      tabsNotSent={2}
      tabsInDelivery={3}
      estimateAccepted={"Perkiraan Diterima"}
      invoiceNumber={this.state.invoiceNumber}
      id={this.state.id}
      order={this.state.order}
      showReceivedConfirm={this.showReceivedConfirm}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  responseOrderDetailsDashboardFinish(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      labelTabDetails={"Finish"}
      tabsNotSent={2}
      tabsInDelivery={3}
      tabsFinish={4}
      estimateAccepted={"Pesenan Diterima"}
      invoiceNumber={this.state.invoiceNumber}
      id={this.state.id}
      order={this.state.order}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  responseOrderDetailsDashboardCancel(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      labelTabDetails={"Batal"}
      tabsCancel={5}
      id={this.state.id}
      order={this.state.order}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
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
                      this.responseListWaiting("isShowOrderDetailsDashboardNotPay", this.state.productOrder, 1)
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
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting("isShowOrderDetailsDashboardNotSent", this.state.productOrder, 2)}
                        {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
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
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting("isShowOrderDetailsDashboardInDelivery", this.state.productOrder, 3)}
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
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting("isShowOrderDetailsDashboardFinish", this.state.productOrder, 4)}
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
                          this.loadingItems(this.state.isLoading) : this.responseListWaiting("isShowOrderDetailsDashboardCancel", this.state.productOrder, 5)}
                        {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                      </Online>)} />
                </React.Fragment>} />
          </Tabs>
          :
          <React.Fragment>
            {isShowOrderDetailsDashboardNotPay && this.responseOrderDetailsDashboardNotPay("isShowOrderDetailsDashboardNotPay")}
            {isShowOrderDetailsDashboardNotSent && this.responseOrderDetailsDashboardNotSent("isShowOrderDetailsDashboardNotSent")}
            {isShowOrderDetailsDashboardInDelivery && this.responseOrderDetailsDashboardInDelivery("isShowOrderDetailsDashboardInDelivery")}
            {isShowOrderDetailsDashboardFinish && this.responseOrderDetailsDashboardFinish("isShowOrderDetailsDashboardFinish")}
            {isShowOrderDetailsDashboardCancel && this.responseOrderDetailsDashboardCancel("isShowOrderDetailsDashboardCancel")}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default CustomerOderNavigation;
