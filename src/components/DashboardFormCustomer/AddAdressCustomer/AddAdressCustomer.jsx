import React, { Component } from 'react'
import {
  Modal,
  Select,
  Input,
  Form,
  Button,
  Row,
  Col
} from 'antd'
import {
  apiGetProvince,
  apiGetCity,
  apiAddUserAddress
} from '../../../api/services/ServiceAddress'
import './style.sass'

const Option = Select.Option

class AddAdressCustomer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labelName: '',
      receiverName: '',
      phoneNumber: '',
      city: '',
      fullAddress: '',
      province: '',
      provinceId: '',
      cityId: '',
      zipCode: '',
      geolocation: {
        longitude: -6.219201,
        latitude: 107.172443
      },
      isDefault: true,
      provinces: [],
      cities: []
    }
  }

  componentDidMount () {
    apiGetProvince().then(response => {
      const provinces = response.data
      this.setState({
        provinces: provinces
      })
    })
  }

  onChangeProvince = provinceId => {
    apiGetCity(provinceId).then(response => {
      const cities = response.data
      this.setState({
        provinceId,
        cities: cities
      })
    })
  }

  onChangeCity = zipCode => {
    const findProvince = this.state.provinces.find(
      province => province.province_id === this.state.provinceId
    )
    const findCity = this.state.cities.find(
      city => city.city_id === zipCode
    )
    this.setState({
      province: findProvince.province,
      city: findCity.city_name,
      cityId: findCity.city_id,
      zipCode: findCity.postal_code
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formAddress = {
      labelName: this.state.labelName,
      receiverName: this.state.receiverName,
      phoneNumber: this.state.phoneNumber,
      city: this.state.city,
      fullAddress: this.state.fullAddress,
      province: this.state.province,
      provinceId: this.state.provinceId,
      cityId: this.state.cityId,
      zipcode: this.state.zipCode,
      geolocation: {
        longitude: -6.219201,
        latitude: 107.172443
      },
      isDefault: this.state.isDefault
    }
    apiAddUserAddress(formAddress)
      .then(response => {
        this.props.changeAddress()
        // this.handleClose()
      })
      .catch(error => {
        console.log(error)
        window.location.reload()
      })
  }

  handleAllFormInputChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  listProvince = () => {
    return this.state.provinces.map(province => (
      <Option key={province.province_id} value={province.province_id}>
        {province.province}
      </Option>
    ))
  }

  listCity = () => {
    return this.state.cities.map(city => (
      <Option key={city.city_id} value={city.city_id}>{city.city_name}</Option>
    ))
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { visible, onCancel, form } = this.props
    return (
      <React.Fragment>
        <Modal
          visible={visible}
          closable={false}
          footer={null}
          onCancel={onCancel}
          width={600}
        >
          <Form onSubmit={this.handleSubmit}>
            <Row type='flex' justify='center'>
              <Col>
                <Form.Item colon={false} label='Tambah Alamat' />
              </Col>
            </Row>
            <Form.Item>
              <Input
                value={this.state.labelName}
                name='labelName'
                onChange={this.onChange}
                placeholder='Tempat tinggal (Rumah/ Apartemen/ Kosan dll)'
              />
            </Form.Item>
            <Form.Item>
              <Row gutter={10}>
                <Col xs={{ span: 12 }} md={{ span: 12 }}>
                  <Input
                    value={this.state.receiverName}
                    name='receiverName'
                    onChange={this.onChange}
                    placeholder='Nama Penerima'
                  />
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }}>
                  <Input
                    value={this.state.phoneNumber}
                    name='phoneNumber'
                    onChange={this.onChange}
                    placeholder='No Handphone'
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row gutter={10}>
                <Col xs={{ span: 12 }} md={{ span: 12 }}>
                  <Select
                    defaultValue='province'
                    value={this.state.provinceId}
                    name='provinceId'
                    onChange={this.onChangeProvince}
                  >
                    {/* {this.state.provinces.map(province => (
                      <option value={province.province_id}>
                        {province.province}
                      </option>
                    ))} */}

                    {this.listProvince()}
                  </Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }}>
                  <Select
                    value={this.state.cityId}
                    onChange={this.onChangeCity}
                    name='cityId'
                    placeholder='No Handphone'
                  >
                    {this.state.cities.length > 0 && this.listCity()}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row gutter={10}>
                <Col xs={{ span: 12 }} md={{ span: 12 }}>
                  <Input
                    value={this.state.zipCode}
                    name='zipCode'
                    onChange={this.onChange}
                    placeholder='Zip Code'
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Input
                value={this.state.fullAddress}
                name='fullAddress'
                onChange={this.onChange}
                placeholder='isi dengan nama Jalan/ No. Rumah/ Nama Gedung'
              />
            </Form.Item>
            <Row type='flex' justify='center'>
              <Col>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AddAdressCustomer
