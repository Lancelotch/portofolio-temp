import React from 'react'
import {Row ,Col} from 'antd'
import errorPage from "../../assets/img/ic_background/error_page.png"
import "./style.sass";
import history from "../../routers/history"
import strings from '../../localization/localization';
import Button from '../../components/Button';


function toHome (){
    history.push("/")
}

export default function Error() {
    return (
    <div className="mp-error-page">
        <Row>
            <Col md={6} className="mp-error-page__left-side">
                <div className="mp-error-page__top-text">{strings.error_top_text}</div>
                <p className="mp-error-page__bottom-text">
                  {strings.error_bottom_text}
                </p>
                <div className="mp-error-page__button">
                    <Button onClick={toHome} type="primary" size="large">
                        <div className="mp-error-page__button-text">{strings.error_button_text}</div>
                    </Button>
                </div>   
                
            </Col>
            <Col md={14} offset={2}>
                <div >
                    <img src={errorPage} width="100%"  alt=""/>
                </div>               
            </Col>
        </Row>
    </div>       
    )
}
 