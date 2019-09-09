import React from 'react'
import {Row, Col ,Button} from 'antd'
import history from '../../routers/history'
import logo from "../../assets/img/monggopesen_logo.png"
import ilustration from "../../assets/img/ic_background/illustration_pesenajadulu.png"
import './style.sass'

function toHome(){
    history.push("/")
  }
  
export default function Confirmation() {
    return (
      <React.Fragment>
          <div className="container">
            <div className="mp-confirmation">
              <div className="mp-confirmation__logo">
                <img src={logo} alt=""/>
              </div>
              <div className="mp-confirmation__box">
                <Row>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <div className="mp-confirmation__head">
                          Hi, Selamat ya..
                        </div>
                      </Col>
                      <br/>
                      <Col span={24}>
                        <div className="mp-confirmation__content">
                          <p>
                          Selamat ya, akun kamu sudah terverifikasi oleh sistem kami,
                          terimakasih sudah melakukan registrasi di monggopesen,
                          kita punya semua produk luar negri yang kamu mau
                          tinggal pesen, kita antar sampai rumah kamu.
                          </p>
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="mp-confirmation__foot">
                        <p>
                        Hati-hati jangan berikan informasi akun monggopesen anda kepada siapapun.
                        </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12} >
                    <div className="mp-confirmation__image">
                    <img src={ilustration} alt=""/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={toHome} className="mp-confirmation__button"><div className="mp-confirmation__text-button">Mulai Belanja</div></Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </React.Fragment>
    )
}
