import React from 'react';
import { Row, Col, Card } from 'antd';
import convertTimesTime from '../../library/convertTimestime';
import "./style.sass";
import strings from '../../localization/localization';


const PaymentDateInfo = props => {
    const { bank, endDatePay, typePayment } = props
    return (
        <React.Fragment>
            {typePayment !== undefined | typePayment ?
                <div className="paymentDateInfo">
                    <Card>
                        <Row>
                            <Col md={24}>
                                <p className="nameCustomerText" style={{ marginBottom: 5, fontSize: 14 }}>{strings.before_pay}</p>
                                <font className="paymentEndDate">{convertTimesTime.millisecond(endDatePay)}</font>
                            </Col>
                            <Col md={24} style={{ marginTop: 25 }}>
                                <p className="nameCustomerText" style={{ marginBottom: 0, fontSize: 14 }}>
                                    {strings.pay_to}
                                </p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h3 className="giyarto">{strings.giyarto}</h3>
                                            </td>
                                            <td>
                                                <div className="dateInfoPayment">
                                                    <img src={bank.imageUrl} alt="" style={{ maxHeight: 25, maxWidth: 69 }} />
                                                    &nbsp;&nbsp;
                                                    <font className="virtualAccount">
                                                        {typePayment.virtualAccount}
                                                    </font>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="nameCustomerText">{strings.payment_type}</p>
                                            </td>
                                            <td>
                                                <p className="nameCustomerText" style={{ textAlign: "right" }}>{
                                                    typePayment.bankName} Virtual Account
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Card>  </div> : null}

        </React.Fragment>
    );
};

export default PaymentDateInfo;