import React, { Component } from 'react'
import { Modal, Input, Form, Button, Icon, Checkbox } from 'antd'
import ButtonFacebook from '../Button/SocialMedia/Facebook'
import ButtonGoogle from '../Button/SocialMedia/Google'
import { connect } from 'react-redux'
import './style.sass'
import strings from '../../localization/localization'
import { loginWithGoogle, loginWithForm } from '../../store/actions/authentication'

const FormItem = Form.Item

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    }
  }

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.loginWithForm(values)
      }
    })
  }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values)
  //       authentication
  //         .login(values)
  //         .then(response => {
  //           console.log(response);
  //           const token = response.data;
  //           localStorage.setItem("token", token);
  //           this.props.dispatchAuthenticated(token);
  //           // this.props.onCancel();
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }
  //   })
  // }

  render () {
    console.log(this.props.token)
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <React.Fragment>
        <Modal
          visible={visible}
          closable={false}
          footer={null}
          centered
          onCancel={onCancel}
          width={371}
          bodyStyle={{borderRadius:0, padding:'40px'}}
         
        >
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
                    <Icon type={'user'} style={{ color: 'rgba(0,0,0,.25)' }} />
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
                    <Icon type={'lock'} style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder={'Password'}
                  type='password'
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
              <a className='login-form__forgot' href='/'>
                {strings.login_forgot_password}
              </a>
              <Button
                size={'large'}
                htmlType='submit'
                className='login-form__button__submit'
              >
                <h4>{strings.login_enter}</h4>
              </Button>
              <div>
              
              <span className='login-form__separator__text'>
                {strings.login_option}
              </span>
            </div>
            <div style={{display:'flex'}} className='login-form_socmed-box'>
              <ButtonFacebook
                className='login-form__socmed-button'
                onSubmit={this.handleRegisterGoogle}
              >
                {strings.facebook}
              </ButtonFacebook>
              <ButtonGoogle
                className='login-form__socmed-button'
                onSubmit={this.handleRegisterGoogle}
              >
                {strings.google}
              </ButtonGoogle>
            </div>

              {strings.formatString(
                strings.login_quote,
                <a href='/register'>{strings.login_register} </a>
              )}
            </FormItem>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  token: state.authentication.token
})

const LoginForm = Form.create({})(Login)
export default connect(
  mapStateToProps,
  { loginWithGoogle, loginWithForm }
)(LoginForm)
