import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import "./style.sass";
import strings from '../../localization/localization';

const NotFoundPage = () => {
        return (
            <Row>
                <Col md={24}>
                    <h2 className="headingNotFoundPage">
                        {strings.not_found_number}
                    </h2>
                    <p className="pageNotFoundText">
                        {strings.not_found_text}
                    </p>
                    <p style={{
                        textAlign: "center",
                        fontSize: 16
                    }}>
                        {strings.not_found_back} &nbsp;
                        <Link title="Halaman Depan" to="/">
                        halaman depan
                        </Link>
                    </p>
                </Col>
            </Row>
        );
    
}

export default NotFoundPage;