import React from 'react';
import { Row, Col } from 'antd';
import EmptyOrderList from "../../assets/img/ic_background/ic_empty_orderlist.png";
import strings from '../../localization/localization';

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
               {strings.riwayat_order}
                </p>
            </Col>
        </Row>
    );
};

export default NoOrderHistory;