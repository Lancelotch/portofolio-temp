import React, { Component, Fragment } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;
class AddressForm extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+62</Option>
      </Select>
    );
    return (
      <Modal
        title="Tambah Alamat Baru"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nama Alamat">
            <Input placeholder="Nama Alamat" />
          </Form.Item>
          <Form.Item label="Atas Nama">
            <Input placeholder="Nama Alamat" />
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>
          <Form.Item label="Provinsi">
            <Select
              defaultValue="Jakarta"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="Jakarta">Jakarta</Option>
              <Option value="Bandung">Bandung</Option>
              <Option value="Cimahi">Cimahi</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Provinsi">
            <Select
              defaultValue="Jakarta"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="Jakarta">Jakarta</Option>
              <Option value="Bandung">Bandung</Option>
              <Option value="Cimahi">Cimahi</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedAddressForm = Form.create({ name: "addressForm" })(AddressForm);
export default WrappedAddressForm;
