import React from 'react';
import { Row, Col, Typography } from 'antd';
import "./style.sass";
import currencyRupiah from "../../../library/currency";

const { Text } = Typography;

const TableInvoicePayment = props => {
    const { productSnapshot, shipment,courier } = props;
    return (
        <Row>
            <Col md={24}>
                <div className="tableInvoicePayment">
                    <table>
                        <tbody>
                            <tr style={{ textAlign: "center" }}>
                                <th className="tableInvoicePayment__invoicePaymentnNameOrder">Nama Pesanan</th>
                                <th className="tableInvoicePayment__invoicePaymentVariant">Variant</th>
                                <th className="tableInvoicePayment__invoicePaymentPrice">Jumlah</th>
                                <th className="tableInvoicePayment__invoicePaymentTotal">Harga</th>
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
                                <td colSpan="3" className="tableInvoicePayment__shippingTabel"><Text>Biaya Kirim Internasional</Text>
                                    <Text className="viaShippingTableInvoice" type="danger">
                                      Pengiriman Internasional Via {shipment.via}</Text>
                                </td>
                                <td colSpan="3" className="tableInvoicePayment__shippingPayment"><Text type="danger" style={{ fontSize: 14 }}>{shipment.via === "air" ? shipment.price : "Ongkir Sudah Termasuk"}</Text></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="tableInvoicePayment__shippingTabel"><Text>Biaya Kirim JNE &nbsp; {courier.service}</Text>
                                </td>
                                <td colSpan="3" className="tableInvoicePayment__shippingPayment"><Text type="default" style={{ fontSize: 14 }}>{courier.price}</Text></td>
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