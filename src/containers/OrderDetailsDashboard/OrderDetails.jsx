import React, { Component } from 'react';
import OrderDetailsDashboard from '.';
import ProductOrder from "../../components/ProductOrderDetails";
import PaymentInfo from "../../components/PaymentInfo";
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import OrderStatusStep from "../../components/OrderStatusStep";
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderCancel from "../../components/ProductOrderCancel";
import PaymentCancelOrder from "../../components/PaymentCancelOrder";

class OrderDetailsWrapping extends Component {
    render() {
        const {
            order,
            estimateShippingDate,
            orderDate,
            shipping,
            payment,
            endDatePay,
            bank,
            address,
            invoiceNumber,
            tabsNotSent,
            tabsInDelivery
        }
            = this.props;
        console.log('order details wrapppping', order);

        return (
            <div>
                <React.Fragment>
                 
                    <ProductOrder
                        invoiceNumber={invoiceNumber}
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
                        shipping={shipping}
                        price={order.price}
                        productQuantity={order.productQuantity}
                        payment={payment}
                    />
                    <PaymentDateInfo
                        endDatePay={endDatePay}
                        typePayment={payment}
                        bank={bank}
                    />
                    <OrderStatusUser
                        label="Pengiriman"
                        customer={address}
                        index={1}
                    />
                </React.Fragment>
            </div>
        );
    }
}

export default OrderDetailsWrapping;