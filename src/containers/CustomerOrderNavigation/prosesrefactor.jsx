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
  interval: 2000,
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
      productOrderNotYetSent: [],
      productOrderInDelivery: [],
      productOrderFinish: [],
      productOrderCancel: [],
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

  // componentDidUpdate(prevProps, prevState,snapShot) {
  //   console.log(prevState);

  //   if (prevState.productOrderNotYetPay.length !== this.state.productOrderNotYetPay.length  
  //    ) {
  //    this.productOrderTabs()

  //   }  
  //   if ( prevState.productOrderInDelivery.length !== this.state.productOrderNotYetPay.length) {
  //     this.productOrderTabsInDelivery()
  //   }
  // }

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
        console.log("masuk if")
        this.setState({
          productOrder: response.data.data,
          isLoading: false,
          isProductAlvailabel: false
        });
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
      case "0":
        this.updateTab(() => this.productOrderTabs(0));
        break;
      case "1":
        this.updateTab(() => this.productOrderTabs(1));
        break;
      case "2":
        this.updateTab(() => this.productOrderTabs(2));
        break;
      case "3":
        this.updateTab(() => this.productOrderTabs(3));
        break;
      case "4":
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

  render() {
    const listTabs = [
      {
        name: "Belum Bayar",
        content: this.responseListWaiting(this.state.productOrder, "", 1)
      },
      {
        name: "Sedang Diproses",
        content: this.responseListWaiting(this.state.productOrder, "", "", 2)
      },
      {
        name: "Dalam Pengiriman",
        content: this.responseListWaiting(this.state.productOrder, this.showReceivedConfirm, "", "", 3)
      },
      {
        name: "Selesai",
        content: this.responseListWaiting(this.state.productOrder, "", "", "", "", 4)
      },
      {
        name: "Finish",
        contet: this.responseListWaiting(this.state.productOrder, "", "", "", "", "", 5)
      }
    ]
    return (
      <React.Fragment>
        <ScrollToTopOnMount />
        <Tabs defaultActiveKey={"0"} onChange={this.handleChange}>
          {listTabs.map((list, index) => {
            return (
              <CustomTabPane
                key={index}
                tab={<span>{list.name}</span>}
                my_prop={
                  <React.Fragment>

                    {this.state.isLoading ?
                      this.loadingItems(this.state.isLoading) :
                      list.content
                    }
                    {this.state.isLoading === true ? "" : this.state.isProductAlvailabel && <NoOrderHistory />}

                  </React.Fragment>} />
            )
          })}
        </Tabs>
      </React.Fragment>
    );
  }
}

export default CustomerOderNavigation;
