import React, { Component, Fragment } from "react";
import { Card, Button } from "antd";
import AddressDetail from "../../components/AddressDetail";

class AddressContainer extends Component {
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

  handleCancelList = () => {
    this.isListVisible();
  };

  render() {
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
          />
          <div style={{ float: "right", paddingBottom: 24, paddingTop: 12 }}>
            <Button
              type="primary"
              onClick={}
              style={{ marginRight: 24 }}
            >
              Kirim ke Alamat Lain
            </Button>
            <Button type="primary" onClick={}>
              Tambah Alamat
            </Button>
          </div>
          {/* <Fetcher path={PATH_CUSTOMER.ADDRESS}>
            <Addresses
              visible={visibleList}
              onCancle={this.handleCancelList}
              onSelect = {this.getAddressDefault}
              {...this.props}
            />
          </Fetcher> */}
        </div>
      </Card>
    );
  }
}

export default AddressContainer;
