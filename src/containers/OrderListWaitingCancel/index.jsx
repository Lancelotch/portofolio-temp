import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import "../../components/ProductOrder/style.sass";
import Cancel from "../../components/ButtonDashboard/Cancel";
import { apiGetWithToken } from "../../api/services";
import { PATH_DASHBOARD_TAB } from "../../api/path";
import { Spin } from "antd";
import NoOrderHistory from "../../components/NoOrderHistory";

class OrderListingCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOrderCancel: [],
      loading: false
    };
  }

  componentDidMount() {
    this.productOrderTabsCancel();
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
  };

  productOrderTabsCancel = async () => {
    this.setState({ loading: true });
    try {
      const response = await apiGetWithToken(PATH_DASHBOARD_TAB.ORDER_STATUS_CANCEL);
      const orderCancelId = response.data.data.map(order => order.orderId)
      const productOrderTabsCancel = {
        productOrderCancel: response.data.data
      };
      this.setState({
        ...productOrderTabsCancel,
        orderIdCancel: orderCancelId
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }



  render() {
    const { actionShowOrderDetailsDashboard } = this.props;
    return (
      <React.Fragment>
        {this.state.productOrderCancel.length < 1 ?
          (<Spin tip="Loading..." spinning={this.state.loading} delay={500}>
            <NoOrderHistory /></Spin>
          ) : (
            <React.Fragment>
              {this.state.productOrderCancel.map((order, i) => {
                return (
                  <div style={{ marginBottom: 33 }} key={i}>
                    <ProductOrder key={order.id} indexes={order.indexes} />
                    <Cancel
                      i={order.orderId}
                      productDetail={order.indexes}
                      showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order.orderId)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

export default OrderListingCancel;
