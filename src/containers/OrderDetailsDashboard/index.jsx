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
              {this.props.tabsNotPay === 1 &&
                <React.Fragment>
                  <OrderStatusStep  
                  orderDate={this.state.orderDate} />
                  <ProductOrder
                    label="Detail Pesanan"
                    key={order.id}
                    productImage={order.productImage}
                    variants={order.variants}
                    productName={order.productName}
                    productQuantity={order.productQuantity}
                    totalAmount={order.totalAmount}
                  />
                  <PaymentInfo
                    key={order.id}
                    index={1}
                    productName={order.productName}
                    totalAmount={order.totalAmount}
                    shipping={this.state.shipping}
                    price={order.price}
                    productQuantity={order.productQuantity}
                    payment={this.state.payment}
                  />
                  <PaymentDateInfo
                    endDatePay={this.state.endDatePay}
                    typePayment={this.state.payment}
                    bank={this.state.bank}
                  />
                  <OrderStatusUser
                    label="Pengiriman"
                    customer={this.state.address}
                    index={1}
                  />
                </React.Fragment>
              }
              {this.props.tabsNotSent === 2 &&
                <React.Fragment>
                  <OrderStatusStep
                    orderDate={this.state.orderDate}
                    tabsNotSent={2}
                  />
                  <ProductOrder
                    label="Detail Pesanan"
                    noInvoice={"No Invoice"}
                    invoiceNumber={this.state.invoiceNumber}
                    key={order.id}
                    productImage={order.productImage}
                    variants={order.variants}
                    productName={order.productName}
                    productQuantity={order.productQuantity}
                    totalAmount={order.totalAmount}
                  />
                  <PaymentInfo
                    key={order.id}
                    index={1}
                    productName={order.productName}
                    totalAmount={order.totalAmount}
                    shipping={this.state.shipping}
                    price={order.price}
                    productQuantity={order.productQuantity}
                    payment={this.state.payment}
                  />
                  <OrderStatusUser
                    label="Pengiriman"
                    customer={this.state.address}
                    index={2}
                  />
                </React.Fragment>
              }
              {this.props.tabsInDelivery === 3 &&
                <React.Fragment>
                  <OrderStatusStep
                    orderDate={this.state.orderDate}
                    tabsInDelivery={this.props.tabsInDelivery}/>
                  <ProductOrder
                    label="Detail Pesanan"
                    noInvoice={"No Invoice"}
                    invoiceNumber={this.state.invoiceNumber}
                    key={order.id}
                    productImage={order.productImage}
                    variants={order.variants}
                    productName={order.productName}
                    productQuantity={order.productQuantity}
                    totalAmount={order.totalAmount}
                  />
                  <PaymentInfo
                    key={order.id}
                    index={1}
                    productName={order.productName}
                    totalAmount={order.totalAmount}
                    shipping={this.state.shipping}
                    price={order.price}
                    productQuantity={order.productQuantity}
                    payment={this.state.payment}
                  />
                  <OrderStatusUser
                    index={3}
                    label="Pengiriman"
                    estimateShippingDate={this.state.estimateShippingDate}
                    customer={this.state.address}
                  />
                </React.Fragment>
              }
              {this.props.tabsFinish === 4 &&
                <React.Fragment>
                  <OrderStatusStep
                    orderDate={this.state.orderDate}
                    tabsFinish={this.props.tabsFinish}
                  />
                  <ProductOrder
                    label="Detail Pesanan"
                    noInvoice={"No Invoice"}
                    invoiceNumber={this.state.invoiceNumber}
                    key={order.id}
                    productImage={order.productImage}
                    variants={order.variants}
                    productName={order.productName}
                    productQuantity={order.productQuantity}
                    totalAmount={order.totalAmount}
                  />
                  <PaymentInfo
                    key={order.id}
                    index={1}
                    productName={order.productName}
                    totalAmount={order.totalAmount}
                    shipping={this.state.shipping}
                    price={order.price}
                    productQuantity={order.productQuantity}
                    payment={this.state.payment}
                  />
                  <OrderStatusUser
                    index={4}
                    label="Pengiriman"
                    estimateShippingDate={this.state.estimateShippingDate}
                    customer={this.state.address}
                  />
                </React.Fragment>
              }
              {this.props.tabsCancel === 5 &&
                <React.Fragment>
                  <OrderStatusCancel orderDate={this.state.orderDate} />
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
                    estimateShippingDate={this.state.estimateShippingDate} />
                </React.Fragment>
              }
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderDetailsDashboard;
