import React from 'react';
import "./style.sass";
import { Link } from "react-router-dom";
import PaymentFailed from '../../assets/img/ic_background/illustration_failed_payment.png';
import strings from '../../localization/localization';

const FailedPayment = () => {
    return (
        <div className="container">
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
                <div className="failedContent">
                    <img src={PaymentFailed} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FailedPayment;