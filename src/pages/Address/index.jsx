import React, { useState, useEffect } from "react";
import { Card, Icon, Modal } from "antd";
import Button from "../../components/Button";
import strings from "../../localization/localization";
import Body from "./Body";
import repositoryAddress from "../../repository/Address";
import "./style.sass";
import FormAddress from "../../containers/FormAddress";

export default function Address() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [adresses, setAddresses] = useState([]);
  const [visibleAddAddress, setVisibleAddAddress] = useState(false);
  const [visibleEditAddress, setVisibleEditAddress] = useState(false);
  const getListAddress = async function() {
    const response = await repositoryAddress.getAll({ loading: setLoading });
    if (response.status === 200) {
      setAddresses(response.data.data);
    }
  };

  const updateAddressDefault = async function(address) {
    const params = {addressId: address.id};
    const response = await repositoryAddress.updateDefault({ loading: setLoading,  params: params});
    if (response.status === 200) {
        getListAddress();
    }
  };

  const deleteAddressDefault = async function(address) {
    const params = address.id;
    const response = await repositoryAddress.Delete({ loading: setLoading,  params: params});
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
    deleteAddressDefault(address);
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
