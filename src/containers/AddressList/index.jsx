import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import AddressListDetail from '../../components/AddressListDetail';

const RadioGroup = Radio.Group;
// const confirm = Modal.confirm;

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerAddress: this.props.addressDefault,
      defaultAddressId: "" 
    };
  }

  onChange = (e) => {
    this.setState({
      customerAddress: this.getAddress(e.target.value)
    });
  }

  getAddress = (id) => {
    return this.props.addresses.find(address => id === address.id);
  }

  handleOk = () => {
    this.props.onChangeAddress(this.state.customerAddress);
  }

  address = addresses => {
    return addresses.map(address => (
      <AddressListDetail
        key={address.id}
        address={address}
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
          <Button
            key="back"
            size="large"
            style={{
              border: "unset",
              fontWeight: 555,
              color: "black"
            }}
            onClick={this.props.onCancle}>
            Kembali
          </Button>,
          <Button
            size="large"
            key="submit"
            className="buttonSimpan"
            onClick={this.handleOk}
          >
            Gunakan Alamat
          </Button>
        ]}
      >
        <RadioGroup onChange={this.onChange} value={this.state.customerAddress.id}>
          {this.address(this.props.addresses)}
        </RadioGroup>
      </Modal>
    );
  }
}

export default AddressList;
