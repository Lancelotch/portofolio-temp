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
                    label={strings.before_pay}
                    index={1}
                    key={order.id}
                    endDatePay={order.endDatePay}
                    indexes={order.indexes}
                    pay={order.payment}
                    isHowToShowModalOpen={isHowToShowModalOpen}
                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                />
                <Pay
                    productId={order.indexes}
                    index={1}
                    showDeleteConfirm={showDeleteConfirm}
                    orderProduct={orderProduct}
                    i={order.orderId}
                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                    order={order}
                    showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard(order)}
                />
            </div>
        );
    }
}

export default OrderListWaitingWrapper;