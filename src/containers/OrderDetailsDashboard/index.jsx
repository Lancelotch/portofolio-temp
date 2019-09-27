import React from 'react';
import OrderStatus from '../../components/OrderStatus';
import PaymentDateInfo from "../../components/PaymentDateInfo";
import OrderStatusUser from "../../components/OrderStatusUser";
import PaymentInfo from "../../components/PaymentInfo";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { BackTop, Icon } from 'antd';
import ModalHowToPay from "../../modal/ModalHowToPay";
import "./style.sass";
import Button from '../../components/Button';
import ButtonBackAndTittleDashboard from '../../components/ButtonBackAndTittleDashboard';

export default function OrderDetailsDashboard(props) {

    function buttonBack(actionShowOrderListWaiting) {
        return <Button type="secondary"
            onClick={() => actionShowOrderListWaiting()}>
            <Icon type="arrow-left" /> &nbsp;
            Kembali
        </Button>
    }

    const {
        orderDetailsRespon,
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
        selectedOrder,
        type
    } = props;

    return (
        <React.Fragment>
            <ScrollToTopOnMount />
            <ButtonBackAndTittleDashboard
                tittle={labelTabDetails}
                setIsShowDetailDashboard={actionShowOrderListWaiting} />
            <OrderStatus
                labelTabDetails={labelTabDetails}
                orderActivityDate={orderDetailsRespon.order.orderActivityDate}
                orderCancel={orderDetailsRespon.order.orderCancel}
                type={type}
            />
            {orderDetailsRespon.order.orderItems.map((product, index) => {
                return (<div key={index} style={{ marginTop: 15 }}>
                    <ProductOrderDetails
                        status={orderDetailsRespon.status}
                        actionReceivedConfirm={showReceivedConfirm}
                        showHowToModalPayment={showHowToModalPayment}
                        productOrderRespon={orderDetailsRespon.order}
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
                        cancelBy={orderDetailsRespon.order.orderCancel}
                        courier={orderDetailsRespon.order.courier}
                        productSnapshot={product.productSnapshot}
                        productName={product.productName}
                        amount={orderDetailsRespon.order.amount}
                        shipment={product.shipment}
                        price={product.price}
                        productQuantity={product.productQuantity}
                        payment={orderDetailsRespon.order.payment}
                    />
                </div>)
            })}
            {tabsShow === "isShowOrderDetailsDashboardNotPay" &&
                <PaymentDateInfo
                    dateOrder={orderDetailsRespon.order.orderActivityDate}
                    typePayment={orderDetailsRespon.order.payment}
                />
            }
            <OrderStatusUser
                tabsShow={tabsShow}
                estimateAccepted={estimateAccepted}
                label="Pengiriman"
                customer={orderDetailsRespon.order.orderAddress}
                logOrderTransactions={orderDetailsRespon.order.logOrderTransactions}
                estimateShippingDate={orderDetailsRespon.order.orderActivityDate} />
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
