import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import AddressListDetail from '../../components/AddressListDetail';

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  actionSelected = address => {};

  address = addresses => {
    return addresses.map(address => (
      <AddressListDetail
        key={address.id}
        address={address}
        onSelected={this.actionSelected}
      />
    ));
  };

  render() {
    return (
      <Modal
        title="Pilih alamat pengiriman"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancle}
        footer={[
          <Button key="back" onClick={this.props.onCancle}>
            Kembali
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handleOk}
          >
            Gunakan Alamat
          </Button>
        ]}
      >
        <RadioGroup onChange={this.onChange}>
          {this.address(this.props.addresses)}
        </RadioGroup>
      </Modal>
    );
  }
}

export default AddressList;
