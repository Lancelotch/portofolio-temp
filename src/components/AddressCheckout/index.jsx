import React from "react";
import AddressDetail from "../AddressDetail";
import { Card, Button } from "antd";

export const AddressCheckout = props => {
  const {customerAddress, isAddressAvailable, onEditAddress, onSelectListAddress, onAddAddress}  = props;
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
          addressDefault={customerAddress}
          isAddressAvailable={isAddressAvailable}
          onEdit={onEditAddress}
        />
        <div style={{ float: "right", paddingBottom: 24, paddingTop: 12 }}>
          <Button
            type="primary"
            onClick={onSelectListAddress}
            style={{ marginRight: 24 }}
          >
            Kirim ke Alamat Lain
          </Button>
          <Button type="primary" onClick={onAddAddress}>
            Tambah Alamat
          </Button>
        </div>
      </div>
    </Card>
  );
};
