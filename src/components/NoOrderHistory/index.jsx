import React from 'react';
import { Row, Col } from 'antd';
import EmptyOrderList from "../../assets/img/ic_background/ic_empty_orderlist.png";

const NoOrderHistory = () => {
    return (
        <Row>
            <Col md={24}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={EmptyOrderList} alt=""/>
                </div>
                <p style={{
                    textAlign: "center",
                    fontSize: 14,
                    marginTop: 10
                }}>
                Tidak ada Riwayat Pesanan
                </p>
            </Col>
        </Row>
    );
};

export default NoOrderHistory;