import React, { Component, Fragment } from "react";
import { Modal, Radio, Button } from "antd";
import Address from "./address";
import "./style.sass";
import { patchDefaultAddress, deleteAddress } from "../../api/services/address";
import AddressForm from "../AddressForm/AddressForm";

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      loading: false,
      editVisible: false,
      dataAddress: null
    };
  }

  handleOk = async () => {
    const request = { addressId: this.state.selectedId };
    try {
      this.setState({ loading: true });
      const result = await patchDefaultAddress(request);
      this.setState({ loading: false });
      this.props.onSelect();
      this.props.onCancle();
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  showDeleteConfirm = id => {
    confirm({
      title: "Apakah anda yakin hapus alamat ini?",
      //content: 'Some descriptions',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        this.handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  handleDelete = async id => {
    console.log(id);
    try {
      const result = await deleteAddress(id);
      this.props.onCancle();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  handleCancel = () => {
    this.setState(prevState => ({
      editVisible: !prevState.editVisible
    }));
  };

  handleEdit = dataAddress => {
    this.setState(prevState => ({
      editVisible: !prevState.editVisible,
      dataAddress: { ...dataAddress }
    }));
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      selectedId: e.target.value
    });
  };

  address = data => {
    return data.map(data => (
      <Address
        key={data.id}
        data={data}
        onDelete={this.showDeleteConfirm}
        onEdit={this.handleEdit}
      />
    ));
  };

  render() {
    const { data, error } = this.props;
    const { loading, editVisible, dataAddress } = this.state;
    return (
      <Fragment>
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
              loading={loading}
              onClick={this.handleOk}
            >
              Gunakan Alamat
            </Button>
          ]}
        >
          <RadioGroup onChange={this.onChange}>{this.address(data)}</RadioGroup>
        </Modal>
        {dataAddress !== null ? (
          <AddressForm
            visible={editVisible}
            handleCancel={() => this.handleCancel()}
            onSubmit={this.getAddressDefault}
            address={dataAddress}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Addresses;
