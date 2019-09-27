import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import Button from '../Button';
import strings from '../../localization/localization';
import "./style.sass";
import ReCAPTCHA from "react-google-recaptcha";



function ResendVerification(props) {
    const [acceptReset, setAcceptReset] = useState(true)

    function onCaptchaChange(value) {
        if (value) {
            setAcceptReset(false)
        }
    };

    return (
        <Card className="mp-status-profile">
            <Row>
                <Col md={8}>
                    <h4 className="mp-status-profile__heading">
                        {strings.profile_status_heading}
                    </h4>
                    <p className="mp-status-profile__text">
                        {strings.profile_status_text}
                    </p>
                    <div className="mp-status-profile__captcha">
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_KEY_CAPTCHA}
                            onChange={(value) => onCaptchaChange(value)}
                        />
                    </div>
                    <Button
                        onClick={props.actionResendVerificationEmail}
                        disabled={acceptReset}>
                        {strings.profile_status_verifikasi}
                    </Button>
                </Col>
                <Col md={16}>
                    <div className="mp-status-profile__background-resend-verifikasi-email" />
                </Col>
            </Row>
        </Card>
    );
};

export default ResendVerification;