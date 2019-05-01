import React from 'react'
import { Button } from 'antd'
import "../../ProductOrder/style.sass"
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"

const Cancel = (props) => {
  const { productDetail, viewOrderDetail } = props
  let id = ''
  productDetail.forEach((p, i) => {
    id = p.productId
    // return id
  })
  return (
    <p style={{ textAlign: "right", marginRight: 15 }}>
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
    </p>
  )
}

export default Cancel