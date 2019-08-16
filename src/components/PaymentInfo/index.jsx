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
            <div className="mp-payment-info">
                <Row>
                    <Col md={24}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="mp-price-product-payment-info">
                                            {strings.price_product}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="mp-price-payment-info">
                                            {currencyRupiah(productSnapshot.price)}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="mp-payment-info-pcs">
                                            {strings.pcs}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="mp-quantity-payment-info">
                                            X&nbsp;{productSnapshot.quantity}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b className="mp-sub-total-payment-info">
                                            {strings.sub_total}
                                        </b>
                                    </td>
                                    <td>
                                        <p className="mp-sub-total-payment-info 
                                        mp-sub-total-right-payment-info">
                                            {currencyRupiah(totalAmount)}
                                        </p>
                                    </td>
                                </tr>
                                {shipment !== undefined | shipment ?
                                    <tr>
                                        <td>
                                            <p className="mp-international-shipping-payment-info">
                                                {strings.international_shipping}
                                            </p>
                                        </td>
                                    </tr>
                                    : null}
                                {shipment !== undefined | shipment ?
                                    <tr>
                                        <td>
                                            <p className="mp-customer-via mp-customer-via-courier-name">
                                                {shipment.via === "air" ? "Udara" : "Laut"}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="mp-customer-via mp-customer-via-courier-price">
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
                                            <p className="mp-payment-info-pengiriman-lokal">
                                                Pengiriman Lokal
                                            </p>
                                        </td>
                                    </tr>
                                    : null}
                                {courier !== undefined | courier ?
                                    <tr>
                                        <td>
                                            <p className="mp-customer-via mp-customer-via-courier-name">
                                                {courier.name}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="mp-customer-via 
                                            mp-customer-via-courier-price">
                                                {currencyRupiah(courier.price)}
                                            </p>
                                        </td>
                                    </tr> : null}
                                { /* courier !== undefined | courier ?
                                        <tr>
                                            <td>
                                                <p className="mp-customer-via"
                                                    style={{ marginBottom: 0, marginTop: -20 }}>
                                                    Asuransi
                                                    </p>
                                            </td>
                                            <td>
                                                <p className="mp-customer-via"
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
                                        <p className="mp-total-pesanan mp-total-pesanan-string"
                                        >{strings.total_payment}</p>
                                    </td>
                                    <td>
                                        <p className="mp-total-pesanan mp-total-pesanan-amount">
                                            {currencyRupiah(amount)}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="mp-payment-type-payment-info">
                                            {strings.payment_type}
                                        </p>
                                    </td>
                                    {payment !== undefined | payment ?
                                        <td>
                                            <p
                                                className="mp-price-payment-info">
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
                            <div className="mp-payment-info-cancel-order" key={""}>
                                <Row>
                                    <Col md={24}>
                                        <p className="mp-payment-info-cancel-order__label">
                                            {strings.cancel_order_by} {cancelBy.cancelBy}
                                        </p>
                                        <p className="mp-payment-info-cancel-order__label-estimate">
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