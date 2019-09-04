import React, { useState } from "react";
import FormAddress from "../FormAddress";
import { Card } from "antd";
import address from "../../repository/Address";
import PropTypes from "prop-types";

export default function CreateAddress(props) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    labelName: "",
    receiverName: "",
    phoneNumber: "",
    fullAddress: "",
    provinceId: "",
    province: "",
    cityId: "",
    city: "",
    subdistrictId: "",
    subdistrict: "",
    zipcode: "",
    geolocation: { longitude: -6.219201, latitude: 107.172443 },
    isDefault: false
  };
  async function handleSubmit(params) {
    const response = await address.create({
      loading: setLoading,
      params: params
    });
    if (response.status === 200) {
      console.log(response);
      props.onCancel();
    }
  }
  return (
    <Card title={"Tambah Alamat Pengiriman"} bordered={false}>
      <FormAddress
        initialValues ={initialValues}
        onSubmit={handleSubmit}
        onCancel={props.onCancel}
        onLoading={loading}
      />
    </Card>
  );
}

CreateAddress.propTypes = {
  onCancel: PropTypes.func
};
