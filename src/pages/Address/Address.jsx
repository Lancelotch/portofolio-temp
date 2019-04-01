import React, { Component, Fragment } from "react";
import { Card, Button } from "antd";
import AddressForm from "../../components/AddressForm/AddressForm";
import FetcherAction from "../../hoc/FetcherAction";
import AddressDetail from "../../components/AddressDetail";
import { connect } from "react-redux";
import { addressDefault } from "../../store/actions/address";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      payloadAddressDefault: null
    };
  }

  componentDidMount() {
    this.getAddressDefault();
  }

  handleCancel = () => {
    this.isVisible();
  };

  isVisible = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  getAddressDefault = () => {
    this.props.addressDefault();
  };

  render() {
    const { visible } = this.state;
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
          <div style={{ float: "right", paddingBottom: 24, paddingTop: 12  }}>
            <Button type="primary" onClick={this.isVisible} style={{marginRight: 24}} >
              Kirim ke Alamat Lain
            </Button>
            <Button type="primary" onClick={this.isVisible}>
              Tambah Alamat
            </Button>
          </div>
          <AddressForm visible={visible} handleCancel={this.handleCancel} onSubmit={this.getAddressDefault}/>
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
