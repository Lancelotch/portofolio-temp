import React, { Component } from 'react';
import { Affix, Icon } from 'antd';
import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import dummyOrderDetailsBelumDikirim from "../../dummy/dummyOrderDetailsBelumDikirim";
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderCancel from "../../components/ProductOrderCancel";
import PaymentCancelOrder from "../../components/PaymentCancelOrder";
import { apiGetWithToken } from '../../api/services';
import { PATH_ORDER } from '../../api/path';
import ProductOrder from '../../components/ProductOrder';
import Cancel from '../../components/ButtonDashboard/Cancel';

class OrderDetailsCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetailsCancel: false,
            indexes: [],
            orderDate: null,
            cancelBy: null,
            estimateShippingDate: null,
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
                estimateShippingDate: response.data.data.estimateShippingDate,
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
                {this.state.indexes.map(order => {
                    return (
                        <React.Fragment>
                            <OrderStatusCancel top={this.state.top} actionShowOrderListWaiting={this.props.actionShowOrderListWaiting} orderDate={this.state.orderDate} />
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
                            <PaymentCancelOrder
                                cancelBy={this.state.cancelBy}
                                estimateShippingDate={this.state.estimateShippingDate} />
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default OrderDetailsCancel;