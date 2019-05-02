import React, { Component } from 'react';
import { Affix, Icon } from 'antd';
import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import dummyOrderDetailsBelumDikirim from "../../dummy/dummyOrderDetailsBelumDikirim";
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderCancel from "../../components/ProductOrderCancel";
import PaymentCancelOrder from "../../components/PaymentCancelOrder";

class OrderDetailsCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsId: this.props.orderDetailsId,
            indexes: []
        }
    }

    componentDidMount() {
        this.productOrderDetailDashboard();
    }

    productOrderDetailDashboard = async () => {
        try {
            const response = await dummyOrderDetailsDashboard;
            const dummyBelumDikirim = await dummyOrderDetailsBelumDikirim;
            const itemProductOrder = {
                invoiceNumber: dummyBelumDikirim.data.invoiceNumber,
                estimateShippingDate: response.data.estimateShippingDate,
                bank: response.data.bank,
                endDatePay: response.data.endDatePay,
                shipping: response.data.shipping,
                payment: response.data.payment,
                productorder: response.data,
                orderAddress: response.data.orderAddress,
                indexes: response.data.indexes,
                orderDate: response.data.orderDate
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
                <div style={{ marginBottom: 50 }}>
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
                {this.state.indexes.map(order => {
                    return (
                        <React.Fragment>
                            <OrderStatusCancel orderDate={this.state.orderDate} />
                            <ProductOrderCancel
                                label="Detail Pesanan"
                                key={order.id}
                                productId={order.productId}
                                productImage={order.productImage}
                                variants={order.variants}
                                productName={order.productName}
                                productQuantity={order.productQuantity}
                                totalAmount={order.totalAmount}
                            />
                            <PaymentCancelOrder labelPembatalan="Pesanan dibatalkan oleh customer" estimateShippingDate={this.state.estimateShippingDate} />
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default OrderDetailsCancel;