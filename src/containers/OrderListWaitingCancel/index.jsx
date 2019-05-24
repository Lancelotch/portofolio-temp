import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import Cancel from "../../components/ButtonDashboard/Cancel";
import { Card, Spin } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import NoOrderHistory from "../../components/NoOrderHistory";

class OrderListingCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderCancel: this.props.productOrderCancel,
      loading: this.props.loading
    };
  }

  // componentDidMount() {
  //   this.productOrderTabsCancel();
  // }

  // componentWillUnmount() {
  //   this.setState({
  //     loading: false
  //   });
  // };

  // productOrderTabsCancel = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_CANCEL);
  //     const productOrderTabsCancel = {
  //       productOrderCancel: response.data.data
  //     };
  //     this.setState({
  //       ...productOrderTabsCancel
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false });
  //   }
  // };



  render() {
    const { actionShowOrderDetailsDashboard,productOrderCancel } = this.props;
    return (
      <React.Fragment>
      {this.state.productOrderCancel.length < 1 ?
      (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
        <NoOrderHistory /></Spin>
      ) : (
            <React.Fragment>
              {productOrderCancel.map((order, i) => {
                return (
                  <Card style={{ marginBottom: 15 }} key={i}>
                    <ProductOrder key={order.id} indexes={order.indexes} />
                    <hr className="productOrder__inline" />
                    <WaitingPayment
                      labelCancel={"Pesenan dibatalkan oleh"}
                      estimateShippingDate={order.estimateShippingDate}
                      cancelDate={order.cancelDate}
                      cancelBy={order.cancelBy}
                      tabsCancel={5}
                      key={order.id}
                      indexes={order.indexes}
                      pay={order.payment}
                    />
                    <Cancel
                      i={order.orderId}
                      productDetail={order.indexes}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </Card>
                );
              })}
            </React.Fragment>)
      }
      </React.Fragment>
    );
  }
}

export default OrderListingCancel;
