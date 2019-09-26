import React from "react";
import ButtonDashboard from "../../components/ButtonDashboard";
import ProductOrder from "../../components/ProductOrder";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import { Card, Modal } from "antd";
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import Order from "../../repository/Order";

const confirm = Modal.confirm;

export default function OrderListWaiting(props) {

    function showDeleteConfirm(allOrder, index, idOrder) {
        confirm({
            iconClassName: "iconWaitingPaymentCancel",
            title: strings.tab_belum_bayar,
            content: strings.tabs_belum_bayar_pesan_batalkan,
            okText: strings.cancel,
            okType: "danger",
            cancelText: strings.back,
            centered: true,
            onOk: () => {
                // const cancelOrder = allOrder.splice(index, 1)
                // const newOrder = [...allOrder]
                // this.setState({
                //   productorder: newOrder,
                //   cancelOrder: [...this.state.cancelOrder, ...cancelOrder]
                // })
                actionCancelConfirm(idOrder);
            },
        });
    };

    async function actionCancelConfirm(idOrder) {
        const cancelOrder = await Order.cancel({
            idOrder: idOrder
        })
        if (cancelOrder.status === 200 || cancelOrder.status === "200") {
            props.actionUpdateTab(0);
        }

    };

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
        actionShowOrderInvoiceReviewDashboard
    } = props;
    // const sortProdcutOrder = this.sortList(productOrder, "DESC")
    const paramsShowOrderDetailsDashboard = {
        type: type,
        showOrderDetailsDashboard: showOrderDetailsDashboard,
        labelTabDetails: labelTabDetails,
        estimateAccepted: estimateAccepted
    }
    return (
        <div className="orderListWaiting">
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
                            productId={order.productId}
                            index={index}
                            status={order.status}
                            invoiceNumber={order.invoiceNumber}
                            tabsShowItem={showOrderDetailsDashboard}
                            showReceivedConfirm={showReceivedConfirm}
                            showDeleteConfirm={showDeleteConfirm}
                            orderProduct={productOrder}
                            order={order.order}
                            showHowToModalPayment={showHowToModalPayment}
                            showOrderInvoiceReview={() => actionShowOrderInvoiceReviewDashboard(isShowOrderInvoiceReview)}
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

