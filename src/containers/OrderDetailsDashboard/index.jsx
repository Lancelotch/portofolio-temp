import React, { Component } from 'react';
import OrderStatusStep from '../../components/OrderStatusStep';
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import OrderStatusCancel from '../../components/OrderStatusCancel';
import { BackTop, Icon} from 'antd';
import ModalHowToPay from "../../modal/ModalHowToPay";
import "./style.sass";
import Button from '../../components/Button';

class OrderDetailsDashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsRespon: this.props.orderDetailsRespon
        };
    };

    componentDidMount() {
        this._isMounted = true;
        //window.addEventListener("scroll", this.listenScrollEvent);
    }

    UNSAFE_componentWillMount() {
        this._isMounted = false;
    }

    buttonBack = (actionShowOrderListWaiting) => {
        return <Button type="secondary"
            onClick={() => actionShowOrderListWaiting()}>
            <Icon type="arrow-left" /> &nbsp;
            Kembali
        </Button>
    }

    render() {
        const {
            tabsShow,
            estimateAccepted,
            labelTabDetails,
            actionShowOrderListWaiting,
            invoiceNumber,
            id,
            showHowToModalPayment,
            showReceivedConfirm,
            keyIndex,
            isHowToShowModalOpen,
            selectedOrder
        } = this.props;
        const { orderDetailsRespon } = this.state;
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div className="item-label-button">
                    <span className="title">{labelTabDetails}</span>
                    {this.buttonBack(actionShowOrderListWaiting)}
                </div>
                {((tabsShow === "isShowOrderDetailsDashboardNotPay") ||
                    (tabsShow === "isShowOrderDetailsDashboardNotSent") ||
                    (tabsShow === "isShowOrderDetailsDashboardInDelivery") ||
                    (tabsShow === "isShowOrderDetailsDashboardFinish")
                ) &&
                    <OrderStatusStep
                        labelTabDetails={labelTabDetails}
                        dateOrder={orderDetailsRespon.order.orderActivityDate} />}
                {tabsShow === "isShowOrderDetailsDashboardCancel" &&
                    <OrderStatusCancel
                        labelTabDetails={labelTabDetails}
                        orderDate={orderDetailsRespon.order.orderActivityDate}
                        orderCancel={orderDetailsRespon.order.orderCancel} />}
                {orderDetailsRespon.order.orderItems.map((product, index) => {
                    return (<div key={index} style={{ marginTop: 15 }}>
                        <ProductOrderDetails
                            status={orderDetailsRespon.status}
                            actionReceivedConfirm={showReceivedConfirm}
                            showHowToModalPayment={showHowToModalPayment}
                            productOrderRespon={orderDetailsRespon.order}
                            invoiceNumber={invoiceNumber}
                            label="Detail Pesenan"
                            note={product.note}
                            key={product.id}
                            keyIndex={keyIndex}
                            id={id}
                            tabsShow={tabsShow}
                            noInvoice={"No. Invoice"}
                            productSnapshot={product.productSnapshot}
                            variants={product.variants}
                            productName={product.productName}
                            productQuantity={product.productQuantity}
                            totalAmount={product.totalAmount} />
                        <PaymentInfo
                            key={index.id}
                            cancelBy={orderDetailsRespon.order.orderCancel}
                            courier={orderDetailsRespon.order.courier}
                            productSnapshot={product.productSnapshot}
                            productName={product.productName}
                            amount={orderDetailsRespon.order.amount}
                            shipment={product.shipment}
                            price={product.price}
                            productQuantity={product.productQuantity}
                            payment={orderDetailsRespon.order.payment}
                        />
                    </div>)
                })}
                {tabsShow === "isShowOrderDetailsDashboardNotPay" &&
                    <PaymentDateInfo
                        dateOrder={orderDetailsRespon.order.orderActivityDate}
                        typePayment={orderDetailsRespon.order.payment}
                        bank={this.state.bank}
                    />
                }
                <OrderStatusUser
                    tabsShow={tabsShow}
                    estimateAccepted={estimateAccepted}
                    label="Pengiriman"
                    customer={orderDetailsRespon.order.orderAddress}
                    logOrderTransactions={orderDetailsRespon.order.logOrderTransactions}
                    estimateShippingDate={orderDetailsRespon.order.orderActivityDate} />
                {selectedOrder && (
                    <ModalHowToPay
                        orderPayment={selectedOrder.payment}
                        visible={isHowToShowModalOpen}
                        close={showHowToModalPayment}
                    />
                )}
                <BackTop />
            </React.Fragment>
        );
    }
}

export default OrderDetailsDashboard;