import React from 'react';
import { Row, Col } from 'antd';
import "./style.sass";
import error_404 from '../../assets/img/ic_background/404.png'
import strings from '../../localization/localization';

const NotFoundPage = () => {
    return (
        <Row>
            <Col md={10} className="left" >
                <div>
                    <p className="headingNotFoundPage">
                        {strings.not_found_text}
                    </p>
                    <p className="pageNotFoundText">
                        {strings.not_found_back}
                    </p>
                </div>
            </Col>
            <Col md={14} className="right">
                <img src={error_404} width="100%" alt="" />
            </Col>
        </Row>
    );

}

export default NotFoundPage;