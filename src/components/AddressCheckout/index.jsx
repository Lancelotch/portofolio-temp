import React from "react";
import AddressDetail from "../AddressDetail";
import { Card } from "antd";
import "./style.sass";
import Button from "../Button";
import strings from "../../localization/localization";
import ButtonIcon from "../ButtonIcon";

export const AddressCheckout = props => {
  const {
    addressDefault,
    onEditAddress,
    onSelectListAddress,
    onAddAddress,
    onLoading
  } = props;
  return (
    <div style={{ marginBottom: 15 }}>
      <Card
        className="card-address"
        size="default"
        title={<div>{strings.shipping_address}</div>}
      >
        <div style={{ padding: 15 }}>
          {onLoading && !addressDefault? (
            <span>Loading...</span>
          ) : (
            <React.Fragment>
              <AddressDetail
                addressDefault={addressDefault}
                onEdit={onEditAddress}
              />
              <div className="address-checkout">
                {addressDefault && (
                  <Button
                    onClick={onSelectListAddress}
                    size="large"
                    type="secondary"
                    marginright="small"
                  >
                    {strings.send_to_another_address}
                  </Button>
                )}
                <Button size="large" type="secondary" onClick={onAddAddress}>
                  {strings.add_address} &nbsp; <ButtonIcon icon="plus" />
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Card>
    </div>
  );
};
