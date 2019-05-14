import React, { Component } from 'react';
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import OrderListWaitingWrapper from '../OrderListWaitingWrapper';
import OrderStatusStep from '../../components/OrderStatusStep';
import { apiGetWithToken } from "../../api/services";
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import { PATH_ORDER } from "../../api/path";
import Pay from "../../components/ButtonDashboard/Pay"
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";

class OrderDetailsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHowToShowModalOpen: false,
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
            selectedOrder: null
        }
    };

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

    toggleIsHowToShowModalOpen = () => {
        this.setState({
            isHowToShowModalOpen: !this.state.isHowToShowModalOpen
        });
    };

    actionShowOrderListWaitingPayment = () => {
        this.setState({
            isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
        });
    };

    actionShowOrderDetailsDashboard = () => {      
        this.actionShowOrderListWaitingPayment();
    };


    render() {
        const {
            order,
            showDeleteConfirm,
            orderProduct,
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish
        } = this.props
        const { isHowToShowModalOpen,isShowOrderDetailsDashboard  } = this.state;
        return (
            <div>
                {isShowOrderDetailsDashboard === false ? (
                    <div className="waitingPayment__list">
                        <ProductOrder
                            key={order.id}
                            indexes={order.indexes} />
                        {tabsNotPay === 1 &&
                            <OrderListWaitingWrapper
                                order={order}
                                tabsNotPay={1}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                            />
                        }
                        {tabsNotSent === 2 &&
                            <OrderListWaitingWrapper
                                tabsNotSent={2}
                                order={order}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                            />
                        }
                        {tabsInDelivery === 3 &&
                            <OrderListWaitingWrapper
                                tabsInDelivery={3}
                                order={order}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                            />
                        }
                        {tabsFinish === 4 &&
                            <OrderListWaitingWrapper
                                tabsFinish={4}
                                order={order}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                            />
                        }
                        <Pay
                            productId={order.indexes}
                            tabsFinish={tabsFinish}
                            index={tabsNotPay}
                            tabsInDelivery={tabsInDelivery}
                            indexButton={tabsNotSent}
                            showDeleteConfirm={showDeleteConfirm}
                            orderProduct={orderProduct}
                            i={order.orderId}
                            showHowToModalPayment={() => this.toggleIsHowToShowModalOpen()}
                            order={order}
                            showOrderDetailsDashboard={()=>this.actionShowOrderDetailsDashboard()}
                        />
                        {order && (
                            <ModalHowToPay
                                payBank={order.bank}
                                key={order.orderId}
                                endDatePay={order.endDatePay}
                                pay={order.payment}
                                indexes={order.indexes}
                                visible={isHowToShowModalOpen}
                                close={() => this.toggleIsHowToShowModalOpen()}
                            />
                        )}
                    </div>
                ) : (<React.Fragment>
                    {tabsNotPay === 1 &&
                        <OrderStatusStep
                            actionShowOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                            top={10}
                            labelTabDetails={"Belum Bayar"}
                            orderDate={this.state.orderDate} />
                    }
                    {tabsNotSent === 2 &&
                        <OrderStatusStep
                            actionShowOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                            top={10}
                            labelTabDetails={"Belum Dikirim"}
                            tabsNotSent={2}
                            orderDate={this.state.orderDate} />
                    }
                    {tabsInDelivery === 3 &&
                        <OrderStatusStep
                            actionShowOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                            top={10}
                            labelTabDetails={"Dalam Pengiriman"}
                            tabsNotSent={2}
                            tabsInDelivery={3}
                            orderDate={this.state.orderDate} />}
                    {tabsFinish === 4 &&
                        <OrderStatusStep
                            actionShowOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                            top={10}
                            labelTabDetails={"Selesai"}
                            tabsNotSent={2}
                            tabsInDelivery={3}
                            tabsFinish={4}
                            orderDate={this.state.orderDate} />}
                    {this.state.indexes.map(index => {
                        return (
                            <div key={index.productId}>
                                <ProductOrderDetails
                                    invoiceNumber={this.state.invoiceNumber}
                                    label="Detail Pesanan"
                                    key={index.id}
                                    orderId={order.orderId}
                                    tabsNotSent={tabsNotSent}
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
                    {((tabsNotPay === 1) || (tabsNotSent === 2)) &&
                        (<OrderStatusUser
                            label="Pengiriman"
                            customer={this.state.address}
                            estimateShippingDate={this.state.estimateShippingDate} />)}
                    {tabsInDelivery === 3 &&
                        <OrderStatusUser
                            estimateAccepted={"Perkiraan Diterima"}
                            label="Pengiriman"
                            customer={this.state.address}
                            estimateShippingDate={this.state.estimateShippingDate}
                            tabsInDelivery={3} />
                    }
                    {tabsFinish === 4 &&
                        <OrderStatusUser
                            estimateAccepted={"Pesanan Diterima"}
                            label="Pengiriman"
                            customer={this.state.address}
                            estimateShippingDate={this.state.estimateShippingDate}
                            tabsFinish={4} />
                    }
                </React.Fragment>)
                }
            </div>
        );
    }
}

export default OrderDetailsDashboard;