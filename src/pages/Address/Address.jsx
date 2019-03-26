import React, { Component, Fragment } from "react";
import composedWithApiMethod from "../../hoc/withApiMethod";
import { Card, Button } from "antd";
import AddressForm from "../../components/AddressForm/AddressForm";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleCancel = () => {
    this.isVisible();
  };

  isVisible = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  render() {
    const { visible } = this.state;
    return (
      <Card size="small" title="Alamat Pengiriman" style={{ width: 300 }}>
        <Button type="primary" onClick={this.isVisible}>
          Tambah Alamat
        </Button>
        <AddressForm visible={visible} handleCancel={this.handleCancel} />
      </Card>
    );
  }
}

export default composedWithApiMethod(Address);
