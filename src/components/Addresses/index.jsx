import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import Address from "./address";
import "./style.sass";
import { patchDefaultAddress } from "../../api/services/address";

const RadioGroup = Radio.Group;

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId : "",
      loading: false
    };
  }

  handleOk = async () => {
    const request = {addressId : this.state.selectedId}
    try{
      this.setState({loading: true});
      const result = await patchDefaultAddress(request);
      this.setState({loading: false});
      this.props.onSelect();
      this.props.onCancle();
    }catch(error){
      this.setState({loading: false});
      console.log(error);
    }
    
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      selectedId: e.target.value,
    });
  }

  address = data => {
    return data.map(
      ({
        id,
        labelName,
        fullAddress,
        receiverName,
        phoneNumber,
        isDefault
      }) => (
        <Address
          key={id}
          id={id}
          labelName={labelName}
          fullAddress={fullAddress}
          receiverName={receiverName}
          phoneNumber={phoneNumber}
          isDefault={isDefault}
        />
      )
    );
  };

  render() {
    const { data, error } = this.props;
    const {loading} = this.state;
    
    return (
      <Modal
        title="Pilih alamat pengiriman"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancle}
        footer={[
          <Button key="back" onClick={this.props.onCancle}>Kembali</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            Gunakan Alamat
          </Button>
        ]}
      >
        <RadioGroup onChange={this.onChange}>
          {this.address(data)}
        </RadioGroup>
      </Modal>
    );
  }
}

export default Addresses;
