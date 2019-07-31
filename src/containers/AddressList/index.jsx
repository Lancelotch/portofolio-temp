import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import AddressListDetail from '../../components/AddressListDetail';

const RadioGroup = Radio.Group;
// const confirm = Modal.confirm;

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerAddress: this.props.customerAddress
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      customerAddress: props.customerAddress
    })
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
            className="button-batal-address"
            onClick={this.props.onCancle}>
            <div className="">Batal</div>
          </Button>,
          <Button
            size="large"
            key="submit"
            className="button-simpan"
            onClick={this.handleOk}
          >
            <div className="button-simpan__choose-address">Gunakan Alamat</div>
          </Button>
        ]}
      >
        <RadioGroup style={{ width: '100%' }} onChange={this.onChange} value={this.state.customerAddress.id}>
          {this.address(this.props.addresses)}
        </RadioGroup>
      </Modal>
    );
  }
}

export default AddressList;
