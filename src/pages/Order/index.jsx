// import React, {  useState, useEffect } from "react";
// import { Tabs, Modal } from "antd";
// import { CustomTabPane } from "../../components/CustomTabDashboard";
// import OrderListWaiting from "../../containers/OrderListWaiting";
// import OrderDetailsDashboard from "../../containers/OrderDetailsDashboard";
// import { PATH_INVOICE } from "../../services/path/invoice"
// import NoOrderHistory from "../../components/NoOrderHistory";
// import { Offline, Online, Detector } from "react-detect-offline";
// import strings from "../../localization/localization";
// import { patchService } from "../../api/services";
// import LoadingSpin from "../../library/loadingSpin";
// import { alertOffline } from "../../library/alertOffiline";
// import OrderRepo from "../../repository/Order";

// const confirm = Modal.confirm;

// const polling = {
//   enabled: false,
//   interval: 30000,
//   timeout: 1000
// };

// export default function Order(props) {
//   const [isShowDetailDashboard, setIsShowDetailDashboard] = useState(false)
//   const [order, setOrder] = useState([])
//   const [activeKey, setActiveKey] = useState("1")
//   const [isLoading, setIsLoading] = useState(false)
//   const [productOrder, setProductOrder] = useState([])
//   const [invoiceNumber, setInvoiceNumber] = useState("")
//   const [id, setId] = useState("")
//   //const [keyIndex, setKeyIndex] = useState(0)
//   const [isOrderAlvailable, setIsOrderAlvailable] = useState(false)
//   const [isHowToShowModalOpen, setIsHowToShowModalOpen] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const [isShowDashboardItem, setIsShowDashboardItem] = useState(false)
//   const [labelTabDetails, setLabelTabDetails] = useState("")
//   const [estimateAccepted, setEstimateAccepted] = useState("")


//   useEffect(() => {
//     productOrderTabs(0)
//   }, [])


//   function showReceivedConfirm(allOrder, keyIndex, orderId) {
//     confirm({
//       className: "deliveryReceiver",
//       title: strings.tabs_in_delivery,
//       content: strings.tabs_in_delivery_message_in_delivery,
//       okText: strings.received,
//       cancelText: strings.back,
//       okType: "default",
//       centered: true,
//       onOk: () => {
//         actionReceivedConfirm(orderId);
//       },
//     });
//   };

//   async function actionReceivedConfirm(idReceived) {
//     try {
//       const orderId = idReceived
//       const response = await patchService(PATH_INVOICE.INVOICE_BY_RECEIVED + orderId);
//       if (response.code === 200 || response.code === "200") {
//         productOrderTabs(2);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   function toggleIsHowToShowModalOpen(order) {
//     setIsHowToShowModalOpen(!isHowToShowModalOpen)
//     setSelectedOrder(order ? order : null)
//   };

//   function actionShowOrderListWaiting() {
//     setIsShowDetailDashboard(!isShowDetailDashboard)
//   }

//   function actionShowOrderDetailsDashboard(order, keyIndex, isShowDashboardItem, labelTabDetails, estimateAccepted) {
//     actionShowOrderListWaiting(isShowDashboardItem)
//     setOrder(order)
//     setInvoiceNumber(order.invoiceNumber)
//     setId(order.id)
//    // setKeyIndex(keyIndex)
//     setIsShowDashboardItem(isShowDashboardItem)
//     setLabelTabDetails(labelTabDetails)
//     setEstimateAccepted(estimateAccepted)
//   };


//   function checkSortTabs(status) {
//     let params = {}
//     if (status === 0 || status === 4) {
//       params = {
//         direction : "desc",
//         sortBy: "orderActivityDate.orderDate"

//       }
//     } else {
//       params = {
//         direction: "desc",
//         sortBy:"creationDate"
//       }
//     }
//     return params
// }


//   async function productOrderTabs(status) {
//     let productOrder = await OrderRepo.getByStatus({
//       loading: setIsLoading,
//       status: status,
//       params: checkSortTabs(status)
//     })    
//     if (productOrder.status === 200) {
//       setProductOrder(productOrder.data.data)
//       setIsOrderAlvailable(true)
//     } else {
//       setIsOrderAlvailable(false)
//     }
//   };

//   // function updateTab(functions) {
//   //   setProductOrder([])
//   //   functions()
//   // };

