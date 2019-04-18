import React, { Component } from "react";
import { connect } from "react-redux";
import FormAddress from "../../containers/FormAddress";
import { addressDefault } from '../../store/actions/address';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  handleCancleFormAddress = () => {
    this.setState(prevState=>({
        visible: !prevState.visible
    }));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ visible: true })}>Form</button>
        <FormAddress visible={this.state.visible} onCancle={this.handleCancleFormAddress}/>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  dataAddressDefault: state.address.addressDefault,
  isAddressAvailable: state.address.isAddressAvailable
});

export default connect(mapStatetoProps,{addressDefault})(Checkout);
