import React from 'react';
import "./style.sass";
import currencyRupiah from '../../library/currency';
import { Row, Col } from 'antd';

const PaymentInfo = props => {
    const { transport, typePayment, totalAmount, productQuantity, price } = props;
    console.log('viaasssdsdsdas', props);

    return (
        <div className="paymentInfo">
            <Row>
                <Col md={12}>
                    <div className="wrapperLeft">
                        <p>Harga Product</p>
                        <p>Pcs</p>
                        <p>Sub Total</p>
                        <p>Pengiriman International</p>
                        <p>{transport.via}</p>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperRight">
                        <p>{currencyRupiah(price)}</p>
                        <p>X&nbsp;{productQuantity}</p>
                        <p>{currencyRupiah(totalAmount)}</p>
                        <p>{currencyRupiah(transport.internationalPrice)}</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="wrapperLeft">
                        <p>Total Pesanan</p>
                        <p>Metode Pembayaran</p>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperRight">
                        <p >{currencyRupiah(totalAmount)}</p>
                        <p>{typePayment.paymentType}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentInfo;