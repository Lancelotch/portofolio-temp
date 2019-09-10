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

    function showDeleteConfirm(allOrder, index, idCancel) {
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
                actionCancelConfirm(idCancel);
            },
        });
    };

    async function actionCancelConfirm(idCancel) {
        const cancelOrder = await Order.cancel({
            idCancel: idCancel
        })
        if (cancelOrder.code === 200 || cancelOrder.code === "200") {
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
        showHowToModalPayment
    } = props;
    // const sortProdcutOrder = this.sortList(productOrder, "DESC")
    return (
        <div className="orderListWaiting">
            <ScrollToTopOnMount />
            {productOrder.map((order, index) => {
                return (
                    <Card style={{ marginBottom: 15 }} key={index}>
                        <ProductOrder
                            key={order.id}
                            order={order}
                            orderItems={order.order.orderItems}
                        />
                        <hr className="mp-inline" />
                        <WaitingPayment
                            labelNotPay={strings.before_pay}
                            labelNotSent={strings.in_delivery}
                            labelFinish={strings.order_received}
                            labelInDelivery={strings.estimate_accepted_order}
                            labelCancel={strings.cancel_order_by}
                            tabsShowItem={showOrderDetailsDashboard}
                            id={order.id}
                            indexes={order.order}
                        />
                        <ButtonDashboard
                            id={order.id}
                            index={index}
                            status={order.status}
                            invoiceNumber={order.invoiceNumber}
                            tabsShowItem={showOrderDetailsDashboard}
                            showReceivedConfirm={showReceivedConfirm}
                            showDeleteConfirm={showDeleteConfirm}
                            orderProduct={productOrder}
                            order={order.order}
                            showHowToModalPayment={showHowToModalPayment}
                            showOrderDetailsDashboard={() => actionShowOrderDetailsDashboard(order, index, showOrderDetailsDashboard, labelTabDetails, estimateAccepted)}
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

