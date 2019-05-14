import React, { Component } from 'react';
import WaitingPayment from "../../components/WaitingPayment";
import strings from "../../localization/localization";

class OrderListWaitingWrapper extends Component {
    render() {
        const {
            order,
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish,
        } = this.props
        return (
            <div className="waitingPayment__list">
                <WaitingPayment
                    labelBelumDikirim={"Dalam Proses Pengiriman"}
                    labelDalamPengiriman={"Perkiraan Barang Direrima"}
                    labelSelesai={"Pesan Diterima"}
                    tabsFinish={tabsFinish}
                    tabsNotSent={tabsNotSent}
                    estimateShippingDate={order.estimateShippingDate}
                    receivedDate={order.receivedDate}
                    tabsInDelivery={tabsInDelivery}
                    label={strings.before_pay}
                    tabsNotPay={tabsNotPay}
                    key={order.id}
                    endDatePay={order.endDatePay}
                    indexes={order.indexes}
                    pay={order.payment}
                />

            </div>
        );
    }
}

export default OrderListWaitingWrapper;