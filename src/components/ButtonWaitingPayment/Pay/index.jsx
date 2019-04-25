import React from 'react'
import "../../ProductOrder/style.sass"
import { Button } from 'antd'

const Pay = (props) => {
  const { showDeleteConfirm,
    orderProduct,
    i,
    toggleIsHowToShowModalOpen,
    order,
    viewOrderDetail,
    index,
    indexButton
  } = props
  return (
    <div>
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
        <p style={{ textAlign: "right", padding: 15 }}>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </p>
      )}
      {indexButton === 3 && (
        <p style={{ textAlign: "right", padding: 15 }}>
          <Button className="waitingPayment__payNow">
            Pesanan Detirma
          </Button>
          <Button
            className="waitingPayment__detailPesanan"
            onClick={() => viewOrderDetail()}
          >
            Detail Pesanan
          </Button>
        </p>
      )}
    </div>
  )
}

export default Pay