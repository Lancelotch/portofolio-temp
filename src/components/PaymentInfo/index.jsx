import React from 'react';
import "./style.sass";
import currencyRupiah from '../../library/currency';
import { Row, Col } from 'antd';
import strings from '../../localization/localization';

const PaymentInfo = props => {
    const { shipping, payment, totalAmount, productQuantity, price } = props;
    return (
        <React.Fragment>
        {shipping !== undefined  | shipping ?
                <div className="paymentInfo">
                    <hr className="productOrder__inline" />
                    <Row>
                        <Col md={12}>
                            <div className="wrapperLeft">
                                <p className="nameCustomerText">
                                    {strings.price_product}
                                        <br />
                                    {strings.pcs}
                                </p>
                                <b className="paymentBold">{strings.sub_total}</b>
                                <p className="nameCustomerText"
                                    style={{
                                        marginBottom: 0,
                                        marginTop: 15
                                    }}>{strings.international_shipping}</p>
                                <p className="customerVia">{shipping.via}</p>
                                <p className="totalPesanan">{strings.total_payment}</p>
                                <p className="nameCustomerText">{strings.payment_type}</p>
                                <span>{strings.notice_payment_administrasi}</span>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="wrapperRight">
                                <p className="nameCustomerText"> {currencyRupiah(price)} <br />
                                    X&nbsp;{productQuantity}</p>
                                <b className="paymentBold">{currencyRupiah(totalAmount)}</b>
                                <p className="nameCustomerText"
                                    style={{ marginTop: 35 }}>
                                    {shipping.via === "Laut" && "laut" ?
                                        "Harga Sudah Termasuk " :
                                        currencyRupiah(shipping.internationalPrice)
                                    }
                                </p>
                                <p
                                    className="nameCustomerText"
                                    style={{
                                        marginBottom: 0,
                                        marginTop: 10
                                    }}>{currencyRupiah(totalAmount)}
                                    <br /><br />
                                    {payment.paymentType}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>:null}
        </React.Fragment>
    );
};

export default PaymentInfo;