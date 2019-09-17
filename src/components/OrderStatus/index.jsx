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

  console.log(props.orderActivityDate);
  console.log(props.orderCancel);



  const StatusInvoice = () => {
    return (
      <Steps size="small" labelPlacement="vertical">
        <Step
          status="finish"
          title="Pesenan Dibuat"
          description={convertTimesTime.millisecond(orderDate)}
          icon={<Icon className="mp-icon-order-status-step-active"
            component={boxOrder} />}>
        </Step>
        <Step
          status={paymentDate ? "finish" : ""}
          description={paymentDate && convertTimesTime.millisecond(paymentDate)}
          title="Pesenan Dibayarkan"
          icon={
            <Icon className={paymentDate ?
              "mp-icon-order-status-step-active" :
              "mp-icon-order-status-step"}
              component={paymentOrder} />}
        />
        {
          <Step
            status={shipmentDate && paymentDate ? "finish" : ""}
            description={
              shipmentDate && 
              paymentDate && 
              convertTimesTime.millisecond(shipmentDate)}
            title="Pesenan Dikirim"
            icon={<Icon className={
              shipmentDate && 
              paymentDate ? 
              "mp-icon-order-status-step-active" : 
              "mp-icon-order-status-step"
            }
              component={deliveryOrderIcon} />}
          />}
        <Step
          status={receivedDate && paymentDate && shipmentDate ? "finish" : ""}
          description={
            receivedDate && 
            paymentDate && 
            shipmentDate && convertTimesTime.millisecond(receivedDate)}
          title="Pesenan Diterima"
          icon={<Icon component={receivedOrderIcon}
            className={receivedDate && paymentDate && shipmentDate ?
              "mp-icon-order-status-step-active" : "mp-icon-order-status-step"} />}
        />
      </Steps>
    );
  };

  const StatusCancel = () => {
    return (
      <Steps size="small" labelPlacement="vertical">
        <Step
          status="finish"
          title="Pesenan Dibuat"
          description={convertTimesTime.millisecond(orderDate)}
          icon={<Icon className="mp-icon-order-status-step-active"
            component={receivedOrderIcon} />}>
        </Step>
         {orderCancel.cancelBy &&
          orderCancel.cancelBy === "ADMIN" |
          orderCancel.cancelBy === "admin" |
          orderCancel.cancelBy === "SYSTEM" &&
          <Step
            status={"finish"}
            description={convertTimesTime.millisecond(paymentDate)}
            title="Pesenan Dibayarkan"
            icon={<Icon className={"mp-icon-order-status-step-active"}
              component={paymentOrder} />}
          />}
        <Step
          status={"finish"}
          description={convertTimesTime.millisecond(orderCancel && orderCancel.createdDate)}
          title="Pesenan Dibatalkan"
          icon={<Icon className="mp-icon-order-status-step-active"
            component={cancelOrderIcon} />}
        />
      </Steps>
    );
  };

  let checkCancelBy =
     ((orderCancel && orderCancel.cancelBy === "ADMIN") ||
      (orderCancel && orderCancel.cancelBy === "admin") ||
      (orderCancel && orderCancel.cancelBy === "SYSTEM")) ?
      "mp-step-order-cancel-by-system" : "mp-step-order-cancel-by-customer"

  return (
    <React.Fragment>
      <Card style={{ marginTop: 20 }}>
        <div className={`${orderCancel && checkCancelBy} mp-step-order-status`}>
          {type === "default" ? 
          props.orderActivityDate && <StatusInvoice /> : 
          orderCancel && <StatusCancel />}
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


