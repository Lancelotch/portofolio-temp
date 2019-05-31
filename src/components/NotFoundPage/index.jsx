import React from 'react';
import { Row, Col } from 'antd';
import "./style.sass";
import strings from '../../localization/localization';
import notpoundpage from "../../assets/img/ic_background/404.png";

const NotFoundPage = () => {
    return (
        <Row>
            <Col md={6}>
                <p className="pageNotFoundText"
                    style={{
                        fontWeight: "bold",
                        marginBottom: 5,
                        lineHeight: "initial"
                    }}>
                    {strings.not_found_text}
                </p>
                <p style={{fontSize: 16}}>
                    {strings.not_found_back}
                </p>
            </Col>
            <Col md={18}>
                <img src={notpoundpage} style={{ float: "right" }} alt="" />
            </Col>
        </Row>
    );

}

export default NotFoundPage;