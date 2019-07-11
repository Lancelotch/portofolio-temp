import React, { Component } from 'react';
import OrderStatusStep from '../../components/OrderStatusStep';
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import OrderStatusCancel from '../../components/OrderStatusCancel';

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
            tabsCancel,
            tabsInDeliveryOrderStatusUser,
            tabsFinishOrderStatusUser,
            estimateAccepted,
            labelTabDetails,
            actionShowOrderListWaiting,
            invoiceNumber,
            id,
            productOrderInDelivery,
            showReceivedConfirm,
            indexDetails
        } = this.props;
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                {((tabsNotPay === 1) || (tabsNotSent === 2) || (tabsInDelivery === 3) || (tabsFinish === 4)) &&
                    <OrderStatusStep
                        actionShowOrderListWaiting={actionShowOrderListWaiting}
                        labelTabDetails={labelTabDetails}
                        tabsNotSent={tabsNotSent}
                        tabsInDelivery={tabsInDelivery}
                        tabsFinish={tabsFinish}
                        dateOrder={this.state.order.orderActivityDate} />}
                {tabsCancel === 5 &&
                <OrderStatusCancel
                    cancelBy={this.state.cancelBy}
                    labelTabDetails={labelTabDetails}
                    actionShowOrderListWaiting={actionShowOrderListWaiting}
                    orderDate={this.state.order.orderActivityDate}
                    orderDraftCancel={this.state.order.orderDraftCancel}/>}
                {this.state.order.orderItems.map((product, index) => {
                        return (<div key={"index"} style={{ marginTop: 15 }}>
                            <ProductOrderDetails
                                actionReceivedConfirm={showReceivedConfirm}
                                productOrderInDelivery={productOrderInDelivery}
                                product={product}
                                invoiceNumber={invoiceNumber}
                                label="Detail Pesenan"
                                note={product.note}
                                key={product.id}
                                index={indexDetails}
                                idOrder={this.state.order.id}
                                id={id}
                                tabsInDelivery={tabsInDelivery}
                                tabsNotSent={tabsNotSent}
                                tabsFinish={tabsFinish}
                                tabsCancel={tabsCancel}
                                noInvoice={"No. Invoice"}
                                productSnapshot={product.productSnapshot}
                                variants={product.variants}
                                productName={product.productName}
                                productQuantity={product.productQuantity}
                                totalAmount={product.totalAmount} />
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
                        </div>)
                    })}
                {tabsNotPay === 1 &&
                    <PaymentDateInfo
                        dateOrder={this.state.order.orderActivityDate}
                        typePayment={this.state.order.payment}
                        bank={this.state.bank}
                    />
                }
                <OrderStatusUser
                    tabsInDeliveryOrderStatusUser={tabsInDeliveryOrderStatusUser}
                    tabsFinishOrderStatusUser={tabsFinishOrderStatusUser}
                    estimateAccepted={estimateAccepted}
                    label="Pengiriman"
                    customer={this.state.order.orderAddress}
                    logOrderTransactions={this.state.order.logOrderTransactions}
                    estimateShippingDate={this.state.order.orderActivityDate} />
            </React.Fragment>
        );
    }
}

export default OrderDetailsDashboard;