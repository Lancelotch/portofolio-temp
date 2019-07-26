import React from 'react';
import { Row, Col, Typography } from 'antd';
import "./style.sass";
import currencyRupiah from "../../../library/currency";
import strings from '../../../localization/localization';

const { Text } = Typography;

const TableInvoicePayment = props => {
    const { productSnapshot, shipment, courier } = props;
    const totalShipping = productSnapshot.quantity * shipment.price
    return (
        <Row>
            <Col md={24}>
                <div className="tableInvoicePayment">
                    <table>
                        <tbody>
                            <tr style={{ textAlign: "center" }}>
                                <th className="tableInvoicePayment__invoicePaymentnNameOrder">{strings.order_name}</th>
                                <th className="tableInvoicePayment__invoicePaymentVariant">{strings.variant}</th>
                                <th className="tableInvoicePayment__invoicePaymentPrice">{strings.total}</th>
                                <th className="tableInvoicePayment__invoicePaymentTotal">{strings.price}</th>
                            </tr>
                            <tr>
                                <td><Text strong>{productSnapshot.name}</Text> </td>
                                <td style={{ textAlign: "center" }}>
                                    <Text type="secondary">{productSnapshot.variants}</Text>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Text type="secondary">{productSnapshot.quantity}</Text>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <Text type="secondary">{currencyRupiah(productSnapshot.totalPrice)}</Text>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="tableInvoicePayment__shippingTabel"><Text>{strings.cost_shipment_international}</Text>
                                    <Text className="viaShippingTableInvoice" type="danger">
                                        {strings.shipment_via} {shipment.via === "sea" ? "Laut" : "Udara"}</Text>
                                </td>
                                <td colSpan="3" className="tableInvoicePayment__shippingPayment"><Text type="danger" style={{ fontSize: 14 }}>{shipment.via === "air" ? currencyRupiah(totalShipping) : strings.postage_is_included}</Text></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="tableInvoicePayment__shippingTabel"><Text>{strings.cost_shipment_jne} &nbsp; {courier.service}</Text>
                                </td>
                                <td colSpan="3" className="tableInvoicePayment__shippingPayment"><Text type="default" style={{ fontSize: 14 }}>{currencyRupiah(courier.price)}</Text></td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    );
};

export default TableInvoicePayment;