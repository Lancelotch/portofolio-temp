import React from "react";
import AddressDetail from "../AddressDetail";
import { Card, Button } from "antd";
import "./style.sass";

export const AddressCheckout = props => {
  const {
    customerAddress,
    isAddressAvailable,
    onEditAddress,
    onSelectListAddress,
    onAddAddress }
    = props;
  return (
    <div style={{ marginBottom: 15 }}>
      <Card
        size="default"
        title={
          <div
            style={{
              paddingLeft: 12,
              fontSize: 18
            }}>Alamat Pengiriman</div>
        }
      >
        <div style={{ padding: 15 }}>
          <AddressDetail
            addressDefault={customerAddress}
            isAddressAvailable={isAddressAvailable}
            onEdit={onEditAddress}
          />
          <div className="addressCheckout">
            <Button
              onClick={onSelectListAddress}
              size="large"
              className="addressCheckout__button">
              Kirim ke Alamat Lain
          </Button>
            <Button
              size="large"
              className="addressCheckout__button"
              onClick={onAddAddress}>
              Tambah Alamat &nbsp; +
          </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
