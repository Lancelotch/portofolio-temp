import React, { Component } from 'react'
import { Row, Col, Input, Icon, Button, notification } from 'antd'
import category from '../../api/services/category'
import './style.sass'
import strings from '../../localization/localization'
import ovo from '../../assets/img/ic_ovo.png'
import bca from '../../assets/img/ic_bca.png'
import mandiri from '../../assets/img/ic_mandiri.png'
import dana from '../../assets/img/ic_dana.png'
import visa from '../../assets/img/ic_visa-mastercard.png'
import instagram from '../../assets/img/ic_instagram.png'
import twitter from '../../assets/img/ic_twitter.png'
import facebook from '../../assets/img/ic_facebook.png'


class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      subsResponse: '',
      showNotification: false
    }
  }

  componentDidMount () {
    this.handleSubmit()
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    const { email  } = this.state
    try {
      const response = await category.subscription({
        email: email
      })
      this.setState({
        SubsResponse: response.data,
        showNotification: !this.state.showNotification
      })
      this.openNotification()
      this.setState({
          email: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  openNotification = async () => {
    const { SubsResponse, showNotification } = this.state
    if (SubsResponse == true && showNotification == true ) {
      notification.open({
        message: 'Selamat',
        description:
          'sekarang kamu bisa dapetin update dari kita',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />

      })
    } else {
      return null
    }
  }

  render () {
    const { email, SubsResponse } = this.state
    console.log(SubsResponse)

    return (
      <React.Fragment>
        <Row>
          <div className='backgroundFooter'>
            <Col md={14}>
              <Row>
                <Col md={24}>
                  <p className='footer__help'> {strings.footer_any_help}</p>
                </Col>
                <Col md={12}>
                  <div className='footer__menu-1stcol'>
                    <p>{strings.how_to_shop}</p>
                    <p>{strings.delivery_time}</p>
                    <p>{strings.how_to_pay}</p>
                    <p>{strings.track_the_delivery}</p>
                    <p>{strings.contact_us}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='footer__menu-2ndcol'>
                    <p>{strings.about_us}</p>
                    <p>{strings.career}</p>
                    <p>{strings.terms_and_condition}</p>
                    <p>{strings.privacy_policy}</p>
                  </div>
                </Col>
                <Col md={24}>
                  <div className='footer__payment-box'>
                    <p>{strings.payment}</p>
                    <div className='footer__icon-box'>
                      <img src={ovo} />
                      <img src={bca} />
                      <img src={mandiri} />
                      <img src={dana} />
                      <img src={visa} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={10}>
              <row>
                <Col md={24}>
                  <p className='footer__monggo'>{strings.monggo}</p>
                </Col>
                <Col md={24}>
                  <div className='footer__invitation'>
                    <p>{strings.subscripton_invitation}</p>
                    <Input
                      style={{ width: '350px', height:'56px' }}
                      prefix={
                        <Icon
                          type={'mail'}
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder='Email'
                      value={email}
                      name='email'
                      enterButton='Email'
                      onChange={this.onChange}
                    />
                    <button className='footer__button' type='submit' onClick={this.handleSubmit}>
                      SEND
                    </button>
                  </div>
                </Col>
                <Col md={24}>
                <p className='footer__follow-us'>
                {strings.follow_us}
                </p>
                <div className='footer__icon-box'>
                    <img src={instagram} />
                    <img src={twitter} />
                    <img src={facebook} />
                </div>
                </Col>
              </row>
            </Col>
          </div>
        </Row>
      </React.Fragment>
    )
  }
}

export default Footer