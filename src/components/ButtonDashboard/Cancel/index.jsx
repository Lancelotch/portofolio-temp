import React from 'react'
import { Button } from 'antd'
import "../../ProductOrder/style.sass"
import { Link } from "react-router-dom";
import { pageUrlProductDetail } from "../../../library/url"
import strings from '../../../localization/localization';

const Cancel = (props) => {
  const { productDetail, showOrderDetailsDashboard,i } = props
  let id = ''
  productDetail.map(p => {
    id = p.productId
    return id
  })
  return (
    <div style={{
      display: "flex", justifyContent: "flex-end"
    }}>
      <Button
        className="waitingPayment__payNow"
      >
        <Link to={pageUrlProductDetail + id}>Beli Lagi</Link>
      </Button>
      <Button
        className="waitingPayment__detailPesanan"
            onClick={() => showOrderDetailsDashboard(i)}>
        {strings.cancel_details}
      </Button>
    </div>
  )
}

export default Cancel