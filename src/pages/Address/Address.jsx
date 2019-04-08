import React, { Component, Fragment } from "react";
import { Card, Button } from "antd";
import AddressForm from "../../components/AddressForm/AddressForm";
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
      visible: false,
      visibleList: false,
      payloadAddressDefault: null,
      refreshFromSubmit: false,
      action: null
    };
  }

  componentDidMount() {
    this.getAddressDefault();
  }

  handleCancel = () => {
    this.isVisible();
  };

  handleCancelList = () => {
    this.isListVisible();
  };

  isListVisible = () => {
    this.setState(prevState => ({
      visibleList: !prevState.visibleList
    }));
  };

  isVisible = (action) => {
    console.log(action);
    
    this.setState(prevState => ({
      visible: !prevState.visible,
      action: action
    }));
  };

  getAddressDefault = () => {
    this.props.addressDefault();
  };

  render() {
    const { visible, visibleList, action } = this.state;
    const { dataAddressDefault, isAddressAvailable } = this.props;
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
            onEdit={this.isVisible}
          />
          <div style={{ float: "right", paddingBottom: 24, paddingTop: 12 }}>
            <Button
              type="primary"
              onClick={this.isListVisible}
              style={{ marginRight: 24 }}
            >
              Kirim ke Alamat Lain
            </Button>
            <Button type="primary" onClick={()=>this.isVisible("ADD")}>
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
          <AddressForm
            visible={visible}
            action={action}
            handleCancel={this.handleCancel}
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
