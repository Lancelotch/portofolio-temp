import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon, boxOrder } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = (props) => {
  const { orderDate, paymentDate, shipmentDate, receivedDate } = props.dateOrder
  return (
    <React.Fragment>
      <Card className="card-step-container" style={{ marginTop: 10 }}>
        <div className="mp-step-order-status">
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
              icon={<Icon className={paymentDate ? "mp-icon-order-status-step-active" : "mp-icon-order-status-step"}
                component={paymentOrder} />}
            />
            {
              <Step
                status={shipmentDate && paymentDate ? "finish" : ""}
                description={shipmentDate && paymentDate && convertTimesTime.millisecond(shipmentDate)}
                title="Pesenan Dikirim"
                icon={<Icon className={shipmentDate && paymentDate  ? "mp-icon-order-status-step-active" : "mp-icon-order-status-step"}
                  component={deliveryOrderIcon} />}
              />}
            <Step
              status={receivedDate && paymentDate && shipmentDate ? "finish" : ""}
              description={receivedDate && paymentDate && shipmentDate && convertTimesTime.millisecond(receivedDate)}
              title="Pesenan Diterima"
              icon={<Icon component={receivedOrderIcon}
                className={receivedDate && paymentDate && shipmentDate  ?
                  "mp-icon-order-status-step-active" : "mp-icon-order-status-step"} />}
            />
          </Steps>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default OrderStatusStep;

