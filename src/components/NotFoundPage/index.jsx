import React from 'react';
import { Row, Col } from 'antd';
import "./style.sass";
import strings from '../../localization/localization';
import error_404 from '../../assets/img/ic_background/404.png'

const NotFoundPage = () => {
        return (
            <Row>
                <Col md={10} className="left" >
                    <div>
                        <p className="headingNotFoundPage">
                            Halaman Tidak Ditemukan
                        </p>
                        <p className="pageNotFoundText">
                            Maaf, kami tidak bisa menemukan halaman yang anda tuju.
                        </p>
                    </div>
                </Col>
                <Col md={14} className="right">
                    <img src={error_404} width="100%" alt=""/>
                </Col>
            </Row>
        );
    
}

export default NotFoundPage;