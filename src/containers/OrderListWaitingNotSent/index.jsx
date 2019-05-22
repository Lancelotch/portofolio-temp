import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import { Spin, Card } from "antd";
import NoOrderHistory from "../../components/NoOrderHistory";
import WaitingPayment from "../../components/WaitingPayment";

class OrderListWaitingNotSent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // productOrderNotYetSent: [],
  //     loading: this.props.loading
  //   };
  // }

  // componentDidMount() {
  //   this.productOrderTabsNotYetSent();
  // }

  // productOrderTabsNotYetSent = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_NOT_YET_SENT);
  //     const productOrderTabsNotYetSent = {
  //       productOrderNotYetSent: response.data.data
  //     };
  //     this.setState({
  //       ...productOrderTabsNotYetSent,
  //       productOrderNotYetSent: response.data.data
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false });
  //   }
  // }
  render() {
    const {
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      actionShowOrderDetailsDashboard,
      tabsNotSent, productOrderNotYetSent } = this.props;
    return (
      <React.Fragment>
        {productOrderNotYetSent.map((order, i) => {
          return (
            <Card style={{ marginBottom: 15 }} key={i}>
              <ProductOrder
                key={order.id}
                indexes={order.indexes} />
              <hr className="productOrder__inline" />
              <WaitingPayment
                labelNotSent={"Dalam Proses Pengiriman"}
                tabsNotSent={2}
                estimateShippingDate={order.estimateShippingDate}
                receivedDate={order.receivedDate}
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
                // showDeleteConfirm={this.showDeleteConfirm}
                orderProduct={this.state.productOrderTabsNotYetSent}
                i={order.orderId}
                showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                order={order}
                showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
              />
            </Card>
          )
        })}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingNotSent;
