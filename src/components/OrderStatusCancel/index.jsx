import React from 'react';
import { Steps, Icon, Card, Affix, Button } from 'antd';
import { receivedOrderIcon, cancelOrderIcon, paymentOrder } from '../../library/iconTracking';
import "./style.sass";
import "./styleCustomer.sass";
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusCancel = props => {
  const { orderDate, cancelBy, orderDraftCancel, actionShowOrderListWaiting, labelTabDetails } = props
  return (
    <React.Fragment>
      <div
        style={{
          marginLeft: 15,
          display: "flex",
          justifyContent: "space-between"
        }}>
        <h2
          style={{
            color: "#4A4A4A",
            fontSize: 24
          }}>
          {labelTabDetails}
        </h2>
        <Affix offsetTop={170}>
          <div className="buttonOrderDetails">
            <Button
              onClick={() => actionShowOrderListWaiting()}>
              <Icon type="arrow-left" /> &nbsp;
              Kembali
      </Button>
          </div>
        </Affix>
      </div>
      <Card>
        <div className={cancelBy === "ADMIN" | cancelBy === "admin" | cancelBy === "SYSTEM" ? "stepOrderStatusCancelBySystem" : "stepOrderStatusCancel"}>
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(orderDate.orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={receivedOrderIcon} />}>
            </Step>
            {cancelBy === "ADMIN" | cancelBy === "admin" | cancelBy === "SYSTEM" &&
              <Step
                status={"finish"}
                description={convertTimesTime.millisecond(orderDraftCancel.createdDate)}
                title="Pesenan Dibatalkan"
                icon={<Icon className={"iconOrderStatusStepActive"}
                  component={paymentOrder} />}
              />}
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderDraftCancel && orderDraftCancel.createdDate)}
              title="Pesenan Dibatalkan"
              icon={<Icon className={"iconOrderStatusStepActive"}
                component={cancelOrderIcon} />}
            />
          </Steps>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default OrderStatusCancel;

