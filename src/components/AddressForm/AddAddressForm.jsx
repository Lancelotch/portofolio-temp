import React, { Component } from "react";
import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import SelectProvince from "../SelectProvince";
import Fetcher from "../Fetcher";
import { PATH_CUSTOMER } from "../../api/path";
import SelectCity from "../SelectCity";
import SelectSubDistrict from "../SelectSubDistrict";
import withApiMethod from "../../hoc/withApiMethod";
import { postAddressForm, editAddressForm } from "../../api/services/address";
import { addressDefault } from "../../store/actions/address";

const { Option } = Select;
const { TextArea } = Input;
class AddAddressForm extends Component {
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
      action: this.props.action
    };
  }

  addAddressForm = request => {
    postAddressForm(request)
      .then(response => {
        this.props.onSubmit();
      })
      .catch(error => {
        console.log(error);
      });
  };

  splitValue = (value, index) => {
    const splitValue = value.split("|");
    return splitValue[index];
  };

  handleChangeProvince = value => {
    const provinceId = this.splitValue(value, 0);
    this.setState({
      provinceId: provinceId
    });
  };

  handleChangeCity = value => {
    const cityId = this.splitValue(value, 0);
    this.setState({
      cityId: cityId
    });
  };

  handleChangeSubDistrict = value => {
    const subdistrictId = this.splitValue(value, 0);
    this.setState({
      subdistrictId: subdistrictId
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const provinceId = this.state.provinceId;
        const province = this.splitValue(values.province, 1);
        const cityId = this.state.cityId;
        const city = this.splitValue(values.city, 1);
        const subdistrictId = this.state.subdistrictId;
        const subdistrict = this.splitValue(values.subdistrict, 1);
        const payload = {
          ...values,
          province,
          provinceId,
          cityId,
          city,
          subdistrict,
          subdistrictId,
          geolocation: {
            latitude: 0,
            longitude: 0
          },
          isDefault: true
        };
        this.addAddressForm(payload);
        this.props.handleCancel();
      }
    });
  };

  rules = (required, message, initialValue) => {
    return {
      rules: [{ required: required, message: message }]
    };
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      id,
      labelName,
      receiverName,
      phoneNumber,
      provinceId,
      cityId,
      province
    } = this.state;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "62"
    })(
      <Select style={{ width: 70 }}>
        <Option value="62">+62</Option>
      </Select>
    );
    return (
      <Modal
        title="Tambah Alamat Baru"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Kembali
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={this.handleSubmit}
          >
            Simpan
          </Button>
        ]}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nama Alamat">
            {getFieldDecorator(
              "labelName",
              this.rules(true, "Silahkan isi nama alamat")
            )(<Input placeholder="Atas Nama" />)}
          </Form.Item>
          <Form.Item label="Atas Nama">
            {getFieldDecorator(
              "receiverName",
              this.rules(
                true,
                "Silahkan isi nama penerima"
              )
            )(<Input placeholder="Atas Nama" />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator(
              "phoneNumber",
              this.rules(
                true,
                "Silahkan isi no telfon kamu"
              )
            )(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="Provinsi">
            <Fetcher path={PATH_CUSTOMER.ADDRESS_PROVINCE}>
              {getFieldDecorator(
                "province",
                this.rules(
                  true,
                  "Silahkan pilih alamat provinsi kamu"
                )
              )(
                <SelectProvince
                  {...this.props}
                  onChange={this.handleChangeProvince}
                />
              )}
            </Fetcher>
          </Form.Item>
          <Form.Item label="Kota">
            {provinceId === null ? (
              <SelectCity
                data={[]}
                onChange={this.handleChangeCity}
                disabled={true}
              />
            ) : (
              <Fetcher
                path={`${PATH_CUSTOMER.ADDRESS_CITY}?province=${provinceId}`}
              >
                {getFieldDecorator(
                  "city",
                  this.rules(
                    true,
                    "Silahkan pilih alamat kota kamu"
                  )
                )(
                  <SelectCity
                    {...this.props}
                    onChange={this.handleChangeCity}
                    disabled={false}
                  />
                )}
              </Fetcher>
            )}
          </Form.Item>
          <Row>
            <Col span={16}>
              <Form.Item label="Kecamatan">
                {cityId === null ? (
                  <SelectSubDistrict
                    data={[]}
                    onChange={this.handleChangeSubDistrict}
                    disabled={true}
                  />
                ) : (
                  <Fetcher
                    path={`${PATH_CUSTOMER.ADDRESS_SUBDISTRICT}?city=${cityId}`}
                  >
                    {getFieldDecorator(
                      "subdistrict",
                      this.rules(
                        true,
                        "Silahkan pilih alamat kecamatan kamu"
                      )
                    )(
                      <SelectSubDistrict
                        {...this.props}
                        onChange={this.handleChangeSubDistrict}
                        disabled={false}
                      />
                    )}
                  </Fetcher>
                )}
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item label="Kode Pos">
                {getFieldDecorator(
                  "zipcode",
                  this.rules(
                    true,
                    "Silahkan isi Kode POS kamu"
                  )
                )(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Alamat Lengkap">
            {getFieldDecorator(
              "fullAddress",
              this.rules(
                true,
                "Silahkan alamat Lengkap kamu"
              )
            )(
              <TextArea
                placeholder="Alamat Lengkap"
                autosize={{ minRows: 3, maxRows: 6 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedAddressForm = Form.create({ name: "addressForm" })(AddAddressForm);
export default withApiMethod(WrappedAddressForm);
