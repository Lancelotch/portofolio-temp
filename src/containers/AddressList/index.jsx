import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import AddressListDetail from '../../components/AddressListDetail';
import { patchService } from "../../api/services";
import { PATH_CUSTOMER } from "../../api/path";

const RadioGroup = Radio.Group;
// const confirm = Modal.confirm;

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerAddress: this.props.customerAddress,
      id: ""
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      customerAddress: props.customerAddress
    })
  }


  actionChangeDefaultAddress = async (addressId) => {
    const request = {
      addressId: addressId
    }
    try {
      const response = await patchService(PATH_CUSTOMER.ADDRESS_DEFAULT, request);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  onChange = (e) => {
    console.log(e);

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
        actionChangeDefaultAddress={this.actionChangeDefaultAddress}
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
              color: "#4A4A4A",
              fontSize: "14px"
            }}
            onClick={this.props.onCancle}>
            <div className="">Batal</div>
          </Button>,
          <Button
            size="large"
            key="submit"
            className="buttonSimpan"
            onClick={this.handleOk}
          >
            <div className="buttonSimpan__chooseAddress">Gunakan Alamat</div>
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
