import React, { Component } from 'react';
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderCancel from "../../components/ProductOrderCancel";
import PaymentCancelOrder from "../../components/PaymentCancelOrder";
import { apiGetWithToken } from '../../api/services';
import { PATH_ORDER } from '../../api/path';
import { Card } from 'antd';

class OrderDetailsCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetailsCancel: false,
            indexes: [],
            orderDate: null,
            cancelBy: null,
            cancelDate: null,
            top: 10,
            orderId: this.props.orderId
        }
    }

    componentDidMount() {
        this.productOrderDetailDashboard();
    }



    productOrderDetailDashboard = async () => {
        const orderId = this.state.orderId;
        try {
            const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + orderId);
            const itemProductOrderCancel = {
                cancelDate: response.data.data.cancelDate,
                indexes: response.data.data.indexes,
                orderDate: response.data.data.orderDate,
                cancelBy: response.data.data.cancelBy
            };
            this.setState({
                ...itemProductOrderCancel
            });
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        return (
            <React.Fragment>
                {this.state.indexes.map((order, i) => {
                    return (
                        <React.Fragment>
                            <OrderStatusCancel top={this.state.top} actionShowOrderListWaiting={this.props.actionShowOrderListWaiting} orderDate={this.state.orderDate} />
                            <Card style={{ marginTop: 15 }} key={i}>
                                <ProductOrderCancel
                                    label="Detail Pesenan"
                                    key={order.id}
                                    productId={order.productId}
                                    productImage={order.productImage}
                                    variants={order.variants}
                                    productName={order.productName}
                                    productQuantity={order.productQuantity}
                                    totalAmount={order.totalAmount}
                                />
                                <PaymentCancelOrder
                                    cancelBy={this.state.cancelBy}
                                    cancelDate={this.state.cancelDate} />
                            </Card>
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default OrderDetailsCancel;