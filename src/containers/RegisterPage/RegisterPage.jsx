import React, { Component } from 'react'
import { Input, Form, Button, Icon, Checkbox, Card, Row, Col, Avatar } from 'antd'
import ButtonFacebook from '../../components/Button/SocialMedia/Facebook'
import ButtonGoogle from '../../components/Button/SocialMedia/Google'
import { connect } from 'react-redux'
import './style.sass'
import authentication from '../../api/services/authentication'
import strings from '../../config/localization'
import { Redirect } from 'react-router-dom'
import logoMonggoPesen from '../../assets/img/logo_monggopesen.png'
import imageLogin from '../../assets/img/login_pict.png'
import ReactFullpage from '@fullpage/react-fullpage';
// import "../../sass/style.sass";

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
          <Col xs={{ span: 14 }} lg={{ span: 14 }}>
              <img
                className='register-image'
                src={imageLogin}
              />
          </Col>
          <Col xs={{ span: 10 }} lg={{ span: 10 }}>
            <div style={{ marginTop: '4rem' }}>
              <Row type='flex' justify='center'>
                <Col>
                  <img
                    src={logoMonggoPesen}
                    className='register-header__image'
                    alt=''
                  />
                </Col>
              </Row>
              <Row type='flex' justify='center'>
                <Col>
                  <h1 className='register-form__typography'>
                    {strings.register_now}
                  </h1>
                </Col>
              </Row>
              <Row type='flex' justify='center'>
                <Col>
                  <div className='register-form'>
                    <Form
                      onSubmit={this.handleSubmit}
                      
                    >
                      <FormItem className='register-form__input-text'>
                        {getFieldDecorator('name', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your name!'
                            }
                          ]
                        })(
                          <Input
                            size={'large'}
                            prefix={
                              <Icon
                                type={'user'}
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            placeholder={'Nama'}
                          />
                        )}
                      </FormItem>
                      <FormItem className='register-form__input-text'>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              type: 'email',
                              required: true,
                              message: 'Please input your email!'
                            }
                          ]
                        })(
                          <Input
                            size={'large'}
                            prefix={
                              <Icon
                                type={'mail'}
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            placeholder={'Email'}
                          />
                        )}
                      </FormItem>
                      <FormItem className='register-form__input-text'>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password!'
                            }
                          ]
                        })(
                          <Input
                            size={'large'}
                            prefix={
                              <Icon
                                type={'lock'}
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                             
                            }
                            placeholder={'Password'}
                            type='password'
                          >
                         
                          </Input>
                        )}
                      </FormItem>
                      <FormItem>
                        <h4>
                         {strings.register_agree}
                        </h4>
                        <Button
                          size={'large'}
                          htmlType='submit'
                          className='register-form__button__submit'
                        >
                          <p className='register-form__button__fontSubmit'>{strings.login_register}</p>
                        </Button>
                      </FormItem>
                      <div className='register-form__separator'>
                        <span className='register-form__separator__hline' />
                        <span className='register-form__separator__text'>
                          {strings.register_option}
                        </span>
                        <span className='register-form__separator__hline' />
                      </div>
                      <ButtonFacebook
                        className='register-form__button'
                        onSubmit={this.handleSocialRegister}
                      >
                        {strings.facebook}
                      </ButtonFacebook>
                      <ButtonGoogle
                        className='register-form__button'
                        onSubmit={this.handleSocialRegister}
                      >
                        {strings.google}
                      </ButtonGoogle>
                      <div>
                        <span>{strings.register_quote}</span>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
      </React.Fragment>
    )
  }
}
const RegisterForm = Form.create({})(RegisterPage)

export default connect(mapStateToProps)(RegisterForm)
