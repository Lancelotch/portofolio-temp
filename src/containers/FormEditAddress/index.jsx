import React, { Component } from "react";
import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import { PATH_CUSTOMER } from "../../api/path";
import withApiMethod from "../../hoc/withApiMethod";
import { apiGetWithToken } from "../../api/services";

const { Option } = Select;
const { TextArea } = Input;
class FormEditAddress extends Component {
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
      geolocation: {},
      subdistrictId: null,
      subdistrict: null,
      provinces: [],
      cities: [],
      subdistricts: [],
      isDefault: false,
      length : 0
    };
  }

  componentDidMount() {
    const {
      id,
      labelName,
      receiverName,
      phoneNumber,
      city,
      fullAddress,
      province,
      provinceId,
      cityId,
      zipcode,
      geolocation,
      subdistrict,
      subdistrictId,
      isDefault
    } = this.props.address;
    
    this.setState({
      id: id,
      labelName: labelName,
      receiverName: receiverName,
      phoneNumber: phoneNumber,
      city: city,
      fullAddress: fullAddress,
      province: province,
      provinceId: provinceId,
      cityId: cityId,
      zipcode: zipcode,
      geolocation: { ...geolocation },
      subdistrictId: subdistrictId,
      subdistrict: subdistrict,
      isDefault: isDefault,
      length : fullAddress.length
    }, () => {
        this.getProvince();
        this.getCities();
        this.getSubdistrict();
    })
  }

  componentWillReceiveProps(props){
    if(this.props.address.id !== props.address.id) {
      const {
        id,
        labelName,
        receiverName,
        phoneNumber,
        city,
        fullAddress,
        province,
        provinceId,
        cityId,
        zipcode,
        geolocation,
        subdistrict,
        subdistrictId,
        isDefault
      } = props.address;
      
      this.setState({
        id: id,
        labelName: labelName,
        receiverName: receiverName,
        phoneNumber: phoneNumber,
        city: city,
        fullAddress: fullAddress,
        province: province,
        provinceId: provinceId,
        cityId: cityId,
        zipcode: zipcode,
        geolocation: { ...geolocation },
        subdistrictId: subdistrictId,
        subdistrict: subdistrict,
        isDefault: isDefault,
      }, () => {
          this.getProvince();
          this.getCities();
          this.getSubdistrict();
      })  
    }
  }

  onChangeFullAddress = (e) => {
    this.setState({
      length : e.target.value.length
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

  getSubdistrict = async (id) => {
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

  splitValue = value => {
    const splitValue = value.split("|");
    return splitValue;
  };

  handleChangeProvince = value => {
    const province = this.splitValue(value);
    this.setState(
      {
        provinceId: province[0],
        province: province[1],
        city: null,
        cityId: null,
        subdistrict: null,
        subdistrictId: null
      },
      this.getCities
    );
  };

  optionsProvince = provinces => {
    const options = [];
    provinces.forEach(provinces => {
      provinces.province_id === "6" &&
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
    this.setState(
      {
        cityId: city[0],
        city: city[1],
        subdistrict: null,
        subdistrictId: null
      },
      this.getSubdistrict
    );
  };

  optionsCity = cities => {
    const options = [];
    // console.log("ini cities",cities)
    cities.forEach(city => {
      options.push(
        <Option value={`${city.city_id}|${city.city_name}`} key={city.city_id}>
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
          value={`${subdistrict.subdistrict_id}|${
            subdistrict.subdistrict_name
          }`}
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
        const {
          id,
          province,
          provinceId,
          city,
          cityId,
          subdistrict,
          subdistrictId,
          isDefault
        } = this.state;
        const payload = {
          ...values,
          id,
          provinceId,
          province,
          cityId,
          city,
          subdistrictId,
          subdistrict,
          geolocation: {
            latitude: 0,
            longitude: 0
          },
          isDefault
        };
        this.props.onSubmit(payload);
        this.props.form.resetFields();
      }
    });
  };

  rules = (required, message, initialValue) => {
    return {
      rules: [{ required: required, message: message }],
      initialValue: initialValue
    };
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      cities,
      provinces,
      subdistricts,
      labelName,
      receiverName,
      phoneNumber,
      city,
      fullAddress,
      province,
      zipcode,
      // geolocation,
      subdistrict,
    } = this.state;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "62" 
    })(
      <Select style={{ width: 70 }} disabled>
        <Option value="62">+62</Option>
      </Select>
    );
    return (
      
      <Modal
        title="Ubah Alamat Lama"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancle}
        footer={[
          <Button 
          key="back"
          type="link"
          style={{
            border: "none",
            fontWeight: 555,
            color: "#777777",
            fontSize: "12px",
            boxShadow: "none"
          }}
          size="large" 
          onClick={this.props.onCancle}
          >
            Batalkan
          </Button>,
          <Button
            key="submit"
            className="buttonSimpan"
            loading={false}
            onClick={this.handleSubmit}
          >
            <div className="buttonSimpan__text">Simpan</div>
          </Button>
        ]}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nama Alamat"  help="Contoh: Rumah, Kantor, Kost dll">
            {getFieldDecorator(
              "labelName",
              this.rules(true, "Silahkan isi nama alamat", labelName)
            )(<Input placeholder="Nama Alamat" />)}
          </Form.Item>
          <Form.Item label="Atas Nama">
            {getFieldDecorator(
              "receiverName",
              this.rules(true, "Silahkan isi nama penerima", receiverName)
            )(<Input placeholder="Atas Nama" />)}
          </Form.Item>
          <Form.Item label="No. Telepon">
            {getFieldDecorator(
              "phoneNumber",
              this.rules(true, "Silahkan isi no telfon kamu", phoneNumber)
            )(<Input addonBefore={prefixSelector} style={{ width: "100%" }} placeholder="08xxx" />)}
          </Form.Item>
          <Form.Item label="Provinsi">
            {getFieldDecorator(
              "province",
              this.rules(true, "Silahkan pilih alamat provinsi kamu", province)
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
              this.rules(true, "Silahkan pilih alamat kota kamu", city)
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
                  this.rules(true, "Silahkan pilih alamat kecamatan kamu", subdistrict)
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
                    {subdistricts && this.optionsSubdistrict(subdistricts)}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item label="Kode Pos">
                {getFieldDecorator(
                  "zipcode",
                  this.rules(true, "Silahkan isi Kode POS kamu", zipcode)
                )(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Alamat Lengkap">
            {getFieldDecorator(
              "fullAddress",
              this.rules(true, "Silahkan alamat Lengkap kamu", fullAddress)
            )(
              <div>
                <TextArea
                placeholder="Alamat Lengkap"
                defaultValue={fullAddress}
                onChange={this.onChangeFullAddress}
                autosize={{ minRows: 3, maxRows: 6 }}
                ></TextArea>
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
              </div>
             
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedAddressForm = Form.create({ name: "addressForm" })(
  FormEditAddress
);
export default withApiMethod(WrappedAddressForm);
