import React, { useState, useEffect } from "react";
import { Card, Icon, Modal } from "antd";
import Button from "../../components/Button";
import strings from "../../localization/localization";
import Body from "./Body";
import AddressRepo from "../../repository/Address";
import "./style.sass";
import FormAddress from "../../containers/FormAddress";

export default function Address() {
  const [loading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState();
  const [address, setAddress] = useState();
  const [adresses, setAddresses] = useState([]);
  const [visibleAddAddress, setVisibleAddAddress] = useState(false);
  const [visibleEditAddress, setVisibleEditAddress] = useState(false);
  const getListAddress = async function() {
    const response = await AddressRepo.getAll({ loading: setLoading });
    if (response.status === 200) {
      setAddresses(response.data.data);
      setIsDefault(false);
    }else{
      setIsDefault(true);
    }
  };

  const updateAddressDefault = async function(address) {
    const params = {addressId: address.id};
    const response = await AddressRepo.updateDefault({ loading: setLoading,  params: params});
    if (response.status === 200) {
        getListAddress();
    }
  };

  const deleteAddress = async function(address) {
    const id = address.id;
    const response = await AddressRepo.delete({ loading: setLoading,  id: id});
    if (response.status === 200) {
        getListAddress();
    }
  };

  useEffect(() => {
    getListAddress();
  }, []);

  const actionCreate = function() {
    setVisibleAddAddress(!visibleAddAddress);
  };

  const actionChange = function(address) {
    updateAddressDefault(address);
  };

  const actionEdit = function(address) {
    setAddress(address);
    setVisibleEditAddress(!visibleEditAddress);
  };
  
  const actionDelete = function(address) {
    deleteAddress(address);
    getListAddress();
  };

  function handleSuccessCreate() {
    setVisibleAddAddress(!visibleAddAddress);
    getListAddress();
  }

  function handleSuccessEdit() {
    setVisibleEditAddress(!visibleEditAddress);
    getListAddress();
  }

  return (
    <React.Fragment>
      <Card
        title={
          <React.Fragment>
            <h4>{strings.address_me}</h4>
            <span className="mp-address-header">
              {strings.use_notice_address}
            </span>
          </React.Fragment>
        }
        extra={
          <Button
            size="large"
            type="secondary"
            onClick={actionCreate}
          >
            {strings.add_address}
            <Icon type="plus" />
          </Button>
        }
      >
        {adresses.map((address, index) => (
          <Body
            key={address.id}
            address={address}
            onChange={actionChange}
            onEdit={actionEdit}
            onDelete={actionDelete}
            index={index}
          />
        ))}
      </Card>
      <Modal
        visible={visibleAddAddress}
        footer={null}
        onCancel={() => setVisibleAddAddress(!visibleAddAddress)}
      >
        <FormAddress
          action={"create"}
          onCancel={() => setVisibleAddAddress(!visibleAddAddress)}
          onSuccess={() => handleSuccessCreate()}
          default={isDefault}
        />
      </Modal>
      {address && (
        <React.Fragment>
          <Modal
            visible={visibleEditAddress}
            footer={null}
            onCancel={() => setVisibleEditAddress(!visibleEditAddress)}
          >
            <FormAddress
              action={"update"}
              onCancel={() => setVisibleEditAddress(!visibleEditAddress)}
              onSuccess={() => handleSuccessEdit()}
              address={address}
            />
          </Modal>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
