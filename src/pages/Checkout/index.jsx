import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FormAddAddress from "../../containers/FormAddAddress";

import { addressDefault } from "../../store/actions/address";
import { postService, getService } from "../../api/services";
import { PATH_CUSTOMER } from "../../api/path";
import { AddressCheckout } from "../../components/AddressCheckout";
import FormEditAddress from "../../containers/FormEditAddress";
import AddressList from "../../containers/AddressList";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      visibleAddAddress: false,
      visibleEditAddress: false,
      visibleListAddress: false,
      addresses: []
    };
  }

  componentDidMount() {
    this.props.addressDefault();
    this.getListAddress();
  }

  getListAddress = async () => {
    try {
      const response = await getService(PATH_CUSTOMER.ADDRESS);
      const addresses = this.state.addresses;
      this.setState({
        ...addresses, addresses : response.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  showAddFormAddress = () => {
    this.setState(prevState => ({
      visibleAddAddress: !prevState.visibleAddAddress
    }));
  };

  showEditFormAddress = () => {
    this.setState(prevState => ({
      visibleEditAddress: !prevState.visibleEditAddress
    }));
  };

  showListAddress = () => {
    this.setState(prevState => ({
      visibleListAddress: !prevState.visibleListAddress
    }));
  };

  handleSubmitAddFormAddress = async request => {
    try {
      const response = await postService(PATH_CUSTOMER.ADDRESS, request);
      this.showAddFormAddress();
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmitEditFormAddress = async request => {
    try {
      const response = await postService(PATH_CUSTOMER.ADDRESS, request);
      this.showEditFormAddress();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { dataAddressDefault, isAddressAvailable } = this.props;
    const {addresses} = this.state;
    return (
      <Fragment>
        <AddressCheckout
          dataAddressDefault={dataAddressDefault}
          isAddressAvailable={isAddressAvailable}
          onEditAddress={this.showEditFormAddress}
          onSelectListAddress={this.showListAddress}
          onAddAddress={this.showAddFormAddress}
        />
        <FormAddAddress
          visible={this.state.visibleAddAddress}
          onSubmit={this.handleSubmitAddFormAddress}
          onCancle={this.showAddFormAddress}
        />
        {isAddressAvailable &&
        <FormEditAddress 
          visible={this.state.visibleEditAddress}
          address={dataAddressDefault}
          onSubmit={this.handleSubmitEditFormAddress}
          onCancle={this.showEditFormAddress}
        />}
        <AddressList addresses={addresses} visible={this.state.visibleListAddress} onCancle={this.showListAddress}/>
      </Fragment>
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
)(Checkout);
