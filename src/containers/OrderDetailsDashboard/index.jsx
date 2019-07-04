import React, { Component } from 'react';
import OrderStatusStep from '../../components/OrderStatusStep';
import { apiGetWithToken } from "../../api/services";
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import { PATH_ORDER } from "../../api/path";
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';

class OrderDetailsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetailsDashboard: false,
            order: this.props.order
        };
    };


    render() {
        const {
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish,
            tabsInDeliveryOrderStatusUser,
            tabsFinishOrderStatusUser,
            estimateAccepted,
            labelTabDetails,
            actionShowOrderListWaiting
        } = this.props;
        console.log();

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <OrderStatusStep
                    actionShowOrderListWaiting={actionShowOrderListWaiting}
                    labelTabDetails={labelTabDetails}
                    tabsNotSent={tabsNotSent}
                    tabsInDelivery={tabsInDelivery}
                    tabsFinish={tabsFinish}
                    orderDate={"this.state.orderDate"} />
                {this.state.order.orderItems.map((product,index) => {
                    return (
                        <div key={index} style={{ marginTop: 15 }}>
                            <ProductOrderDetails
                                invoiceNumber={this.state.invoiceNumber}
                                label="Detail Pesenan"
                                note={product.note}
                                key={product.id}
                                index={index}
                                productId={product.productId}
                                orderId={this.state.orderId}
                                tabsInDelivery={tabsInDelivery}
                                tabsNotSent={tabsNotSent}
                                tabsFinish={tabsFinish}
                                noInvoice={"No. Invoice"}
                                productSnapshot={product.productSnapshot}
                                variants={product.variants}
                                productName={product.productName}
                                productQuantity={product.productQuantity}
                                totalAmount={product.totalAmount}
                            />
                            <PaymentInfo
                                key={index.id}
                                index={1}
                                courier={this.state.order.courier}
                                productSnapshot={product.productSnapshot}
                                productName={product.productName}
                                totalAmount={product.amount}
                                amount={this.state.order.amount}
                                shipment={product.shipment}
                                price={product.price}
                                productQuantity={product.productQuantity}
                                payment={this.state.order.payment}
                            />
                        </div>
                    );
                })}
                {tabsNotPay === 1 &&
                    <PaymentDateInfo
                        endDatePay={this.state.order.orderActivityDate}
                        typePayment={this.state.order.payment}
                        bank={this.state.bank}
                    />}
                <OrderStatusUser
                    tabsInDeliveryOrderStatusUser={tabsInDeliveryOrderStatusUser}
                    tabsFinishOrderStatusUser={tabsFinishOrderStatusUser}
                    estimateAccepted={estimateAccepted}
                    label="Pengiriman"
                    customer={this.state.order.orderAddress}
                    estimateShippingDate={this.state.estimateShippingDate} />
            </React.Fragment>
        );
    }
}

export default OrderDetailsDashboard;