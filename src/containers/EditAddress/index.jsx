import React, { useState, useEffect } from "react";
import FormAddress from "../FormAddress";
import { Card } from "antd";
import address from "../../repository/Address";
import PropTypes from "prop-types";

export default function EditAddress(props) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState();
  useEffect(() => {
     getAddress(props.id);
  }, []);

  async function getAddress(params) {
    const response = await address.get({
      loading: setLoading,
      params: params
    });
    if (response.status === 200) {
      setInitialValues(response.data.data);
    }
  }

  async function handleSubmit(params) {
    const response = await address.update({
      loading: setLoading,
      params: params
    });
    if (response.status === 200) {
      console.log(response);
      props.onCancel();
    }
  }
  return (
    <Card title={"Rubah Alamat Pengiriman"} bordered={false}>
      {initialValues && <FormAddress
        initialValues ={initialValues}
        onSubmit={handleSubmit}
        onCancel={props.onCancel}
        onLoading={loading}
      />}
    </Card>
  );
}

EditAddress.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func
};