import React from 'react';
import { Row, Col } from 'antd';
import convertTimesTime from '../../library/convertTimestime';
import "./style.sass";

const PaymentDateInfo = props => {
    const { bank, endDatePay, typePayment } = props
    return (
        <div className="paymentDateInfo">
            <Row>
                <Col md={24}>
                    <div className="wrapperLeft">
                        <p className="nameCustomerText">Bayar Sebelum</p>
                        <font className="paymentEndDate">{convertTimesTime.millisecond(endDatePay)}</font>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperLeft">
                    <p className="nameCustomerText">Bayar Ke</p>
                        <h3 className="giyarto">PT. Giyarto Manunggal Sejati</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperRight">
                        <img src={bank.imageUrl} alt="" style= {{ height: 18, width: 59 }} />
                        &nbsp;
                        <font className="virtualAccount">{typePayment.virtualAccount}</font>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="wrapperLeft">
                        <p className="nameCustomerText">Metode Pembayaran</p>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperRight">
                        <p className="nameCustomerText">{typePayment.paymentType}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentDateInfo;