import React, { Component, Fragment } from "react";
import { Card, Button } from "antd";
import AddressForm from "../../components/AddressForm/AddressForm";
import AddAddressForm from "../../components/AddressForm/AddAddressForm";
import FetcherAction from "../../hoc/FetcherAction";
import AddressDetail from "../../components/AddressDetail";
import { connect } from "react-redux";
import { addressDefault } from "../../store/actions/address";
import Addresses from "../../components/Addresses";
import Fetcher from "../../components/Fetcher";
import { PATH_CUSTOMER } from "../../api/path";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      visibleList: false,
      payloadAddressDefault: null,
      refreshFromSubmit: false,
      action: null
    };
  }

  componentDidMount() {
    this.getAddressDefault();
  }

  handleCancel = (action) => {
    action === "ADD" ?
    this.isAddVisible() :
    this.isEditVisible()
  };

  handleCancelList = () => {
    this.isListVisible();
  };

  isListVisible = () => {
    this.setState(prevState => ({
      visibleList: !prevState.visibleList
    }));
  };

  isAddVisible = () =>{ 
    this.setState(prevState => ({
      addVisible: !prevState.addVisible
    }));
  }

  isEditVisible = () =>{ 
    this.setState(prevState => ({
      editVisible: !prevState.editVisible
    }));
  }

  isVisible = (action) => {
    this.setState(prevState => ({
      visible: !prevState.visible,
      action: action
    }));
  };

  getAddressDefault = () => {
    this.props.addressDefault();
  };

  render() {
    const { addVisible, editVisible, visibleList, action } = this.state;
    const { dataAddressDefault, isAddressAvailable } = this.props;

    console.log("action ",action);
    return (
      <Card
        size="small"
        title={
          <div style={{ paddingLeft: 12, fontSize: 18 }}>Alamat Pengiriman</div>
        }
        style={{ width: 600 }}
      >
        <div style={{ padding: 24 }}>
          <AddressDetail
            addressDefault={dataAddressDefault}
            isAddressAvailable={isAddressAvailable}
            onEdit={this.isEditVisible}
          />
          <div style={{ float: "right", paddingBottom: 24, paddingTop: 12 }}>
            <Button
              type="primary"
              onClick={this.isListVisible}
              style={{ marginRight: 24 }}
            >
              Kirim ke Alamat Lain
            </Button>
            <Button type="primary" onClick={this.isAddVisible}>
              Tambah Alamat
            </Button>
          </div>
          <Fetcher path={PATH_CUSTOMER.ADDRESS}>
            <Addresses
              visible={visibleList}
              onCancle={this.handleCancelList}
              onSelect = {this.getAddressDefault}
              {...this.props}
            />
          </Fetcher>
          <AddAddressForm
            visible={addVisible}
            handleCancel={()=>this.handleCancel("ADD")}
            onSubmit={this.getAddressDefault}
          />
          <AddressForm
            visible={editVisible}
            action={action}
            handleCancel={()=>this.handleCancel("EDIT")}
            onSubmit={this.getAddressDefault}
            address={dataAddressDefault}
          />
        </div>
      </Card>
    );
  }
}

const mapStatetoProps = state => ({
  dataAddressDefault: state.address.addressDefault,
  isAddressAvailable: state.address.isAddressAvailable
});

export default connect(
  mapStatetoProps,
  { addressDefault }
)(Address);
