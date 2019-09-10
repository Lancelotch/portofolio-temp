import React from 'react'
import { Row, Col } from 'antd'
import history from '../../routers/history'
import logo from "../../assets/img/monggopesen_logo.png"
import ilustration from "../../assets/img/ic_background/illustration_pesenajadulu.png"
import Button from "../../components/Button"
import './style.sass'
import strings from '../../localization/localization'

function toHome() {
  history.push("/")
}

export default function Confirmation() {
  return (
    <React.Fragment>
      <div className="container">
        <div className="mp-confirmation">
          <div className="mp-confirmation__logo">
            <img src={logo} alt="" />
          </div>
          <div className="mp-confirmation__box">
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={24}>
                    <div className="mp-confirmation__head">
                      {strings.confirmation_title_heading}
                    </div>
                  </Col>
                  <br />
                  <Col md={24}>
                    <div className="mp-confirmation__content">
                      <p>
                        {strings.confirmation_title_content}
                      </p>
                    </div>
                  </Col>
                  <Col md={24}>
                    <div className="mp-confirmation__footer">
                      <p>
                        {strings.contirmation_title_footer}
                      </p>
                    </div>
                  </Col>
                  <Col md={24}>
                    <div className="mp-confirmation__text-button">
                      <Button onClick={toHome} width="full" type="primary" size="large">
                        {strings.start_shopping}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <div className="mp-confirmation__image">
                  <img src={ilustration} alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
