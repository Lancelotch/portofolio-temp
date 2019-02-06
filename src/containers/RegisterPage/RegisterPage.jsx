import React, { Component } from 'react'
import {
  Input,
  Form,
  Button,
  Icon,
  Checkbox,
  Card,
  Row,
  Col,
  Avatar
} from 'antd'
import ButtonFacebook from '../../components/Button/SocialMedia/Facebook'
import ButtonGoogle from '../../components/Button/SocialMedia/Google'
import { connect } from 'react-redux'
import './style.sass'
import authentication from '../../api/services/authentication'
import strings from '../../config/localization'
import { Redirect, Link } from 'react-router-dom'
import logoMonggoPesen from '../../assets/img/logo_monggopesen.png'
import imageLogin from '../../assets/img/login_pict.png'
import FrontImage from '../../components/Image/FrontImage'

function mapStateToProps (state) {
  return {}
}

const FormItem = Form.Item

class RegisterPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    }
  }

  handleSocialRegister = request => {
    console.log({ req: request })
    authentication
      .registerSosialMedia(request)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        authentication
          .register(values)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { isAuthenticated } = this.state

    if (isAuthenticated === true) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <Row>
          <Col xs={{ span: 0}} md={{ span: 0}}lg={{ span: 14}}>
            <FrontImage src={imageLogin} />
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} lg={{ span: 10}}>
            <div className='register'>
              <img
                className='register__logo'
                src={logoMonggoPesen}
                alt='register__logo'
              />
              <h1 className='register__title'>{strings.register_now}</h1>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  <Input
                    className='register__input'
                    size={'large'}
                    prefix={<Icon type={'user'} />}
                    placeholder={'Nama'}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    className='register__input'
                    size={'large'}
                    prefix={<Icon type={'mail'} />}
                    placeholder={'Email'}
                  />
                </FormItem>
                <Form.Item>
                  <Input.Password
                    className='register__input'
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item>
                <div className='register__form__note'>
                {strings.formatString(
                        strings.register_agree,
                        <a className='register__form__link' href="/">{strings.register_policy}</a>,<a  className='register__form__link' href="/">{strings.register_requirement}</a>
                      )}
                </div>
                <FormItem>
                  <Button className='register__form__button-register' size={'large'} htmlType='submit' type='primary'>
                    <p className='register__form__button-register-text'>
                      {strings.login_register}
                    </p>
                  </Button>
                </FormItem>
                <Row type='flex' align='middle' justify='space-between' className='register__form__option-text'>
                  <div className='register__form__text-line' />
                  <span>{strings.register_option}</span>
                  <div className='register__form__text-line' />
                </Row>
                <Form.Item className='register__form__btn-socmed' >
                  <Row type='flex' justify='space-between'>
                    <ButtonFacebook
                      className='register__form__socmed-button'
                      onSubmit={this.handleSocialRegister}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle
                      className='register__form__socmed-button'
                      onSubmit={this.handleSocialRegister}
                    >
                      {strings.google}
                    </ButtonGoogle>
                  </Row>
                  <center className='register__form__direct-login'>
                  {strings.formatString(
                        strings.register_quote,
                        <a  className='register__form__link' href="/">{strings.register_now}</a>
                      )}
                  </center>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
const RegisterForm = Form.create({})(RegisterPage)

export default connect(mapStateToProps)(RegisterForm)
