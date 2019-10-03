import React, { useState, useEffect } from "react";
import ButtonDashboard from "../../components/ButtonDashboard";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Card, Alert } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import "./style.sass";

export default function OrderListWaiting(props) {
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)

    useEffect(() => {
        setShowAlertSuccess(props.isShowAlertSuccess)
        if (props.isShowAlertSuccess) {
            setTimeout(() => {
                setShowAlertSuccess(false)
            }, 3000)
        }
    }, [props.isShowAlertSuccess])

    // sortList = (list, order) => {
    //   if (order === "ASC") {
    //     return list.sort((a, b) => {
    //       return parseFloat(a.order.orderActivityDate.orderDate) - parseFloat(b.order.orderActivityDate.orderDate);
    //     })
    //   }
    //   else {
    //     return list.sort((a, b) => {
    //       return parseFloat(b.order.orderActivityDate.orderDate) - parseFloat(a.order.orderActivityDate.orderDate);
    //     });
    //   }
    // }

    const {
        labelTabDetails,
        estimateAccepted,
        actionShowOrderDetailsDashboard,
        showOrderDetailsDashboard,
        productOrder,
        showReceivedConfirm,
        isHowToShowModalOpen,
        selectedOrder,
        showHowToModalPayment,
        type,
        isShowOrderInvoiceReview,
        actionShowOrderInvoiceReviewDashboard,
        actionShowOrderCancelDashboard
    } = props;
    // const sortProdcutOrder = this.sortList(productOrder, "DESC")
    const paramsShowOrderDetailsDashboard = {
        type: type,
        showOrderDetailsDashboard: showOrderDetailsDashboard,
        labelTabDetails: labelTabDetails,
        estimateAccepted: estimateAccepted
    }

    const onClose = e => {
        console.log(e, 'I was closed.');
    };

    return (
        <div className="mp-order-list-waiting">
            {showOrderDetailsDashboard === "isShowOrderDetailsDashboardFinish" &&
                showAlertSuccess &&
                <div className="mp-order-list-waiting__alert">
                    <Alert
                        message="Berhasil mengirim ulasan"
                        type="success"
                        onClose={onClose}
                        closable />
                </div>}
            <ScrollToTopOnMount />
            {productOrder.map((order, index) => {
                return (
                    <Card style={{ marginBottom: 15 }} key={index}>
                        <ProductOrder
                            productId={order.productId}
                            orderItems={order.order.orderItems}
                            showOrderDetailsDashboard={showOrderDetailsDashboard}
                        />
                        <hr className="mp-inline" />
                        <WaitingPayment
                            labelNotPay={strings.before_pay}
                            labelNotSent={strings.in_delivery}
                            labelFinish={strings.order_received}
                            labelInDelivery={strings.estimate_accepted_order}
                            labelCancel={strings.cancel_order_by}
                            tabsShowItem={showOrderDetailsDashboard}
                            order={order.order}
                        />
                        <ButtonDashboard
                            productId={order.id}
                            index={index}
                            status={order.status}
                            invoiceNumber={order.invoiceNumber}
                            tabsShowItem={showOrderDetailsDashboard}
                            showReceivedConfirm={showReceivedConfirm}
                            showOrderCancleDetails={() => actionShowOrderCancelDashboard({ ...order, paramsShowOrderDetailsDashboard })}
                            orderProduct={productOrder}
                            order={order.order}
                            showHowToModalPayment={showHowToModalPayment}
                            showOrderInvoiceReview={() => actionShowOrderInvoiceReviewDashboard({ ...order, isShowOrderInvoiceReview })}
                            showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard({ ...order, paramsShowOrderDetailsDashboard })}
                        />
                    </Card>)
            })}
            {selectedOrder && (
                <ModalHowToPay
                    orderPayment={selectedOrder.payment}
                    visible={isHowToShowModalOpen}
                    close={showHowToModalPayment}
                />
            )}
        </div>
    );
}

