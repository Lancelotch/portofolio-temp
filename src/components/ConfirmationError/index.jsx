import React from 'react'
import {Col ,Row , Button} from 'antd'
import './style.sass'
import errorPageImage from "../../assets/img/ic_background/error_page.png"
import history from '../../routers/history'


const toHome = () => {
    history.push("/")
  }

const errorPage = () => {
    return (
      <div className="errorPage">
          <Row>
              <Col md={6} className="leftSide">
                  <div className="topText">Wah, ada apa ya?</div>
                  <p className="bottomText">
                      Sepertinya halaman yang anda tuju sedang dalam perbaikan, 
                      teknisi kami sedang memperbaikinya silahkan kembali ke halaman sebelumnya 
                      atau klik tombol dibawah ini.
                  </p>
                  <div>
                      <Button onClick={toHome} className="bottomText__button color-button">
                          <div className="bottomText__button-text">Kembali Ke Beranda</div>
                      </Button>
                  </div>   
                  
              </Col>
              <Col md={14} offset={2} className="rightSide">
                  <div >
                      <img src={errorPageImage} width="100%"  alt=""/>
                  </div>
                  
              </Col>
          </Row>
      </div>       
    )
}

export default errorPage