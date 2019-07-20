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

    // listenScrollEvent = e => {
    //     if (window.scrollY) {
    //         this.setState({ backgroundColor: "transparent", color: "#000000", position: "" }, this.fixPositionDropdown(false));
    //     } else {
    //         this.setState({ backgroundColor: "", position: "", color: "" }, this.fixPositionDropdown(true));
    //     }
    // };

    // fixPositionDropdown = isTopHeaderShow => {
    //     if (!isTopHeaderShow) {
    //         console.log("if", isTopHeaderShow);
    //         this.setState({ marginTopDropdown: "10rem" })
    //     } else {
    //         console.log("else", isTopHeaderShow);
    //         this.setState({ marginTopDropdown: "1rem" });
    //     }
    // }
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
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish,
            tabsCancel,
            tabsInDeliveryOrderStatusUser,
            tabsFinishOrderStatusUser,
            buttonTabsNotPay,
            buttonTabsNotSent,
            buttonTabsInDelivery,
            buttonTabsFinish,
            buttonTabsCancel,
            estimateAccepted,
            labelTabDetails,
            actionShowOrderListWaitingNotPay,
            actionShowOrderListWaitingNotSent,
            actionShowOrderListWaitingInDelivery,
            actionShowOrderListWaitingFinish,
            actionShowOrderListWaitingCancel,
            invoiceNumber,
            id,
            productOrderInDelivery,
            showReceivedConfirm,
            indexDetails
        } = this.props;
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 24, color: "#4A4A4A" }}>{labelTabDetails}</h2>
                    {buttonTabsNotPay === "buttonTabsNotPay" &&
                        this.buttonBack(actionShowOrderListWaitingNotPay)}
                    {buttonTabsNotSent === "buttonTabsNotSent" &&
                        this.buttonBack(actionShowOrderListWaitingNotSent)}
                    {buttonTabsInDelivery === "buttonTabsInDelivery" &&
                        this.buttonBack(actionShowOrderListWaitingInDelivery)}
                    {buttonTabsFinish === "buttonTabsFinish" &&
                        this.buttonBack(actionShowOrderListWaitingFinish)}
                    {buttonTabsCancel === "buttonTabsCancel" &&
                        this.buttonBack(actionShowOrderListWaitingCancel)}
                </div>
                {((tabsNotPay === 1) || (tabsNotSent === 2) || (tabsInDelivery === 3) || (tabsFinish === 4)) &&
                    <OrderStatusStep
                        labelTabDetails={labelTabDetails}
                        tabsNotSent={tabsNotSent}
                        tabsInDelivery={tabsInDelivery}
                        tabsFinish={tabsFinish}
                        dateOrder={this.state.order.orderActivityDate} />}
                {tabsCancel === 5 &&
                    <OrderStatusCancel
                        cancelBy={this.state.cancelBy}
                        labelTabDetails={labelTabDetails}
                        orderDate={this.state.order.orderActivityDate}
                        orderDraftCancel={this.state.order.orderDraftCancel} />}
                {this.state.order.orderItems.map((product, index) => {
                    return (<div key={"index"} style={{ marginTop: 15 }}>
                        <ProductOrderDetails
                            actionReceivedConfirm={showReceivedConfirm}
                            productOrderInDelivery={productOrderInDelivery}
                            buttonTabsInDelivery={buttonTabsInDelivery}
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
                <BackTop />
            </React.Fragment>
        );
    }
}

export default OrderDetailsDashboard;