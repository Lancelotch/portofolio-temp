import React, { Component } from 'react';
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"
import strings from "../../localization/localization";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";
import OrderListWaitingWrapper from '../OrderListWaitingWrapper';

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
                {this.state.isShowOrderDetailsDashboard === false ? (
                    <React.Fragment>
                        <ProductOrder
                            key={order.id}
                            indexes={order.indexes} />
                        {tabsNotPay === 1 &&
                            <OrderListWaitingWrapper
                                order={order}
                                tabsNotPay={1}
                                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                isHowToShowModalOpen={isHowToShowModalOpen}
                            />
                        }
                        {tabsNotSent === 2 &&
                            <OrderListWaitingWrapper
                                tabsNotSent={2}
                                order={order}
                                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                isHowToShowModalOpen={isHowToShowModalOpen}
                            />
                        }
                        {tabsInDelivery === 3 &&
                            <OrderListWaitingWrapper
                                tabsInDelivery={3}
                                order={order}
                                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                isHowToShowModalOpen={isHowToShowModalOpen}
                            />
                        }
                        {tabsFinish === 4 &&
                            <OrderListWaitingWrapper
                                tabsFinish={4}
                                order={order}
                                showOrderDetailsDashboard={() => this.actionShowOrderDetailsDashboard()}
                                showDeleteConfirm={showDeleteConfirm}
                                orderProduct={orderProduct}
                                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                                isHowToShowModalOpen={isHowToShowModalOpen}
                            />
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
                    </React.Fragment>)
                    : (
                        <OrderDetailsDashboard
                        tabsNotSent={2}
                        orderId={order.orderId}
                        showOrderListWaitingPayment={this.actionShowOrderListWaitingPayment} />
                    )}
            </div>
        );
    }
}

export default DashboardOrder;