---
name: Order Status
menu: Components
---

import { Playground, Props } from 'docz'
import OrderStatus from './'
import "antd/dist/antd.less"

# Order Status Tracking

This is OrderStatusTracking of Monggopesen Ecommerce

## Properties (props)

- Type: 'default' or 'cancel'
- orderActivityDate: Object = {
  actionDate: 0,<br/>
  id: "1cff3a87-ea7d-4c30-b71e-0b09954437e7",<br/>
  orderDate: 1563883373241,<br/>
  paymentDate: 0,<br/>
  receivedDate: 0,<br/>
  shipmentDate: 0,
  }<br/>
-orderCancel: Object = {
  cancelBy: "SYSTEM",<br/>
  createdDate: 1568263388418,<br/>
  id: "a82b7e72-6b43-460d-ad3c-474dae2fd45a",<br/>
  reasonCodeStatus: "EXP"
  }

<Props of={OrderStatus} />

## Purpose Of Props

## Details

no details

## Playground

### Status Invoice

<Playground>
{() => {     
let orderActivityDate = {
    actionDate: 0,
    id: "1cff3a87-ea7d-4c30-b71e-0b09954437e7",
    orderDate: 1563883373241,
    paymentDate: 0,
    receivedDate: 0,
    shipmentDate: 0,
}
   return  <OrderStatus
                    labelTabDetails="BelumBayar"
                    orderActivityDate={orderActivityDate}
                    type="default"
                />
}}
</Playground>

### Status Cancel By System or Admin

<Playground>
{() => {     
let orderCancel = {
    cancelBy: "SYSTEM",
createdDate: 1568263388418,
id: "a82b7e72-6b43-460d-ad3c-474dae2fd45a",
reasonCodeStatus: "EXP"
}
let orderActivityDate = {
    actionDate: 0,
    id: "1cff3a87-ea7d-4c30-b71e-0b09954437e7",
    orderDate: 1563883373241,
    paymentDate: 0,
    receivedDate: 0,
    shipmentDate: 0,
}
   return  <OrderStatus
                    labelTabDetails="Cancel"
                     orderActivityDate={orderActivityDate}
                    orderCancel={orderCancel}
                    type="cancel"
                />
}}
</Playground>

### Status Cancel By Customer

<Playground>
{() => {     
    let orderCancel = {
        cancelBy: "CUSTOMER",
        createdDate: 1565340736249,
        id: "a800e08f-7943-40ac-b6cd-d6f92b9131fb",
        reasonCodeStatus: "CLCB"
    }
    let orderActivityDate = {
        actionDate: 0,
        id: "1cff3a87-ea7d-4c30-b71e-0b09954437e7",
        orderDate: 1563883373241,
        paymentDate: 0,
        receivedDate: 0,
        shipmentDate: 0,
    }
   return  <OrderStatus
                    labelTabDetails="Cancel"
                     orderActivityDate={orderActivityDate}
                    orderCancel={orderCancel}
                    type="cancel"
                />
}}
</Playground>
