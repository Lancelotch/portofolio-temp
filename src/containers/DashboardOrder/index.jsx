import React, { Component } from 'react';
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"
import strings from "../../localization/localization";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";

class DashboardOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexes: [],
            isHowToShowModalOpen: false,
            isShowOrderDetailsDashboard: false,
            selectedOrder: null
        };
    }

    actionShowOrderListWaitingPayment = () => {
        this.setState({
            isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
        });
    };

    actionShowOrderDetailsDashboard = (order) => {
        this.actionShowOrderListWaitingPayment();
        this.setState({
            orderDetailsId: order
        });
    };



    toggleIsHowToShowModalOpen = order => {
        this.setState({
            isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
        });
    };

    render() {
        const {
            order,
            showDeleteConfirm,
            orderProduct,
            toggleIsHowToShowModalOpen,
            tabsNotPay,
            tabsInDelivery,
            tabsNotSent,
            tabsFinish,
            tabsCancel,
            labelTabDetails
        } = this.props
        const { isHowToShowModalOpen, selectedOrder, isShowOrderDetailsDashboard } = this.state;
        console.log('dashboaaaaaard', isShowOrderDetailsDashboard)
        return (
            <div>
                {isShowOrderDetailsDashboard === false ? (
                    <React.Fragment>
                        <ProductOrder
                            key={order.id}
                            indexes={order.indexes} />
                        {tabsNotPay === 1 &&
                            <React.Fragment>
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
                            </React.Fragment>}
                        {tabsNotSent === 2 &&
                            <React.Fragment>
                                <WaitingPayment
                                    indexDalamPengiriman={2}
                                    index={2}
                                    labelPengiriman="Dalam Proses Pengiriman"
                                    key={order.id}
                                    endDatePay={order.endDatePay}
                                    indexes={order.indexes}
                                    pay={order.payment}
                                    isHowToShowModalOpen={isHowToShowModalOpen}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                />
                                <Pay
                                    indexes={order.indexes}
                                    indexButton={2}
                                    showDeleteConfirm={showDeleteConfirm}
                                    orderProduct={orderProduct}
                                    i={order.id}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                    order={order}
                                    showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard(order)}
                                />
                            </React.Fragment>
                        }
                        {tabsInDelivery === 3 &&
                            <React.Fragment>
                                <WaitingPayment
                                    indexDalamPengiriman={3}
                                    labelPengiriman="Perkiraan Barang Diterima"
                                    index={3}
                                    key={order.id}
                                    estimateShippingDate={order.estimateShippingDate}
                                    endDatePay={order.endDatePay}
                                    indexes={order.indexes}
                                    pay={order.payment}
                                    isHowToShowModalOpen={isHowToShowModalOpen}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                />
                                <Pay
                                    indexes={order.indexes}
                                    indexButton={3}
                                    showDeleteConfirm={showDeleteConfirm}
                                    orderProduct={orderProduct}
                                    i={order.id}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                    order={order}
                                    showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard(order)}
                                />
                            </React.Fragment>
                        }
                        {tabsFinish === 4 &&
                            <React.Fragment>
                                <WaitingPayment
                                    indexDalamPengiriman={4}
                                    label="Pesanan Diterima"
                                    index={4}
                                    key={order.id}
                                    estimateShippingDate={order.estimateShippingDate}
                                    endDatePay={order.receivedDate}
                                    indexes={order.indexes}
                                    pay={order.payment}
                                    isHowToShowModalOpen={isHowToShowModalOpen}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                />
                                <Pay
                                    indexButton={4}
                                    indexes={order.indexes}
                                    showDeleteConfirm={showDeleteConfirm}
                                    orderProduct={orderProduct}
                                    i={order.id}
                                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                    order={order}
                                    showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard(order)}
                                />
                            </React.Fragment>
                        }
                        {tabsCancel === 5 &&
                            <React.Fragment>
                                <Cancel
                                    indexes={order.indexes}
                                    showOrderDetailsDashboard={this.props.showOrderDetailsDashboard}
                                />
                            </React.Fragment>
                        }
                        {selectedOrder && (
                            <ModalHowToPay
                                payBank={selectedOrder.bank}
                                key={selectedOrder.orderId}
                                endDatePay={selectedOrder.endDatePay}
                                pay={selectedOrder.payment}
                                indexes={selectedOrder.indexes}
                                visible={isHowToShowModalOpen}
                                close={toggleIsHowToShowModalOpen}
                            />
                        )}
                    </React.Fragment>
                ) : (
                        <OrderDetailsDashboard
                            orderId={order.orderId}
                            labelTabDetails={labelTabDetails}
                            showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment}
                            tabsNotPay={1}
                            tabsNotSent={2}
                            tabsInDelivery={3}
                            tabsFinish={4}
                            tabsCancel={5}
                        />
                    )
                }
            </div>
        );
    }
}

export default DashboardOrder;