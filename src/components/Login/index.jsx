import React, { Component } from 'react'
import { Input, Form, Button, Icon, Checkbox, Menu } from 'antd'
import {Link} from 'react-router-dom'
import ButtonFacebook from '../Button/SocialMedia/Facebook'
import ButtonGoogle from '../Button/SocialMedia/Google'
import { connect } from 'react-redux'
import './style.sass'
// import '../../sass/style.sass'
import strings from '../../localization/localization'
import {
  loginWithGoogle,
  loginWithHome,
  loginWithFacebook,
  clearError
} from '../../store/actions/authentication'
import history from "../../routers/history"
const FormItem = Form.Item

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      errorMessage: null,
      isErorloaded: false,
      firstInput: true
    }
  }

  clearErrorMessage = () => {
    this.props.form.validateFields()
    this.props.clearError()
  }

  clearTrigger = () => {
    this.props.clearError()
  }

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle("/", request)
  }

  handleFacebook = request => {
    this.props.loginWithFacebook(request)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      firstInput: false
    })
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          const login = await this.props.loginWithHome(values,'/',history)
          if(this.props.isError ){
            this.props.form.setFields({
              password: {
                value: values.password,
                errors: [new Error("")]
              },
              email: {
                value: values.email,
                errors: [new Error("")]
              }
            })
          }
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
                    onChange={this.state.firstInput ? this.clearTrigger :this.clearErrorMessage}
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
                    onChange={this.state.firstInput ? this.clearTrigger :this.clearErrorMessage}
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
                  className='login-form__button__submit color-button'
                >
                  <h4>{strings.login_enter}</h4>
                </Button>
                <div className='login-form__error-box'>
                  {this.props.messageError ? (<p> {this.props.messageError}</p>): ""}
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
                    onSubmit={this.handleFacebook}
                  >
                    <p> {strings.facebook}</p>
                  </ButtonFacebook>
                  <ButtonGoogle
                    className='login-form__socmed-button'
                    onSubmit={this.handleRegisterGoogle}
                  >
                    <p>{strings.google}</p>
                  </ButtonGoogle>
                </div>
                <p style={{ marginTop: '70px' }}>
                  {strings.formatString(
                    strings.login_quote,
                    <Link to={{ pathname: "/register", state: { nextPage: "/" } }}  className='login-form__register'>
                      {strings.login_register}{' '}
                    </Link>
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
  { loginWithGoogle, loginWithHome, loginWithFacebook, clearError }
)(LoginForm)
