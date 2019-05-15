import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import OrderListWaitingWrapper from '../OrderListWaitingWrapper';
import "../../components/ProductOrder/style.sass";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import { Spin } from "antd";
import NoOrderHistory from "../../components/NoOrderHistory";
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";



class OrderListWaitingInDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderFinish: [],
      loading: false
    };
  }

  componentDidMount() {
    this.productOrderTabsFinish();
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
  };

  productOrderTabsFinish = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
      const productOrderTabsFinish = {
        productOrderFinish: response.data.data
      };
      this.setState({
        ...productOrderTabsFinish
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
        {this.state.productOrderFinish.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {this.state.productOrderFinish.map((order, i) => {
                return (
                  <div className="waitingPayment__list" key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <WaitingPayment
                      labelFinish={"Pesanan Diterima"}
                      estimateShippingDate={order.estimateShippingDate}
                      receivedDate={order.receivedDate}
                      tabsFinish={4}
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
                      orderProduct={this.state.productOrderFinish}
                      i={order.orderId}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </div>
                )
              })}
            </React.Fragment>)}
        }
    </React.Fragment>
    );
  }
}

export default OrderListWaitingInDelivery;
