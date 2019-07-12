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
import { rulesEmail } from '../../pages/Register/registerContainer';
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
          console.log(login);         
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
                {getFieldDecorator('email', rulesEmail())(
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
                      message: "Password harus diisi"
                    }
                  ]
                })(

                  <Input.Password
                  className="register__input"
                  size={"large"}
                  prefix={
                    <Icon
                      type={"lock"}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  onChange={this.state.firstInput ? this.clearTrigger :this.clearErrorMessage}
                  placeholder={strings.register_password_placeholder}
                  type="password"
                />
               
                )}
              </FormItem>
              <FormItem className='login-form__checkBox'>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
                <a className='login-form__forgot' href='/forget-password'>
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
                  <ButtonGoogle
                    className='login-form__socmed-button'
                    onSubmit={this.handleRegisterGoogle}
                  >
                    <p>{strings.google}</p>
                  </ButtonGoogle>
                  <ButtonFacebook
                    className='login-form__socmed-button'
                    onSubmit={this.handleFacebook}
                  >
                    <p> {strings.facebook}</p>
                  </ButtonFacebook>
                </div>
                <p style={{ margin: '24px 0 0 0', textAlign:"center" }}>
                  {strings.formatString(
                    strings.login_quote,
                    <Link to={{ pathname: "/register", state: { nextPage: "/" } }} onClick={this.clearErrorMessage}  className='login-form__register'>
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
