import React from 'react';
import { Card, Row, Col } from 'antd';
import Button from '../Button';
import strings from '../../localization/localization';
import "./style.sass";

function ResendVerifikasiEmail(props) {
    return (
        <Card className="mp-status-profile">
            <Row>
                <Col md={8}>
                    <h4 className="mp-status-profile__heading">Email belum di verfikasi</h4>
                    <p className="mp-status-profile__text">Jika tautan pada email yang kami kirim sudah kadaluarsa
                gunakan tombol kirim ulang dibawah ini.</p>
                    <Button
                        onClick={props.actionResendVerifikasiEmail}>
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

export default ResendVerifikasiEmail;