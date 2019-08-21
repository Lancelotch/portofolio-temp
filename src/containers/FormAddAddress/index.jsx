import React, { Component } from "react";
import { Modal, Form, Input, Select, Row, Col } from "antd";
import { PATH_CUSTOMER } from "../../api/path";
import withApiMethod from "../../hoc/withApiMethod";
import { apiGetWithToken } from "../../api/services";
import "./style.sass";
import Button from "../../components/Button";


const { Option } = Select;
const { TextArea } = Input;
class FormAddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      labelName: null,
      receiverName: null,
      phoneNumber: null,
      city: null,
      fullAddress: null,
      province: null,
      provinceId: null,
      cityId: null,
      zipcode: null,
      geolocation: null,
      subdistrictId: null,
      subdistrict: null,
      provinces: [],
      cities: [],
      subdistricts: [],
      length: 0
    };
  }

  componentDidMount() {
    this.getProvince();
  }

  onChangeFullAddress = (e) => {
    this.setState({
      length: e.target.value.length
    })
  }

  getProvince = async () => {
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_PROVINCE);
      this.setState({ provinces: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  getCities = async () => {
    const params = {
      province: this.state.provinceId
    }
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_CITY, params);
      this.setState({ cities: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  getSubdistrict = async () => {
    const params = {
      city: this.state.cityId
    }
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_SUBDISTRICT, params);
      this.setState({ subdistricts: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  splitValue = (value) => {
    const splitValue = value.split("|");
    return splitValue;
  };

  handleChangeProvince = value => {
    const province = this.splitValue(value);
    this.setState({
      provinceId: province[0],
      province: province[1]
    }, this.getCities);
  };

  optionsProvince = provinces => {
    const options = [];
    provinces.forEach(provinces => {
      provinces.province_id &&
        options.push(
          <Option
            value={`${provinces.province_id}|${provinces.province}`}
            key={provinces.province_id}
          >
            {provinces.province}
          </Option>
        );
    });
    return options;
  };

  handleChangeCity = value => {
    const city = this.splitValue(value);
    this.setState({
      cityId: city[0],
      city: city[1]
    }, this.getSubdistrict);
  };

  optionsCity = cities => {
    const options = [];
    cities.forEach(city => {
      options.push(
        <Option
          value={`${city.city_id}|${city.city_name}`}
          key={city.city_id}
        >
          {city.city_name}
        </Option>
      );
    });
    return options;
  };

  handleChangeSubDistrict = value => {
    const subdistrict = this.splitValue(value);
    this.setState({
      subdistrictId: subdistrict[0],
      subdistrict: subdistrict[1]
    });
  };

  optionsSubdistrict = subdistricts => {
    const options = [];
    subdistricts.forEach(subdistrict => {
      options.push(
        <Option
          value={`${subdistrict.subdistrict_id}|${subdistrict.subdistrict_name}`}
          key={subdistrict.subdistrict_id}
        >
          {subdistrict.subdistrict_name}
        </Option>
      );
    });
    return options;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { province, provinceId, city, cityId, subdistrict, subdistrictId } = this.state;
        const payload = {
          ...values,
          provinceId, province,
          cityId, city,
          subdistrictId, subdistrict,
          geolocation: {
            latitude: 0,
            longitude: 0
          },
          isDefault: !this.props.isAddressAvailable
        };
        this.props.onSubmit(payload);
        this.setState({
          length: 0
        })
        this.props.form.resetFields();
      }
    });
  };

  rules = (required, message) => {
    return {
      rules: [{ required: required, message: message }]
    };
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      cities,
      provinces
    } = this.state;

    // const prefixSelector = getFieldDecorator("prefix", {
    //   initialValue: "62"
    // })(
    //   <Select style={{ width: 70 }} disabled>
    //     <Option value="62">+62</Option>
    //   </Select>
    // );
    return (
      <Modal
        title="Tambah Alamat Pengiriman"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancle}
        footer={[
          <Button
            key="back"
            type="link"
            onClick={this.props.onCancle}>
            Batalkan
          </Button>,
          <Button
          key="save"
            type="primary"
            onClick={this.handleSubmit}
          >
            Simpan
          </Button>
        ]}
      >
        <Form onSubmit={this.handleSubmit} className="addAddressForm">
          <Form.Item label="Nama Alamat">
            {getFieldDecorator(
              "labelName",
              this.rules(true, "Silahkan isi nama alamat")
            )(<Input className="addAddressInput" placeholder="Contoh: Rumah, Kantor, Kost dll" />)}
          </Form.Item>
          <Form.Item label="Atas Nama">
            {getFieldDecorator(
              "receiverName",
              this.rules(true, "Silahkan isi nama penerima")
            )(<Input className="addAddressInput" placeholder="Atas Nama" />)}
          </Form.Item>
          <Form.Item label="No. Telepon">
            {getFieldDecorator(
              "phoneNumber",
              this.rules(true, "Silahkan isi no telfon kamu")
            )(<Input className="addAddressInput" style={{ width: "100%" }} type="number" placeholder="08xxx" />)}
          </Form.Item>
          <Form.Item label="Provinsi">
            {getFieldDecorator(
              "province",
              this.rules(true, "Silahkan pilih alamat provinsi kamu")
            )(
              <Select
                showSearch
                //style={{ width: 200 }}
                placeholder="Select a province"
                optionFilterProp="children"
                onChange={value => this.handleChangeProvince(value)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {provinces && this.optionsProvince(provinces)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Kota / Kabupaten">
            {getFieldDecorator(
              "city",
              this.rules(true, "Silahkan pilih alamat kota kamu")
            )(
              <Select
                showSearch
                //style={{ width: 200 }}
                placeholder="pilih kota"
                optionFilterProp="children"
                onChange={value => this.handleChangeCity(value)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {cities && this.optionsCity(cities)}
              </Select>
            )}
          </Form.Item>
          <Row>
            <Col span={16}>
              <Form.Item label="Kecamatan">
                {getFieldDecorator(
                  "subdistrict",
                  this.rules(true, "Silahkan pilih alamat kecamatan kamu")
                )(
                  <Select
                    showSearch
                    //style={{ width: 200 }}
                    placeholder="pilih kecamatan"
                    optionFilterProp="children"
                    onChange={value => this.handleChangeSubDistrict(value)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.subdistricts && this.optionsSubdistrict(this.state.subdistricts)}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item label="Kode Pos">
                {getFieldDecorator(
                  "zipcode",
                  this.rules(true, "Silahkan isi Kode POS kamu")
                )(<Input className="addAddressInput" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Alamat Lengkap" help={
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                opacity: 0.5,
                float: "right"
              }}
            >
              {this.state.length}/400
                </p>
          }>
            {getFieldDecorator(
              "fullAddress",
              this.rules(true, "Silahkan alamat Lengkap kamu")
            )(
              <TextArea
                className="addAddressInput"
                placeholder="Alamat Lengkap"
                autosize={{ minRows: 3, maxRows: 6 }}
                onChange={this.onChangeFullAddress}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedAddressForm = Form.create({ name: "addressForm" })(FormAddAddress);
export default withApiMethod(WrappedAddressForm);