//   function handleChange(selectkey) {
//     setActiveKey(selectkey)
//     switch (selectkey) {
//       case "1":
//         productOrderTabs(0)
//         break;
//       case "2":
//         productOrderTabs(1)
//         break;
//       case "3":
//         productOrderTabs(2)
//         break;
//       case "4":
//         productOrderTabs(3)
//         break;
//       case "5":
//        productOrderTabs(4)
//         break;
//       default:
//         console.log("error");
//     }
//   }

//   function actionUpdateTab(tabPosition) {
//     productOrderTabs(tabPosition);
//   }

//   function itemList(list) {
//     return isOrderAlvailable ? list.content : <NoOrderHistory />;
//   }

//   function responseListWaiting(
//     showOrderDetailsDashboard,
//     responseProductOrder,
//     labelTabDetails,
//     estimateAccepted) {
//     return <OrderListWaiting
//       isHowToShowModalOpen={isHowToShowModalOpen}
//       selectedOrder={selectedOrder}
//       showHowToModalPayment={toggleIsHowToShowModalOpen}
//       productOrder={responseProductOrder}
//       actionUpdateTab={actionUpdateTab}
//       actionShowOrderDetailsDashboard={actionShowOrderDetailsDashboard}
//       showOrderDetailsDashboard={showOrderDetailsDashboard}
//       showReceivedConfirm={showReceivedConfirm}
//       labelTabDetails={labelTabDetails}
//       estimateAccepted={estimateAccepted}
//     />
//   }

//   function responOrderDetailsDashboard(showOrderDetailsDashboard) {
//     return <OrderDetailsDashboard
//       isHowToShowModalOpen={isHowToShowModalOpen}
//       selectedOrder={selectedOrder}
//       showHowToModalPayment={toggleIsHowToShowModalOpen}
//       labelTabDetails={labelTabDetails}
//       estimateAccepted={estimateAccepted}
//       tabsShow={showOrderDetailsDashboard}
//       invoiceNumber={invoiceNumber}
//       id={id}
//       orderDetailsRespon={order}
//       showReceivedConfirm={showReceivedConfirm}
//       actionShowOrderListWaiting={() => actionShowOrderListWaiting(showOrderDetailsDashboard)} />
//   }

//   function listWaiting(isShow, labelTabDetails, estimateAccepted) {
//     return responseListWaiting(isShow, productOrder, labelTabDetails, estimateAccepted);
//   }

//   const listTabsContent = [
//     {
//       key: "1",
//       nameTabs: "Belum Bayar",
//       content: listWaiting("isShowOrderDetailsDashboardNotPay", "Belum Bayar")
//     },
//     {
//       key: "2",
//       nameTabs: "Sedang Diproses",
//       content: listWaiting("isShowOrderDetailsDashboardNotSent", "Belum Dikirim")
//     },
//     {
//       key: "3",
//       nameTabs: "Dalam Pengiriman",
//       content: listWaiting("isShowOrderDetailsDashboardInDelivery",
//         "Dalam Pengiriman", "Perkiraan Diterima")
//     },
//     {
//       key: "4",
//       nameTabs: "Selesai",
//       content: listWaiting("isShowOrderDetailsDashboardFinish",
//         "Selesai", "Pesanan Diterima")
//     },
//     {
//       key: "5",
//       nameTabs: "Batal",
//       content: listWaiting("isShowOrderDetailsDashboardCancel", "Batal")
//     }
//   ]

//   return (
//     <div className="mp-customer-order-navigation">
//       {isShowDetailDashboard === false ?
//         <Tabs activeKey={activeKey} onChange={handleChange}>
//           {listTabsContent.map(list => {
//             return (
//               <CustomTabPane
//                 key={list.key}
//                 tab={<span>{list.nameTabs}</span>}
//                 my_prop={
//                   <React.Fragment>
//                     <Offline polling={polling}>
//                       {alertOffline()}
//                     </Offline>
//                     <Detector
//                       render={() =>
//                         <Online polling={polling}>
//                           {isLoading ? <LoadingSpin/> : itemList(list)}
//                         </Online>} />
//                   </React.Fragment>} />)
//           })}
//         </Tabs>
//         :
//         <React.Fragment>
//           {responOrderDetailsDashboard(isShowDashboardItem)}
//         </React.Fragment>
//       }
//     </div>
//   );
// }

