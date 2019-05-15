import React from 'react';
import { Row, Col, Typography } from 'antd';
import "./style.sass";
import currencyRupiah from "../../../library/currency";

const { Text } = Typography;

const TableInvoicePayment = props => {
    const { productName, variants, productQuantity, totalAmount,shipping } = props;
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
                                <td><Text strong>{productName}</Text> </td>
                                <td style={{ textAlign: "center" }}>
                                    <Text type="secondary">{variants[0].value}, {variants[1].value}</Text>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Text type="secondary">{productQuantity}</Text>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <Text type="secondary">{currencyRupiah(totalAmount)}</Text>
                                </td>
                            </tr>
                            <tr>
                            <td><Text>Biaya Kirim</Text><Text>{shipping.via}</Text></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    );
};

export default TableInvoicePayment;