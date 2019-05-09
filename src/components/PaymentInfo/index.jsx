import React from 'react';
import "./style.sass";
import currencyRupiah from '../../library/currency';
import { Row, Col } from 'antd';

const PaymentInfo = props => {
    const { transport, typePayment, totalAmount, productQuantity, price } = props;
    return (
        <div className="paymentInfo">
            <hr className="productOrder__inline" />
            <Row>
                <Col md={12}>
                    <div className="wrapperLeft">
                        <p className="nameCustomerText">
                            Harga Product
                        <br />
                            Pcs
                        </p>
                        <b className="paymentBold">Sub Total</b>
                        <p className="nameCustomerText"
                            style={{
                                marginBottom: 0,
                                marginTop: 15
                            }}>Pengiriman International</p>
                        <p className="customerVia">{transport.via}</p>
                        <p className="totalPesanan">Total Pesanan</p>
                        <p className="nameCustomerText" style={{}}>Metode Pembayaran</p>
                        <span>Subtotal yang tercantum diatas udah termasuk  biaya bea masuk, pajak dan administrasi.</span>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="wrapperRight">
                        <p className="nameCustomerText"> {currencyRupiah(price)} <br />
                            X&nbsp;{productQuantity}</p>
                        <b className="paymentBold">{currencyRupiah(totalAmount)}</b>
                        <p className="nameCustomerText"
                            style={{ marginTop: 35 }}>
                            {transport.via === "Laut" && "laut" ?
                                "Harga Sudah Termasuk " :
                                currencyRupiah(transport.internationalPrice)
                            }
                        </p>
                        <p
                            className="nameCustomerText"
                            style={{
                                marginBottom: 0,
                                marginTop: 10
                            }}>{currencyRupiah(totalAmount)}
                            <br /><br />
                            {typePayment.paymentType}
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentInfo;