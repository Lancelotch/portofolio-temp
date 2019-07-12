import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon, boxOrder } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = (props) => {
  const {
    dateOrder,
    tabsNotSent,
    tabsInDelivery,
    tabsFinish } = props;
    
    // fixPositionDropdown = isTopHeaderShow => {
    //   console.log("isShow", isTopHeaderShow);
      
    //   if (!isTopHeaderShow){
    //     this.setState({ marginTopBackButton: 70 })
    //   } else {
    //     this.setState({ marginTopBackButton: 120 });
    //   }
  
    // }
  return (
    <React.Fragment>
      <Card className="card-step-container" style={{marginTop:10}}>
        <div className="stepOrderStatus">
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(dateOrder.orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={boxOrder} />}>
            </Step>
            <Step
              status={tabsNotSent === 2 ? "finish" : ""}
              description={tabsNotSent === 2 ? convertTimesTime.millisecond(dateOrder.orderDate) : ""}
              title="Pesenan Dibayarkan"
              icon={<Icon className={tabsNotSent === 2 ? "iconOrderStatusStepActive" : ""}
                component={paymentOrder} />}
            />
            {
              <Step
                status={tabsInDelivery === 3 && tabsNotSent === 2 ? "finish" : ""}
                description={tabsInDelivery === 3 && tabsNotSent === 2 ? convertTimesTime.millisecond(dateOrder.orderDate) : ""}
                title="Pesenan Dikirim"
                icon={<Icon className={tabsInDelivery === 3 && tabsNotSent === 2 ? "iconOrderStatusStepActive" : ""}
                  component={deliveryOrderIcon} />}
              />}
            <Step
              status={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ? "finish" : ""}
              description={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ? convertTimesTime.millisecond(dateOrder.orderDate) : ""}
              title="Pesenan Diterima"
              icon={<Icon component={receivedOrderIcon}
                className={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ?
                  "iconOrderStatusStepActive" : ""} />}
            />
          </Steps>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default OrderStatusStep;

