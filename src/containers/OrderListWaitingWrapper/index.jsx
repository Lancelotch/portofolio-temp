import React, { Component } from 'react';
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"
import strings from "../../localization/localization";
import NoOrderHistory from "../../components/NoOrderHistory";

class OrderListWaitingWrapper extends Component {

    render() {
        const {
            order,
            showDeleteConfirm,
            orderProduct,
            toggleIsHowToShowModalOpen,
            isHowToShowModalOpen,
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish,
            tabsCancel
        } = this.props
        return (
            <div>
                <WaitingPayment
                    labelBelumDikirim={"Dalam Proses Pengiriman"}
                    labelDalamPengiriman={"Perkiraan Barang Direrima"}
                    labelSelesai={"Pesan Diterima"}
                    indexSelesai={tabsFinish}
                    indexBelumDikirim={tabsNotSent}
                    estimateShippingDate={order.estimateShippingDate}
                    receivedDate={order.receivedDate}
                    indexDalamPengiriman={tabsInDelivery}
                    label={strings.before_pay}
                    index={tabsNotPay}
                    key={order.id}
                    endDatePay={order.endDatePay}
                    indexes={order.indexes}
                    pay={order.payment}
                    isHowToShowModalOpen={isHowToShowModalOpen}
                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                />
                <Pay
                    productId={order.indexes}
                    tabsFinish={tabsFinish}
                    index={tabsNotPay}
                    tabsInDelivery={tabsInDelivery}
                    indexButton={tabsNotSent}
                    showDeleteConfirm={showDeleteConfirm}
                    orderProduct={orderProduct}
                    i={order.orderId}
                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                    order={order}
                    showOrderDetailsDashboard={() => this.props.showOrderDetailsDashboard()}
                />
            </div>
        );
    }
}

export default OrderListWaitingWrapper;