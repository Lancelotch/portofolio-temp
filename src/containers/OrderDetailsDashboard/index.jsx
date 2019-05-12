import React, { Component } from "react";
import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import ProductOrder from "../../components/ProductOrderDetails";
import PaymentInfo from "../../components/PaymentInfo";
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import { Affix, Icon } from "antd";
import "./style.sass"
import OrderStatusStep from "../../components/OrderStatusStep";
import { apiGetWithToken } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderCancel from "../../components/ProductOrderCancel";
import PaymentCancelOrder from "../../components/PaymentCancelOrder";
import OrderDetailsWrapping from "./OrderDetails";

class OrderDetailsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: {},
      payment: {},
      shipping: {},
      bank: {},
      address: {},
      indexes: [],
      id: "",
      endDatePay: 0,
      invoiceNumber: "",
      estimateShippingDate: "",
      orderDate: 0
    };
  }

  componentDidMount() {
    this.productOrderDetailDashboard();
  }

  productOrderDetailDashboard = async () => {
    const orderId = this.props.orderId;
    console.log('ini dashboard order details', orderId);

    try {
      //const response = await dummyOrderDetailsDashboard;
      const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + orderId);
      const itemProductOrder = {
        id: response.data.data.id,
        invoiceNumber: response.data.data.invoiceNumber,
        estimateShippingDate: response.data.data.estimateShippingDate,
        bank: response.data.data.bank,
        endDatePay: response.data.data.endDatePay,
        shipping: response.data.data.shipping,
        payment: response.data.data.payment,
        productorder: response.data.data,
        address: response.data.data.address,
        indexes: response.data.data.indexes,
        orderDate: response.data.data.orderDate
      };
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.indexes &&
          <React.Fragment>
            {this.state.indexes.map(order => {
              return (
                <div key={order.productId}>
                  <div style={{ paddingBottom: 50 }}>
                    <h2
                      style={{
                        float: "left",
                        color: "#4A4A4A",
                        fontSize: 24
                      }}>
                      {this.props.labelTabDetails}
                    </h2>
                    <Affix offsetTop={this.state.top}>
                      <button
                        style={{ float: "right" }}
                        className="buttonOrderDetails"
                        onClick={() => this.props.showOrderListWaitingPayment()}>
                        <Icon type="arrow-left" /> &nbsp;
                        Kembali
                  </button>
                    </Affix>
                  </div>
                  {this.props.tabsNotSent === 2 &&
                    <React.Fragment>
                      <OrderStatusStep
                        tabsNotSent={2}
                        orderDate={order.orderDate}

                      />
                      <OrderDetailsWrapping
                        tabsNotSent={2}
                        order={order}
                        estimateShippingDate={this.state.estimateShippingDate}
                        orderDate={this.state.orderDate}
                        shipping={this.state.shipping}
                        payment={this.state.payment}
                        endDatePay={this.state.endDatePay}
                        bank={this.state.bank}
                        address={this.state}
                        invoiceNumber={this.state.invoiceNumber} /></React.Fragment>}
                  {this.props.tabsInDelivery === 3 &&
                    <React.Fragment>
                      <OrderStatusStep
                        tabsInDelivery={3}
                        orderDate={order.orderDate}

                      />
                      <OrderDetailsWrapping
                        tabsInDelivery={3}
                        // tabsNotSent={2}
                        order={order}
                        estimateShippingDate={this.state.estimateShippingDate}
                        orderDate={this.state.orderDate}
                        shipping={this.state.shipping}
                        payment={this.state.payment}
                        endDatePay={this.state.endDatePay}
                        bank={this.state.bank}
                        address={this.state}
                        invoiceNumber={this.state.invoiceNumber} />
                    </React.Fragment>
                  }
                  {this.props.tabsCancel === 5 &&
                    <React.Fragment>
                      <OrderStatusCancel
                        orderDate={this.state.orderDate} />
                      <ProductOrder
                        label="Detail Pesanan"
                        key={order.id}
                        productId={order.productId}
                        productImage={order.productImage}
                        variants={order.variants}
                        productName={order.productName}
                        productQuantity={order.productQuantity}
                        totalAmount={order.totalAmount}
                      />
                      <PaymentCancelOrder
                        labelPembatalan="Pesanan dibatalkan oleh customer"
                        estimateShippingDate={this.stateestimateShippingDate} />
                    </React.Fragment>
                  }
                </div>
              );
            })}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default OrderDetailsDashboard;
