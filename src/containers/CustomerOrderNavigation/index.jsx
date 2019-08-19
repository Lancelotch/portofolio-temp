import React, { Component } from "react";
import { Tabs, Modal } from "antd";
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
import { loadingItems } from "../../library/loadingSpin";
import { alertOffline } from "../../library/alertOffiline";

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
      selectedOrder: null,
      isShowDashboardItem: false,
      labelTabDetails: "",
      estimateAccepted: ""
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

  actionShowOrderDetailsDashboard = (order, keyIndex, isShowDashboardItem, labelTabDetails, estimateAccepted) => {
    this.actionShowOrderListWaiting(isShowDashboardItem)
    this.setState({
      order: order,
      invoiceNumber: order.invoiceNumber,
      id: order.id,
      keyIndex: keyIndex,
      isShowDashboardItem: isShowDashboardItem,
      labelTabDetails: labelTabDetails,
      estimateAccepted: estimateAccepted
    })
  };

  checkSortTabs = value => {
    let sortListTabsNotPayCancel = ""
    if (value === 0 || value === 4) {
      sortListTabsNotPayCancel = "?direction=desc&sortBy=orderActivityDate.orderDate"
    } else {
      sortListTabsNotPayCancel = "?direction=desc&sortBy=creationDate"
    }
    return sortListTabsNotPayCancel
  }

  productOrderTabs = async (value) => {
    this.setState({ isLoading: true })
    try {
      const response = await apiGetWithToken(`${PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD}${value}${this.checkSortTabs(value)}`);
      if (response.data.data) {
        this.setState({
          productOrder: response.data.data,
          isLoading: false,
          isProductAlvailabel: false
        })
      }
    } catch (error) {
      this.setState({ isLoading: false, isProductAlvailabel: true });
    }
  };

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

  actionUpdateTab = (tabPosition) => {
    this.productOrderTabs(tabPosition);
  }

  itemList(list) {
    return this.state.isProductAlvailabel === true ?
      this.state.isLoading === true ? false :
        this.state.isProductAlvailabel && <NoOrderHistory /> :
      list.content;
  }

  responseListWaiting(
    showOrderDetailsDashboard,
    responseProductOrder,
    labelTabDetails,
    estimateAccepted) {
    return <OrderListWaiting
      isHowToShowModalOpen={this.state.isHowToShowModalOpen}
      selectedOrder={this.state.selectedOrder}
      showHowToModalPayment={this.toggleIsHowToShowModalOpen}
      productOrder={responseProductOrder}
      actionUpdateTab={this.actionUpdateTab}
      actionShowOrderDetailsDashboard={this.actionShowOrderDetailsDashboard}
      showOrderDetailsDashboard={showOrderDetailsDashboard}
      showReceivedConfirm={this.showReceivedConfirm}
      labelTabDetails={labelTabDetails}
      estimateAccepted={estimateAccepted}
    />
  }

  responOrderDetailsDashboard(showOrderDetailsDashboard) {
    return <OrderDetailsDashboard
      isHowToShowModalOpen={this.state.isHowToShowModalOpen}
      selectedOrder={this.state.selectedOrder}
      showHowToModalPayment={this.toggleIsHowToShowModalOpen}
      labelTabDetails={this.state.labelTabDetails}
      estimateAccepted={this.state.estimateAccepted}
      tabsShow={showOrderDetailsDashboard}
      invoiceNumber={this.state.invoiceNumber}
      id={this.state.id}
      orderDetailsRespon={this.state.order}
      showReceivedConfirm={this.showReceivedConfirm}
      actionShowOrderListWaiting={() => this.actionShowOrderListWaiting(showOrderDetailsDashboard)} />
  }

  listWaiting = (isShow, labelTabDetails, estimateAccepted) => {
    return this.state.isLoading ?
      loadingItems(this.state.isLoading) :
      this.responseListWaiting(isShow, this.state.productOrder, labelTabDetails, estimateAccepted);
  }

  render() {

    const {
      isShowDashboardItem,
      isShowDetailDashboard,
    } = this.state

    const listTabsContent = [
      {
        key: "1",
        nameTabs: "Belum Bayar",
        content: this.listWaiting("isShowOrderDetailsDashboardNotPay", "Belum Bayar")
      },
      {
        key: "2",
        nameTabs: "Sedang Diproses",
        content: this.listWaiting("isShowOrderDetailsDashboardNotSent", "Belum Dikirim")
      },
      {
        key: "3",
        nameTabs: "Dalam Pengiriman",
        content: this.listWaiting("isShowOrderDetailsDashboardInDelivery", 
        "Dalam Pengiriman", "Perkiraan Diterima")
      },
      {
        key: "4",
        nameTabs: "Selesai",
        content: this.listWaiting("isShowOrderDetailsDashboardFinish",
        "Selesai","Pesanan Diterima")
      },
      {
        key: "5",
        nameTabs: "Batal",
        content: this.listWaiting("isShowOrderDetailsDashboardCancel", "Batal")
      }
    ]

    return (
      <div className="mp-customer-order-navigation">
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
                        {alertOffline()}
                      </Offline>
                      <Detector
                        render={() =>
                          <Online polling={polling}>
                            {this.itemList(list)}
                          </Online>} />
                    </React.Fragment>} />)
            })}
          </Tabs>
          :
          <React.Fragment>
            {isShowDashboardItem &&
              this.responOrderDetailsDashboard(isShowDashboardItem)}
          </React.Fragment>
        }
      </div>
    );
  }
}

export default CustomerOderNavigation;
