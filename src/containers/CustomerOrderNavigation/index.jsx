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
      isProductAlvailabel: false,
      isHowToShowModalOpen: false,
      selectedOrder: null
    };
  }

  componentDidMount() {
    this.productOrderTabs(0);
    //this.productOrderTabs(2);
  }

  showReceivedConfirm = (allOrder, keyIndex, orderId) => {
    confirm({
      className: "deliveryReceiver",
      title: strings.tabs_in_delivery,
      content: strings.tabs_in_delivery_message_in_delivery,
      okText: strings.received,
      cancelText: strings.back,
      okType: "default",
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

  toggleIsHowToShowModalOpen = order => {
    this.setState({
      isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
      selectedOrder: order ? order : null
    });
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
      isHowToShowModalOpen={this.state.isHowToShowModalOpen}
      selectedOrder={this.state.selectedOrder}
      showHowToModalPayment={this.toggleIsHowToShowModalOpen}
      productOrder={responseProductOrder}
      actionUpdateTab={this.actionUpdateTab}
      actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
      showOrderDetailsDashboard={showOrderDetailsDashboard}
      showReceivedConfirm={this.showReceivedConfirm}
      tabsShowItem={tabsShowItem}
    />
  }

  responOrderDetailsDashboard(showOrderDetailsDashboard, labelTabDetails, itemTabsShow, estimateAccepted) {
    return <OrderDetailsDashboard
      isHowToShowModalOpen={this.state.isHowToShowModalOpen}
      selectedOrder={this.state.selectedOrder}
      showHowToModalPayment={this.toggleIsHowToShowModalOpen}
      labelTabDetails={labelTabDetails}
      estimateAccepted={estimateAccepted}
      tabsShow={itemTabsShow}
      invoiceNumber={this.state.invoiceNumber}
      id={this.state.id}
      order={this.state.order}
      showReceivedConfirm={this.showReceivedConfirm}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  listWaiting = (isShow, tabsShow) => {
    return this.state.isLoading ?
      this.loadingItems(this.state.isLoading) :
      this.responseListWaiting(isShow, this.state.productOrder, tabsShow);
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
    const listTabsContent = [
      {
        key: "1",
        nameTabs: "Belum Bayar",
        content: this.listWaiting("isShowOrderDetailsDashboardNotPay", 1)
      },
      {
        key: "2",
        nameTabs: "Sedang Di Proses",
        content: this.listWaiting("isShowOrderDetailsDashboardNotSent", 2)
      },
      {
        key: "3",
        nameTabs: "Dalam Pengiriman",
        content: this.listWaiting("isShowOrderDetailsDashboardInDelivery", 3)
      },
      {
        key: "4",
        nameTabs: "Finish",
        content: this.listWaiting("isShowOrderDetailsDashboardFinish", 4)
      },
      {
        key: "5",
        nameTabs: "Batal",
        content: this.listWaiting("isShowOrderDetailsDashboardCancel", 5)
      }
    ]
    return (
      <div className="customerOrderNavigation">
        <ScrollToTopOnMount />
        {isShowDetailDashboard === false ?
          <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
            {listTabsContent.map(list => {
              return (
                <CustomTabPane
                  key={list.key}
                  tab={<span>{list.nameTabs}</span>}
                  my_prop={
                    <React.Fragment>
                      <Offline polling={polling}>
                        {this.alertOffline()}
                      </Offline>
                      <Detector
                        render={() =>
                          <Online polling={polling}>
                            {list.content}
                            {this.state.isLoading === true ? false : this.state.isProductAlvailabel && <NoOrderHistory />}
                          </Online>} />
                    </React.Fragment>} />
              )
            })}
          </Tabs>
          :
          <React.Fragment>
            {isShowOrderDetailsDashboardNotPay && this.responOrderDetailsDashboard("isShowOrderDetailsDashboardNotPay", "Belum Bayar", "showTabsNotPay")}
            {isShowOrderDetailsDashboardNotSent && this.responOrderDetailsDashboard("isShowOrderDetailsDashboardNotSent", "Belum Dikirim", "showTabsNotSent")}
            {isShowOrderDetailsDashboardInDelivery &&
              this.responOrderDetailsDashboard("isShowOrderDetailsDashboardInDelivery", "Dalam Pengiriman", "showTabsInDelivery", "Perkiraan Diterima")}
            {isShowOrderDetailsDashboardFinish && this.responOrderDetailsDashboard("isShowOrderDetailsDashboardFinish", "Selesai", "showTabsFinish", "Paket Diterima")}
            {isShowOrderDetailsDashboardCancel && this.responOrderDetailsDashboard("isShowOrderDetailsDashboardCancel", "Batal", "showTabsCancel")}
          </React.Fragment>
        }
      </div>
    );
  }
}

export default CustomerOderNavigation;
