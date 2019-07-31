import React, { Component } from 'react';
import OrderStatusStep from '../../components/OrderStatusStep';
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import OrderStatusCancel from '../../components/OrderStatusCancel';
import { BackTop, Icon } from 'antd';
import { Button } from 'antd/lib/radio';
import ModalHowToPay from "../../modal/ModalHowToPay";

class OrderDetailsDashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetailsDashboard: false,
            order: this.props.order,
            marginTopDropdown: "1rem",
            width: 1300,
            backgroundColor: ""
        };
    };

    componentDidMount() {
        this._isMounted = true;
        //window.addEventListener("scroll", this.listenScrollEvent);
    }

    componentWillMount() {
        this._isMounted = false;
    }

    buttonBack = (actionShowOrderListWaiting) => {
        return <Button style={{
            fontSize: 16
        }} onClick={() => actionShowOrderListWaiting()}>
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
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 24, color: "#4A4A4A" }}>{labelTabDetails}</h2>
                    {this.buttonBack(actionShowOrderListWaiting)}
                </div>
                {((tabsShow === "showTabsNotPay") || (tabsShow === "showTabsNotSent") || (tabsShow === "showTabsInDelivery") || (tabsShow === "showTabsFinish")) &&
                    <OrderStatusStep
                        labelTabDetails={labelTabDetails}
                        dateOrder={this.state.order.orderActivityDate} />}
                {tabsShow === "showTabsCancel" &&
                    <OrderStatusCancel
                        labelTabDetails={labelTabDetails}
                        orderDate={this.state.order.orderActivityDate}
                        orderCancel={this.state.order.orderCancel} />}
                {this.state.order.orderItems.map((product, index) => {
                    return (<div key={"index"} style={{ marginTop: 15 }}>
                        <ProductOrderDetails
                            actionReceivedConfirm={showReceivedConfirm}
                            showHowToModalPayment={showHowToModalPayment}
                            productOrderInDelivery={this.state.order}
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
                            cancelBy={this.state.order.orderCancel}
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
                {tabsShow === "showTabsNotPay" &&
                    <PaymentDateInfo
                        dateOrder={this.state.order.orderActivityDate}
                        typePayment={this.state.order.payment}
                        bank={this.state.bank}
                    />
                }
                <OrderStatusUser
                    tabsShow={tabsShow}
                    estimateAccepted={estimateAccepted}
                    label="Pengiriman"
                    customer={this.state.order.orderAddress}
                    logOrderTransactions={this.state.order.logOrderTransactions}
                    estimateShippingDate={this.state.order.orderActivityDate} />
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