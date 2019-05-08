import React, { Component } from "react";
//import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import ProductOrder from "../../components/ProductOrderDetails";
import PaymentInfo from "../../components/PaymentInfo";
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import { Affix, Icon } from "antd";
import "./style.sass"
import OrderStatusStep from "../../components/OrderStatusStep";
import { apiGetWithToken } from "../../api/services";
import { PATH_ORDER } from "../../api/path";

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
    let orderDetailsId = ""
    this.props.orderDetailsId.map((orderId) => {
      orderDetailsId = orderId.orderId
      return orderDetailsId
    })
    try {
      //const response = await dummyOrderDetailsDashboard;
      const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + orderDetailsId);
      console.log('ini dashboard detaila', response);
      const itemProductOrder = {
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
      console.log('ini iiiid form dashboard order details', orderDetailsId);
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log('log-detail-dashboard-inedexs', this.state.indexes);
    return (
      <React.Fragment>
        {this.state.indexes.map((order) => {
          return (
            <div key={order.productId}>
              <div style={{ marginBottom: 50 }}>
                {this.props.index === 1 &&
                  <h2
                    style={{
                      float: "left",
                      color: "#4A4A4A",
                      fontSize: 24
                    }}>
                    Belum Bayar
                </h2>
                }
                {this.props.index === 2 &&
                  <h2
                    style={{
                      float: "left",
                      color: "#4A4A4A",
                      fontSize: 24
                    }}>
                    Belum Dikirim
                </h2>
                }
                {this.props.index === 3 &&
                  <h2
                    style={{
                      float: "left",
                      color: "#4A4A4A",
                      fontSize: 24
                    }}>
                    Dalam Pengiriman
                  </h2>
                }
                <Affix offsetTop={this.state.top}>
                  <button
                    style={{ float: "right" }}
                    className="buttonOrderDetails"
                    onClick={() => this.props.showOrderDetailsDashboard()}>
                    <Icon type="arrow-left" /> &nbsp;
                    Kembali
                  </button>
                </Affix>
              </div>
              {this.props.index === 1 &&
                <React.Fragment>
                  <OrderStatusStep orderDate={this.state.orderDate} />
                  <ProductOrder
                    label="Detail Pesanan"
                    key={order.id}
                    productImage={order.productImage}
                    variants={order.variants}
                    productName={order.productName}
                    productQuantity={order.productQuantity}
                    totalAmount={order.totalAmount}
                  />
                </React.Fragment>
              }
              {this.props.index === 2 &&
                <React.Fragment>
                  <OrderStatusStep orderDate={this.state.orderDate} index={2} />
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
                </React.Fragment>
              }
              {this.props.index === 3 &&
                <React.Fragment>
                  <OrderStatusStep
                    orderDate={this.state.orderDate}
                    indexPesanDikirim={3}
                    index={2} />
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
                </React.Fragment>
              }
              {this.props.index === 4 &&
                <React.Fragment>
                  <OrderStatusStep
                    orderDate={this.state.orderDate}
                    indexPesanDiterima={4}
                    indexPesanDikirim={3}
                    index={2}
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
                </React.Fragment>
              }
              <PaymentInfo
                key={order.id}
                productName={order.productName}
                totalAmount={order.totalAmount}
                transport={this.state.shipping}
                price={order.price}
                productQuantity={order.productQuantity}
                typePayment={this.state.payment}
              />
              {this.props.index === 1 &&
                <React.Fragment>
                  <PaymentDateInfo
                    endDatePay={this.state.endDatePay}
                    typePayment={this.state.payment}
                    bank={this.state.bank}
                  />
                  <OrderStatusUser
                    label="Pengiriman"
                    customer={this.state.address}
                  />
                </React.Fragment>
              }
              {this.props.index === 2 &&
                <OrderStatusUser
                  label="Pengiriman"
                  customer={this.state.address}
                />}
              {this.props.index === 3 &&
                <OrderStatusUser
                  index={3}
                  label="Pengiriman"
                  estimateShippingDate={this.state.estimateShippingDate}
                  customer={this.state.address}
                />}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderDetailsDashboard;
