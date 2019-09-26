import React, { useState, useEffect } from "react";
import { Tabs, Modal } from "antd";
import { CustomTabPane } from "../../components/CustomTabDashboard";
import OrderListWaiting from "../../containers/OrderListWaiting";
import OrderDetailsDashboard from "../../containers/OrderDetailsDashboard";
import NoOrderHistory from "../../components/NoOrderHistory";
import { Offline, Online, Detector } from "react-detect-offline";
import strings from "../../localization/localization";
import LoadingSpin from "../../library/loadingSpin";
import { alertOffline } from "../../library/alertOffiline";
import OrderRepo from "../../repository/Order";
import Invoice from "../../repository/Invoice";
import { checkSortTabs } from "./checkShortTabsStatus";
import OrderDetailsInvoiceReview from "../../containers/OrderDetailsInvoiceReview";

const confirm = Modal.confirm;

const polling = {
    enabled: false,
    interval: 30000,
    timeout: 1000
};

export default function Order(props) {
    const [isShowDetailDashboard, setIsShowDetailDashboard] = useState(false)
    const [order, setOrder] = useState([])
    const [activeKey, setActiveKey] = useState("1")
    const [isLoading, setIsLoading] = useState(false)
    const [productOrder, setProductOrder] = useState([])
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [id, setId] = useState("")
    //const [keyIndex, setKeyIndex] = useState(0)
    const [isOrderAlvailable, setIsOrderAlvailable] = useState(false)
    const [isHowToShowModalOpen, setIsHowToShowModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isShowDashboardItem, setIsShowDashboardItem] = useState(false)
    const [labelTabDetails, setLabelTabDetails] = useState("")
    const [estimateAccepted, setEstimateAccepted] = useState("")
    const [type, setType] = useState("")
    const [isShowOrderInvoiceReview, setIsShowOrderInvoiceReview] = useState(false)

    useEffect(() => {
        productOrderTabs(0)
    }, [])

    function showReceivedConfirm(allOrder, keyIndex, orderId) {
        confirm({
            className: "deliveryReceiver",
            title: strings.tabs_in_delivery,
            content: strings.tabs_in_delivery_message_in_delivery,
            okText: strings.received,
            cancelText: strings.back,
            okType: "default",
            centered: true,
            onOk: () => {
                actionReceivedConfirm(orderId);
            },
        });
    };

    async function actionReceivedConfirm(idReceived) {
        const receivedOrder = await Invoice.receivedOrder({
            params: idReceived
        })
        if (receivedOrder.status === 200) {
            productOrderTabs(2);
        }
    };

    function toggleIsHowToShowModalOpen(order) {
        setIsHowToShowModalOpen(!isHowToShowModalOpen)
        setSelectedOrder(order ? order : null)
    };

    function actionShowOrderListWaiting() {
        setIsShowDetailDashboard(!isShowDetailDashboard)
    }

    function actionShowOrderDetailsDashboard(params) {
        setIsShowOrderInvoiceReview(false)
        actionShowOrderListWaiting()
        setOrder(params)
        setInvoiceNumber(params.invoiceNumber)
        setType(params.paramsShowOrderDetailsDashboard.type)
        setId(params.productId)
        setIsShowDashboardItem(params.paramsShowOrderDetailsDashboard.showOrderDetailsDashboard)
        setLabelTabDetails(params.paramsShowOrderDetailsDashboard.labelTabDetails)
        setEstimateAccepted(params.paramsShowOrderDetailsDashboard.estimateAccepted)
    };

    function actionShowOrderInvoiceReviewDashboard(params) {
        setIsShowDashboardItem(false)
        setIsShowOrderInvoiceReview(params.isShowOrderInvoiceReview)
        setOrder(params)
        actionShowOrderListWaiting()
    }

    async function productOrderTabs(status) {
        let productOrder = await OrderRepo.getByStatus({
            loading: setIsLoading,
            status: status,
            params: checkSortTabs(status)
        })
        if (productOrder.status === 200) {
            setProductOrder(productOrder.data.data)
            setIsOrderAlvailable(true)
        } else {
            setIsOrderAlvailable(false)
        }
    };

    function handleChange(selectkey) {
        setActiveKey(selectkey)
        switch (selectkey) {
            case "1":
                productOrderTabs(0)
                break;
            case "2":
                productOrderTabs(1)
                break;
            case "3":
                productOrderTabs(2)
                break;
            case "4":
                productOrderTabs(3)
                break;
            case "5":
                productOrderTabs(4)
                break;
            default:
                console.log("error");
        }
    }

    function actionUpdateTab(tabPosition) {
        productOrderTabs(tabPosition);
    }

    function orderListWaiting(
        type,
        showOrderDetailsDashboard,
        labelTabDetails,
        estimateAccepted,
        isShowOrderInvoiceReview) {
        return <OrderListWaiting
            isHowToShowModalOpen={isHowToShowModalOpen}
            selectedOrder={selectedOrder}
            showHowToModalPayment={toggleIsHowToShowModalOpen}
            productOrder={productOrder}
            actionUpdateTab={actionUpdateTab}
            actionShowOrderDetailsDashboard={actionShowOrderDetailsDashboard}
            actionShowOrderInvoiceReviewDashboard={actionShowOrderInvoiceReviewDashboard}
            showOrderDetailsDashboard={showOrderDetailsDashboard}
            isShowOrderInvoiceReview={isShowOrderInvoiceReview}
            showReceivedConfirm={showReceivedConfirm}
            labelTabDetails={labelTabDetails}
            estimateAccepted={estimateAccepted}
            type={type} />
    }

    function orderDetailsDashboard(showOrderDetailsDashboard) {
        return <OrderDetailsDashboard
            isHowToShowModalOpen={isHowToShowModalOpen}
            selectedOrder={selectedOrder}
            showHowToModalPayment={toggleIsHowToShowModalOpen}
            labelTabDetails={labelTabDetails}
            estimateAccepted={estimateAccepted}
            tabsShow={showOrderDetailsDashboard}
            invoiceNumber={invoiceNumber}
            type={type}
            id={id}
            orderDetailsRespon={order}
            showReceivedConfirm={showReceivedConfirm}
            actionShowOrderListWaiting={() => actionShowOrderListWaiting(showOrderDetailsDashboard)} />
    }

    const listTabsContent = [
        {
            key: "1",
            nameTabs: "Belum Bayar",
            content: orderListWaiting(
                "default",
                "isShowOrderDetailsDashboardNotPay",
                "Belum Bayar")
        },
        {
            key: "2",
            nameTabs: "Sedang Diproses",
            content: orderListWaiting(
                "default",
                "isShowOrderDetailsDashboardNotSent",
                "Belum Dikirim")
        },
        {
            key: "3",
            nameTabs: "Dalam Pengiriman",
            content: orderListWaiting(
                "default",
                "isShowOrderDetailsDashboardInDelivery",
                "Dalam Pengiriman",
                "Perkiraan Diterima")
        },
        {
            key: "4",
            nameTabs: "Selesai",
            content: orderListWaiting(
                "default",
                "isShowOrderDetailsDashboardFinish",
                "Selesai",
                "Pesanan Diterima",
                "isShowOrderInvoiceReview")
        },
        {
            key: "5",
            nameTabs: "Batal",
            content: orderListWaiting(
                "cancel",
                "isShowOrderDetailsDashboardCancel",
                "Batal")
        }]
    return (
        <div className="mp-customer-order-navigation">
            {isShowDetailDashboard === false ?
                <Tabs activeKey={activeKey} onChange={handleChange}>
                    {listTabsContent.map(list => {
                        return (
                            <CustomTabPane
                                key={list.key}
                                tab={<span>{list.nameTabs}</span>}
                                my_prop={
                                    <React.Fragment>
                                        <Offline polling={polling}>
                                            {alertOffline()}
                                        </Offline>
                                        <Detector
                                            render={() =>
                                                <Online polling={polling}>
                                                    {isLoading ? <LoadingSpin /> :
                                                        isOrderAlvailable ? list.content : <NoOrderHistory />}
                                                </Online>} />
                                    </React.Fragment>} />)
                    })}
                </Tabs>
                :
                <React.Fragment>
                    {isShowDashboardItem && orderDetailsDashboard(isShowDashboardItem)}
                    {isShowOrderInvoiceReview &&
                        <OrderDetailsInvoiceReview
                            orderDetailsReview={order}
                            setIsShowDetailDashboard={
                                () => setIsShowDetailDashboard(!isShowDetailDashboard)}
                        />}
                </React.Fragment>}
        </div>
    );
}

