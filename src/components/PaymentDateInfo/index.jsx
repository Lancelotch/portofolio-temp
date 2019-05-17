import React from 'react';
import { Row, Col } from 'antd';
import convertTimesTime from '../../library/convertTimestime';
import "./style.sass";
import strings from '../../localization/localization';


const PaymentDateInfo = props => {
    const { bank, endDatePay, typePayment } = props
    return (
        <React.Fragment>
            {typePayment !== undefined | typePayment ?
                <div className="paymentDateInfo">
                    <Row>
                        <Col md={24}>
                            <div className="wrapperLeft">
                                <p className="nameCustomerText">{strings.before_pay}</p>
                                <font className="paymentEndDate">{convertTimesTime.millisecond(endDatePay)}</font>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="wrapperLeft">
                                <p className="nameCustomerText">{strings.pay_to}</p>
                                <h3 className="giyarto">{strings.giyarto}</h3>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="wrapperRight dateInfoPayment">
                                <img src={bank.imageUrl} alt="" style={{ maxHeight: 18, maxWidth: 59 }} />
                                &nbsp;&nbsp;
                        <font className="virtualAccount">{typePayment.virtualAccount}</font>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="wrapperLeft">
                                <p className="nameCustomerText">{strings.payment_type}</p>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="wrapperRight">
                                <p className="nameCustomerText">{typePayment.paymentType}</p>
                            </div>
                        </Col>

                    </Row>
                </div> : null}

        </React.Fragment>
    );
};

export default PaymentDateInfo;