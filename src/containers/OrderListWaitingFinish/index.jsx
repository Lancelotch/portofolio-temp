import React, { Component } from "react";
import Pay from "../../components/ButtonDashboard/Pay";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
// import { apiGetWithToken } from "../../api/services";
// import { PATH_DASHBOARD_TAB } from "../../api/path";
import { Card, Spin } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import NoOrderHistory from "../../components/NoOrderHistory";



class OrderListWaitingInDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderFinish: this.props.productOrderFinish,
      loading: this.props.loading
    };
  }

  // componentDidMount() {
  //   this.productOrderTabsFinish();
  // }

  // componentWillUnmount() {
  //   this.setState({
  //     loading: false
  //   });
  // };

  // productOrderTabsFinish = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_FINISH);
  //     const productOrderTabsFinish = {
  //       productOrderFinish: response.data.data
  //     };
  //     this.setState({
  //       ...productOrderTabsFinish
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
      tabsNotSent, productOrderFinish } = this.props;
    return (
      <React.Fragment>
        {this.state.productOrderFinish.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {productOrderFinish.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder
                      key={order.id}
                      indexes={order.indexes} />
                    <hr className="productOrder__inline" />
                    <WaitingPayment
                      labelFinish={"Pesenan Diterima"}
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
                      // showDeleteConfirm={this.showDeleteConfirm}
                      orderProduct={productOrderFinish}
                      i={order.orderId}
                      showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                      order={order}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                )
              })}
            </React.Fragment>)
        }
      </React.Fragment>
    );
  }
}

export default OrderListWaitingInDelivery;
