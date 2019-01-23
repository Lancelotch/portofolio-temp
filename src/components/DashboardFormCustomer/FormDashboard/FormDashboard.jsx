import React, { Component } from 'react'
import serviceUser from '../../../api/services/ServiceUser'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  notification,
  Alert
} from 'antd'

class FormDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      photoUrl: '',
      status: null,
      showStatus: false,
      hideStatus: false
    }
  }

  componentDidMount () {
    this.getUserDetail()
  }

  getUserDetail = () => {
    serviceUser
      .GetDetailUser()
      .then(response => {
        const detailUser = response.data
        this.setState({
          name: detailUser.name,
          email: detailUser.email,
          phoneNumber: detailUser.phoneNumber
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateDetailUser = () => {
    const name = this.state.name
    const phoneNumber = this.state.phoneNumber
    const request = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      photoUrl: ''
    }
    serviceUser
      .UpdateDetailUser(request)
      .then(request => {
        console.log(request.data)
        this.setState({
          status: {
            success: true,
            message: 'Data Berhasil Disimpan'
          },
          showStatus: !this.state.showStatus
        })
        // window.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleCloseStatus = () => {
    this.setState({ hideStatus: !this.state.hideStatus })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render () {
    return (
      <div>
        <Row>
          <Col xs={{ span: 6 }} md={{ span: 6 }}>
            <Form className='login-form'>
              <Form.Item colon={false} label='name'>
                <Input
                  value={this.state.name}
                  name='name'
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item colon={false} label='email'>
                <Input
                  disabled
                  value={this.state.email}
                  name='email'
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item colon={false} label='phone number'>
                <Input
                  value={this.state.phoneNumber}
                  placeholder='Password'
                  name='phoneNumber'
                  onChange={this.onChange}
                />
              </Form.Item>
              {this.state.status != null && this.state.status != false ? (
                <Alert
                  message='Success'
                  description='Data Berhasil Disimpan'
                  type='success'
                  closable
                  afterClose={this.handleCloseStatus}
                  showIcon
                />
              ) : null}
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  onClick={this.updateDetailUser}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FormDashboard
