import React from 'react';
import { Row, Col, Typography } from 'antd';
import convertTimesTime from '../../../library/convertTimestime';
import "./style.sass";

const { Text } = Typography;


const TableInvoiceDetailDashboard = (props) => {
    const { invoice, orderDate, customerOrderAddress, note,customerOrder} = props;
    return (
        <Row>
        {customerOrder && customerOrderAddress &&
            <Col md={24}>
                <table className="tableInvoiceDetail">
                <tbody>
                    <tr className="tableInvoiceDetail__invoiceBackground">
                        <td className="tableInvoiceDetail__invoice"><Text type="secondary">Nomor Invoice</Text></td>
                        <td className="tableInvoiceDetail__invoiceRight"><Text strong>{invoice}</Text></td>
                    </tr>
                    <tr>
                        <td><Text type="secondary">Waktu Transaksi</Text></td>
                        <td><Text strong>{convertTimesTime.millisecond(orderDate.orderDate)}</Text></td>
                    </tr>
                    <tr>
                        <td>
                            <Text type="secondary">Pembeli</Text>
                        </td>
                        <td><Text strong>{customerOrder.name}</Text></td>
                    </tr>
                    <tr>
                        <td><Text type="secondary">Tujuan Pengiriman</Text></td>
                        <td>
                            <Text>{customerOrderAddress.receiverName}</Text> - <Text>{customerOrderAddress.phoneNumber}</Text > <br />
                            <Text type="secondary"> {customerOrderAddress.fullAddress} {customerOrderAddress.city} {customerOrderAddress.province} {customerOrderAddress.zipcode}</Text>
                        </td>
                    </tr>
                    <tr>
                        <td><Text type="secondary">Catatan</Text></td>
                        <td><Text>{note}</Text></td>
                    </tr>
                    </tbody>
                </table>
            </Col>
        }
        </Row>
    );
};

export default TableInvoiceDetailDashboard;