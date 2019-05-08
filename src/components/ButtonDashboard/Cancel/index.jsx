import React from 'react'
import { Button } from 'antd'
import "../../ProductOrder/style.sass"
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"

const Cancel = (props) => {
  const { indexes, viewOrderDetail } = props
  let id = ''
  indexes.map((p, i) => {
    id = p.productId
    return id
  })
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      padding: 15
    }}>
      <Button
        className="waitingPayment__payNow"
      >
        <Link to={pageUrlProductDetail + id}>Beli Lagi</Link>
      </Button>
      <Button
        className="waitingPayment__detailPesanan"
        onClick={() => viewOrderDetail()}>
        Detail Pembatalan
        </Button>
    </div>
  )
}

export default Cancel