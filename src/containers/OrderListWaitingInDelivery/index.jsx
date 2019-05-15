import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import { Spin } from "antd";
import NoOrderHistory from "../../components/NoOrderHistory";
import WaitingPayment from "../../components/WaitingPayment";


class OrderListWaitingFinish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderInDelivery: [],
      loading: false
    };
  }

  componentDidMount() {
    this.productOrderTabsInDelivery();
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
  };

  productOrderTabsInDelivery = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_IN_DELIVERY);
      const productOrderTabsInDelivery = {
        productOrderInDelivery: response.data.data
      };
      this.setState({
        ...productOrderTabsInDelivery
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent } = this.props;
    return (
      <React.Fragment>
        {this.state.productOrderInDelivery.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {this.state.productOrderInDelivery.map((order, i) => {
                return (
                  <div className="waitingPayment__list" key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <WaitingPayment
                      labelInDelivery={"Dalam Proses Pengiriman"}
                      estimateShippingDate={order.estimateShippingDate}
                      receivedDate={order.receivedDate}
                      tabsInDelivery={3}
                      key={order.id}
                      endDatePay={order.endDatePay}
                      indexes={order.indexes}
                      pay={order.payment}
                    />
                    <Pay
                      productId={order.indexes}
                      tabsFinish={tabsFinish}
                      tabsNotPay={tabsNotPay}
                      tabsInDelivery={tabsInDelivery}
                      tabsNotSent={tabsNotSent}
                      showDeleteConfirm={this.showDeleteConfirm}
                      orderProduct={this.state.productOrderInDelivery}
                      i={order.orderId}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </div>
                )
              })}
            </React.Fragment>)}
    </React.Fragment>
    );
  }
}

export default OrderListWaitingFinish;
