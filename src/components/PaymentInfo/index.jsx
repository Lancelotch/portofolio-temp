import React from 'react';
import "./style.sass";
import currencyRupiah from '../../library/currency';
import { Row, Col, Card } from 'antd';
import strings from '../../localization/localization';
import convertTimesTime from '../../library/convertTimestime';

const PaymentInfo = props => {
    const { shipment, productSnapshot, payment, amount, courier, cancelBy } = props;

    const totalShipment = productSnapshot.quantity * shipment.price

    const totalAmount = productSnapshot.price * productSnapshot.quantity

    return (
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
                                            style={{
                                                marginBottom: 0,
                                                textAlign: "right",
                                                fontSize: 18
                                            }}>
                                            {currencyRupiah(productSnapshot.price)}
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
                                            X&nbsp;{productSnapshot.quantity}
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
                                            style={{ textAlign: "right" }}>
                                            {currencyRupiah(totalAmount)}
                                        </p>
                                    </td>
                                </tr>
                                {shipment !== undefined | shipment ?
                                    <tr>
                                        <td>
                                            <p className="nameCustomerText"
                                                style={{ marginBottom: 0, fontSize: 14 }}>
                                                {strings.international_shipping}
                                            </p>
                                        </td>
                                    </tr>
                                    : null}
                                {shipment !== undefined | shipment ?
                                    <tr>
                                        <td>
                                            <p className="customerVia"
                                                style={{ marginBottom: 0, marginTop: -20 }}>
                                                {shipment.via === "air" ? "Udara" : "Laut"}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="customerVia"
                                                style={{
                                                    marginBottom: 0,
                                                    textAlign: "right",
                                                    marginTop: -20
                                                }}>
                                                {shipment.via === "sea" ?
                                                    "Ongkir Sudah Termasuk " :
                                                    currencyRupiah(totalShipment)
                                                }
                                            </p>
                                        </td>
                                    </tr> : null}
                                {courier !== undefined | courier ?
                                    <tr>
                                        <td>
                                            <p className="nameCustomerText"
                                                style={{ marginBottom: 0, fontSize: 14 }}>
                                                Pengiriman Lokal
                                                    </p>
                                        </td>
                                    </tr>
                                    : null}
                                {courier !== undefined | courier ?
                                    <tr>
                                        <td>
                                            <p className="customerVia"
                                                style={{ marginBottom: 0, marginTop: -20 }}>
                                                {courier.name}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="customerVia"
                                                style={{
                                                    marginBottom: 0,
                                                    textAlign: "right",
                                                    marginTop: -20
                                                }}>
                                                {currencyRupiah(courier.price)}
                                            </p>
                                        </td>
                                    </tr> : null}
                                { /* courier !== undefined | courier ?
                                        <tr>
                                            <td>
                                                <p className="customerVia"
                                                    style={{ marginBottom: 0, marginTop: -20 }}>
                                                    Asuransi
                                                    </p>
                                            </td>
                                            <td>
                                                <p className="customerVia"
                                                    style={{
                                                        marginBottom: 0,
                                                        textAlign: "right",
                                                        marginTop: -20
                                                    }}>
                                                    {currencyRupiah(9936)}
                                                </p>
                                            </td>
                                                </tr> : null*/}
                                <tr>
                                    <td>
                                        <p className="totalPesanan"
                                            style={{ marginBottom: 0, marginTop: 24 }}
                                        >{strings.total_payment}</p>
                                    </td>
                                    <td>
                                        <p className="totalPesanan"
                                            style={{
                                                marginBottom: 0,
                                                textAlign: "right",
                                                marginTop: 24
                                            }}>
                                            {currencyRupiah(amount)}
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
                                    {payment !== undefined | payment ?
                                        <td>
                                            <p
                                                className="nameCustomerText"
                                                style={{ marginBottom: 0, textAlign: "right" }}>
                                                {payment.gateway.bankName} Virtual Account
                                                </p>
                                        </td>
                                        : null}
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ marginTop: -20 }}>{strings.notice_payment_administrasi}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {cancelBy !== undefined | cancelBy ?
                            <div className="paymentCancelOrder" key={""}>
                                <Row>
                                    <Col md={24}>
                                        <p className="paymentCancelOrder__label">
                                            {strings.cancel_order_by} {cancelBy.cancelBy}
                                        </p>
                                        <p className="paymentCancelOrder__labelEstimate">
                                            {convertTimesTime.millisecond(cancelBy.createdDate)}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            : null}
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default PaymentInfo;