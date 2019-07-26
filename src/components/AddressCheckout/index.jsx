import React from "react";
import AddressDetail from "../AddressDetail";
import { Card, Button, Icon } from "antd";
import "./style.sass";

export const AddressCheckout = props => {
  const {
    customerAddress,
    isAddressAvailable,
    onEditAddress,
    onSelectListAddress,
    onAddAddress
  } = props;
  return (
    <div style={{ marginBottom: 15 }}>
      <Card
        className="card-address"
        size="default"
        title={<div>Alamat Pengiriman</div>}
      >
        <div style={{ padding: 15 }}>
          <AddressDetail
            addressDefault={customerAddress}
            isAddressAvailable={isAddressAvailable}
            onEdit={onEditAddress}
          />
          <div className="address-checkout">
            {isAddressAvailable && (
              <Button
                onClick={onSelectListAddress}
                size="large"
                className="address-checkout__button"
              >
                Kirim ke Alamat Lain
              </Button>
            )}
            <Button
              size="large"
              className="address-add__button"
              onClick={onAddAddress}
            >
              Tambah Alamat <Icon type="plus" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
