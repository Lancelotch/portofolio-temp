import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon, boxOrder, cancelOrderIcon } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';
import propTypes from 'prop-types';

const Step = Steps.Step;

export default function OrderStatus(props) {

  const { orderCancel, type } = props
  const { orderDate, paymentDate, shipmentDate, receivedDate } = props.orderActivityDate
  const checkCancelBy = orderCancel && 
 (orderCancel.cancelBy ===  "ADMIN" || 
  orderCancel.cancelBy ===  "SYSTEM")

  const orderActivityStatusInvoice = [
    {
      icon: boxOrder,
      title: 'Pesanan Dibuat',
      time: orderDate
    },
    {
      icon: paymentOrder,
      title: 'Pesanan Dibayarkan',
      time: paymentDate
    },
    {
      icon: deliveryOrderIcon,
      title: 'Pesanan Dikirim',
      time: shipmentDate
    },
    {
      icon: receivedOrderIcon,
      title: 'Pesanan Diterima',
      time: receivedDate
    }
  ]

  const orderActivityStatusCancelSystem = [
    {
      icon: receivedOrderIcon,
      title: 'Pesanan Dibuat',
      time: orderDate
    },
    {
      icon: paymentOrder,
      title: 'Pesanan Dibayarkan',
      time: paymentDate
    },
    {
      icon: cancelOrderIcon,
      title: 'Pesanan Dibatalkan',
      time: orderCancel && orderCancel.createdDate
    }
  ]

  const orderActivityStatusCancelCustomer = [
    {
      icon: receivedOrderIcon,
      title: 'Pesanan Dibuat',
      time: orderDate
    },
    {
      icon: cancelOrderIcon,
      title: 'Pesanan Dibatalkan',
      time: orderCancel && orderCancel.createdDate
    }
  ]

  const StatusInvoice = () => {
    return (
      <Steps size="small" labelPlacement="vertical">
        {orderActivityStatusInvoice.map((status, i) => (
          <Step
            key={i}
            status={status.time ? "finish" : ""}
            description={status.time && convertTimesTime.millisecond(status.time)}
            title={status.title}
            icon={
              <Icon className={status.time ?
                "mp-icon-order-status-step-active" :
                "mp-icon-order-status-step"}
                component={status.icon} />}
          />))}
      </Steps>
    );
  };

  const StatusCancel = () => {
    return (
      <Steps size="small" labelPlacement="vertical">
        {(checkCancelBy ?
          orderActivityStatusCancelSystem :
          orderActivityStatusCancelCustomer).map((statusCancel, i) => (
            <Step
              key={i}
              status={"finish"}
              title={statusCancel.title}
              description={convertTimesTime.millisecond(statusCancel.time)}
              icon={<Icon className="mp-icon-order-status-step-active"
                component={statusCancel.icon} />}>
            </Step>
          ))}
      </Steps>
    );
  };

  return (
    <React.Fragment>
      <Card style={{ marginTop: 20 }}>
        <div className={`${orderCancel && (checkCancelBy ?
          "mp-step-order-cancel-by-system" :
          "mp-step-order-cancel-by-customer")} 
           mp-step-order-status`}>
          {type === "default" ?
            <StatusInvoice /> :
            <StatusCancel />}
        </div>
      </Card>
    </React.Fragment>
  )
}

OrderStatus.propTypes = {
  type: propTypes.oneOf(['default', 'cancel']),
  orderActivityDate: propTypes.object,
  orderCancel: propTypes.object
}

OrderStatus.defaultProps = {
  type: "default"
}


