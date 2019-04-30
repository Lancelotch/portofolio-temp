import React, { Component } from 'react'
import { Input, Form, Button, Icon, Checkbox, Menu } from 'antd'
import ButtonFacebook from '../Button/SocialMedia/Facebook'
import ButtonGoogle from '../Button/SocialMedia/Google'
import { connect } from 'react-redux'
import './style.sass'
import strings from '../../localization/localization'
import {
  loginWithGoogle,
  loginWithHome
} from '../../store/actions/authentication'
// import SnackBar from 'react-material-snackbar'   

const FormItem = Form.Item

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      errorMessage: null,
      isErorloaded: false
    }
  }

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request)
  }

  handleSubmit = e => {
    e.preventDefault()
      this.props.form.validateFields(  (err, values) => {
        if (!err) {
          this.props.loginWithHome(values)
          this.props.closeModal()
        }
      })
    
  }

  render () {
    const {  form } = this.props
    const { getFieldDecorator } = form
    return (
      <React.Fragment>
        <Menu className='login-box'>
          <div className='login-content'>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <FormItem className='login-form__input-text'>
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
                        type={'user'}
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder={'Email'}
                  />
                )}
              </FormItem>
              <FormItem className='login-form__input-text'>
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
                  />
                )}
              </FormItem>
              <FormItem className='login-form__checkBox'>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
                <a className='login-form__forgot' href='/'>
                  {strings.login_forgot_password}
                </a>
                <div>
                <Button
                  size={'large'}
                  htmlType='submit'
                  className='login-form__button__submit'
                >
                  <h4>{strings.login_enter}</h4>
                </Button>
                <div className='login-form__error-box'>
                  {this.props.isError ? (<p className='login-form__error-notif'> {this.props.messageError}</p>): null}
                </div>
                </div>
                <div className='login-form__separator'>
                  <p className='login-form__separator__text'>
                    {strings.login_option}
                  </p>
                </div>
                <div className='login-form__socmed-box'>
                  <ButtonFacebook
                    className='login-form__socmed-button'
                    onSubmit={this.handleRegisterGoogle}
                  >
                    <p> {strings.facebook}</p>
                  </ButtonFacebook>
                  <ButtonGoogle
                    className='login-form__socmed-button'
                    onSubmit={this.handleRegisterGoogle}
                  >
                    <p> {strings.google}</p>
                  </ButtonGoogle>
                </div>
                <p style={{ marginTop: '70px' }}>
                  {strings.formatString(
                    strings.login_quote,
                    <a href='/register' className='login-form__register'>
                      {strings.login_register}{' '}
                    </a>
                  )}
                </p>
              </FormItem>
            </Form>
          </div>
        </Menu>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  token: state.authentication.token,
  messageError: state.authentication.messageError,
  isError : state.authentication.checkError
})

const LoginForm = Form.create({})(Login)
export default connect(
  mapStateToProps,
  { loginWithGoogle, loginWithHome }
)(LoginForm)
