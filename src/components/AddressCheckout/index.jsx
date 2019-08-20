import React from "react";
import AddressDetail from "../AddressDetail";
import { Card, Icon } from "antd";
import "./style.sass";
import Button from "../Button/AllButton";

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
                type="secondary"
              >
                Kirim ke Alamat Lain
              </Button>
            )}
            <Button
              size="large"
              type="secondary"
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
