import React from 'react'
import "../../ProductOrder/style.sass"
import { Button } from 'antd'
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"

const Pay = (props) => {
  const { showDeleteConfirm,
    orderProduct,
    i,
    toggleIsHowToShowModalOpen,
    order,
    viewOrderDetail,
    index,
    indexButton,
    productId
  } = props
  let productDetailId = ''
  productId.map((p, i) => {
    productDetailId = p.productId
    return productDetailId
  })
  console.log('tombol detail pesanan by iiiid',order.orderId);
  
  return (
    <React.Fragment>
      {index === 1 && (
        <React.Fragment>
          <Button
            className="waitingPayment__button"
            onClick={() => showDeleteConfirm(orderProduct, i)}
          >
            Batalkan Pesanan
        </Button>
          <div
            style={{
              float: "right",
              marginRight: 15
            }}>
            <Button
              className="waitingPayment__payNow"
              onClick={toggleIsHowToShowModalOpen.bind(this, order)}
            >
              Bayar Sekarang
          </Button>
            <Button
              className="waitingPayment__detailPesanan"
              onClick={() => viewOrderDetail(order)}
            >
            {console.log("ini fungsi dari orderlist",()=>viewOrderDetail(order))}
              Detail Pesanan
          </Button>
          </div>
        </React.Fragment>
      )}
      {indexButton === 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </div>
      )}
      {indexButton === 4 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail + productDetailId}>Beli Lagi</Link>
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </div>
      )}
      {indexButton === 3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 15
          }}>
          <Button className="waitingPayment__payNow">
            Pesanan Detirma
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Pay