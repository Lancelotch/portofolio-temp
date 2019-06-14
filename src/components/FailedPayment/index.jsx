import React from 'react';
import "./style.sass";
import { Link } from "react-router-dom";
import PaymentFailed from '../../assets/img/ic_background/illustration_failed_payment.png';
import strings from '../../localization/localization';
import { Row, Col } from 'antd';

const FailedPayment = () => {
    return (
        <div className="container">
            <Row>
                <Col md={8}>
                    <div className="failedPayment">
                        <h2>{strings.oh_no}</h2>
                        <h4 className="failedPayment__text">{strings.text_cancel_payment}</h4>
                        <p className="failedPayment__textParagraph">{strings.text_failed_payment}</p>
                        <Link style={{
                            color: "#FFFFFF",
                            fontSize: 16,
                            fontWeight: 500
                        }} to="/checkout">
                            <button className="failedPayment__buttonFailed">
                                {strings.back}
                            </button>
                        </Link>
                    </div>
                </Col>
                <Col md={16}>
                    <div className="failedContent">
                        <img src={PaymentFailed} alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default FailedPayment;