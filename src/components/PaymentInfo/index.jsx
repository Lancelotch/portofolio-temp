import React from 'react';
import "./style.sass";
import currencyRupiah from '../../library/currency';
import { Row, Col, Card } from 'antd';
import strings from '../../localization/localization';

const PaymentInfo = props => {
    const { shipping, payment, totalAmount, productQuantity, price } = props;
    return (
        <React.Fragment>
            {shipping !== undefined | shipping ?
                <Card>
                    <div className="paymentInfo">
                        <Row>
                            <Col md={24}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{ marginBottom: 0 }}>
                                                    {strings.price_product}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{ marginBottom: 0, textAlign: "right", fontSize: 18 }}>
                                                    {currencyRupiah(price)}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{
                                                        marginBottom: 0,
                                                        marginTop: -20
                                                    }}>
                                                    {strings.pcs}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{
                                                        marginBottom: 0,
                                                        textAlign: "right",
                                                        marginTop: -20
                                                    }}>
                                                    X&nbsp;{productQuantity}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b className="paymentBold">
                                                    {strings.sub_total}
                                                </b>
                                            </td>
                                            <td>
                                                <p className="paymentBold"
                                                    style={{ textAlign: "right"}}>
                                                    {currencyRupiah(totalAmount)}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{ marginBottom: 0,fontSize:14 }}>
                                                    {strings.international_shipping}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="customerVia"
                                                    style={{ marginBottom: 0, marginTop: -20 }}>
                                                    {shipping.via}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="customerVia"
                                                    style={{
                                                        marginBottom: 0,
                                                        textAlign: "right",
                                                        marginTop: -20
                                                    }}>
                                                    {shipping.via === "Laut" && "laut" ?
                                                        "Ongkir Sudah Termasuk " :
                                                        currencyRupiah(shipping.internationalPrice)
                                                    }
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="totalPesanan"
                                                    style={{ marginBottom: 0,marginTop:24 }}
                                                >{strings.total_payment}</p>
                                            </td>
                                            <td>
                                                <p
                                                    className="totalPesanan"
                                                    style={{ marginBottom: 0, textAlign: "right",marginTop:24 }}>
                                                    {currencyRupiah(totalAmount)}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="nameCustomerText"
                                                    style={{ marginBottom: 0 }}>
                                                    {strings.payment_type}
                                                </p>
                                            </td>
                                            <td>
                                                <p
                                                    className="nameCustomerText"
                                                    style={{ marginBottom: 0, textAlign: "right" }}>
                                                    {payment.bankName} Virtual Account
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style={{ marginTop: -20 }}>{strings.notice_payment_administrasi}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </div> </Card> : null}
        </React.Fragment>
    );
};

export default PaymentInfo;