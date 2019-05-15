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



class OrderListWaitingNotSent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderNotYetSent: [],
      loading: false
    };
  }

  componentDidMount() {
    this.productOrderTabsNotYetSent();
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
  };

  productOrderTabsNotYetSent = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
      const orderId = response.data.data.map(order => order.orderId)
      const productOrderTabsNotYetSent = {
        productOrderNotYetSent: response.data.data
      };
      this.setState({
        ...productOrderTabsNotYetSent,
        productOrderNotYetSent: response.data.data
      });
      console.log('ini responssssssssse', this.state.orderIdProduct);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  render() {
    const {
      orderProduct,
      showDeleteConfirm,
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent } = this.props;
    return (
      <React.Fragment>
        {this.state.productOrderNotYetSent.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {this.state.productOrderNotYetSent.map((order, i) => {
                return (
                  <div className="waitingPayment__list" key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <OrderListWaitingWrapper
                      tabsNotSent={2}
                      order={order}
                      showDeleteConfirm={showDeleteConfirm}
                      orderProduct={orderProduct}
                    />
                    <Pay
                      productId={order.indexes}
                      tabsFinish={tabsFinish}
                      tabsNotPay={tabsNotPay}
                      tabsInDelivery={tabsInDelivery}
                      tabsNotSent={tabsNotSent}
                      showDeleteConfirm={showDeleteConfirm}
                      orderProduct={orderProduct}
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

export default OrderListWaitingNotSent;
