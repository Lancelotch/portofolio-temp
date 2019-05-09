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
    productDetail
  } = props
  let id = ''
  productDetail.map((p, i) => {
    id = p.productId
    return id
  })
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
          <div style={{ float: "right", marginRight: 15 }}>
            <Button
              className="waitingPayment__payNow"
              onClick={toggleIsHowToShowModalOpen.bind(this, order)}
            >
              Bayar Sekarang
          </Button>
            <Button
              className="waitingPayment__detailPesanan"
              onClick={() => viewOrderDetail()}
            >
              Detail Pesanan
          </Button>
          </div>
        </React.Fragment>
      )}
      {indexButton === 2 && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </div>
      )}
      {indexButton === 4 && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
          <Button
            className="waitingPayment__payNow"
          >
            <Link to={pageUrlProductDetail + id}>Beli Lagi</Link>
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
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
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