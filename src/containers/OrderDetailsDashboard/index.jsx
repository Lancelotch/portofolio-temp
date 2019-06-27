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
            orderDate: 0,
            selectedOrder: null,
            orderId: this.props.orderId
        }
    };

    componentDidMount() {
        this.productOrderDetailDashboard();
    }


    productOrderDetailDashboard = async () => {
        const orderId = this.state.orderId;
        try {
            //const response = await dummyOrderDetailsDashboard;
            const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + orderId);
            console.log('ini respon show order details dashboard', response);

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
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                    <OrderStatusStep
                        actionShowOrderListWaiting={actionShowOrderListWaiting}
                        labelTabDetails={labelTabDetails}
                        tabsNotSent={tabsNotSent}
                        tabsInDelivery={tabsInDelivery}
                        tabsFinish={tabsFinish}
                        orderDate={this.state.orderDate} />
                {this.state.indexes.map(index => {
                    return (
                        <div key={index.productId} style={{ marginTop: 15 }}>
                            <ProductOrderDetails
                                invoiceNumber={this.state.invoiceNumber}
                                label="Detail Pesenan"
                                note={index.note}
                                key={index.id}
                                productId={index.productId}
                                orderId={this.state.orderId}
                                tabsInDelivery={tabsInDelivery}
                                tabsNotSent={tabsNotSent}
                                tabsFinish={tabsFinish}
                                noInvoice={"No. Invoice"}
                                productImage={index.productImage}
                                variants={index.variants}
                                productName={index.productName}
                                productQuantity={index.productQuantity}
                                totalAmount={index.totalAmount}
                            />
                            <PaymentInfo
                                key={index.id}
                                index={1}
                                productName={index.productName}
                                totalAmount={index.totalAmount}
                                shipping={this.state.shipping}
                                price={index.price}
                                productQuantity={index.productQuantity}
                                payment={this.state.payment}
                            />
                        </div>
                    );
                })}
               {tabsNotPay === 1 &&
                    <PaymentDateInfo
                        endDatePay={this.state.endDatePay}
                        typePayment={this.state.payment}
                        bank={this.state.bank}
                    />}             
                <OrderStatusUser
                        tabsInDeliveryOrderStatusUser={tabsInDeliveryOrderStatusUser}
                        tabsFinishOrderStatusUser={tabsFinishOrderStatusUser}
                        estimateAccepted={estimateAccepted}
                        label="Pengiriman"
                        customer={this.state.address}
                        estimateShippingDate={this.state.estimateShippingDate} />
            </React.Fragment>
        );
    }
}

export default OrderDetailsDashboard;