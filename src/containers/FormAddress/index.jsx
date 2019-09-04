import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col, Card } from "antd";
import { Formik } from "formik";
import { schema } from "./schema";
import address from "../../repository/Address";
import PropTypes from "prop-types";

const { Option } = Select;
const { TextArea } = Input;
export default function FormAddress(props) {
  const init = {
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
  const titleCreate = "Tambah Alamat Pengiriman";
  const titleUpdate = "Rubah Alamat Pengiriman";
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState();
  const [subdistricts, setSubdistricts] = useState();
  const [initialValues, setInitialValues] = useState(init);
  const [title, setTitle] = useState(titleCreate);

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(()=>{
    if(props.action === "create"){
      setInitialValues(init);
      setTitle(titleCreate);
    }else{
      getAddress(props.id);
      setTitle(titleUpdate);
    }
  },[props.action])

  async function getProvinces() {
    const response = await address.getListProvince({});
    if (response.status === 200) {
      setProvinces(response.data.data);
    }
  }

  async function getCities(provinceId) {
    const params = { province: provinceId };
    const response = await address.getListCity({ params: params });
    if (response.status === 200) {
      setCities(response.data.data);
    }
  }

  async function getSubdistricts(cityId) {
    const params = { city: cityId };
    const response = await address.getListSubdistrict({ params: params });
    if (response.status === 200) {
      setSubdistricts(response.data.data);
    }
  }

  async function getAddress(params) {
    const response = await address.get({
      loading: setLoading,
      params: params
    });
    if (response.status === 200) {
      setInitialValues(response.data.data);
    }
  }

  async function create(params) {
    return await address.create({
      loading: setLoading,
      params: params
    });
  }

  async function update(params) {
    return await address.update({
      loading: setLoading,
      params: params
    });
  }

  async function handleSubmit(params) {
    let response = {};
    if(props.action === "create"){
      response = await create(params);
    }else{
      response = await update(params);
    }
    if (response.status === 200) {
      props.onCancel();
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Card title={title} bordered={false}>
          <Form onSubmit={handleSubmit}>
            <Form.Item
              label="Nama Alamat"
              validateStatus={errors.labelName && touched.labelName && "error"}
              help={errors.labelName && touched.labelName && errors.labelName}
            >
              <Input
                placeholder="Contoh: Rumah, Kantor, Kost, dll"
                name="labelName"
                onChange={handleChange}
                value={values.labelName}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Atas Nama"
              validateStatus={
                errors.receiverName && touched.receiverName && "error"
              }
              help={
                errors.receiverName &&
                touched.receiverName &&
                errors.receiverName
              }
            >
              <Input
                placeholder="Atas Nama"
                name="receiverName"
                onChange={handleChange}
                value={values.receiverName}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="No. Telepon"
              validateStatus={
                errors.phoneNumber && touched.phoneNumber && "error"
              }
              help={
                errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
              }
            >
              <Input
                placeholder="08xxx"
                name="phoneNumber"
                type="number"
                onChange={handleChange}
                value={values.phoneNumber}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Provinsi"
              validateStatus={errors.province && touched.province && "error"}
              help={errors.province && touched.province && errors.province}
            >
              <Select
                showSearch
                name="province"
                placeholder="Select a province"
                optionFilterProp="children"
                onChange={option => {
                  const split = option.split("|");
                  setFieldValue("provinceId", split[0]);
                  setFieldValue("province", split[1]);
                  getCities(split[0]);
                  values.city = "";
                  values.cityId = "";
                  values.subdistrict = "";
                  values.subdistrictId = "";
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                value={values.province}
              >
                {provinces &&
                  provinces.map(province => (
                    <Option
                      value={`${province.province_id}|${province.province}`}
                      key={province.province_id}
                    >
                      {province.province}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Kota / Kabupaten"
              validateStatus={errors.city && touched.city && "error"}
              help={errors.city && touched.city && errors.city}
            >
              <Select
                showSearch
                name="city"
                placeholder="Select a City"
                optionFilterProp="children"
                onChange={option => {
                  const split = option.split("|");
                  setFieldValue("cityId", split[0]);
                  setFieldValue("city", split[1]);
                  getSubdistricts(split[0]);
                  values.subdistrict = "";
                  values.subdistrictId = "";
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                value={values.city}
              >
                {cities &&
                  cities.map(city => (
                    <Option
                      value={`${city.city_id}|${city.city_name}`}
                      key={city.city_id}
                    >
                      {city.city_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Row>
              <Col md={19}>
                <Form.Item
                  label="Kecamatan"
                  validateStatus={
                    errors.subdistrict && touched.subdistrict && "error"
                  }
                  help={
                    errors.subdistrict &&
                    touched.subdistrict &&
                    errors.subdistrict
                  }
                >
                  <Select
                    showSearch
                    name="subdistrict"
                    placeholder="Select a subdistrict"
                    optionFilterProp="children"
                    onChange={option => {
                      const split = option.split("|");
                      setFieldValue("subdistrictId", split[0]);
                      setFieldValue("subdistrict", split[1]);
                    }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={values.subdistrict}
                  >
                    {subdistricts &&
                      subdistricts.map(subdistrict => (
                        <Option
                          value={`${subdistrict.subdistrict_id}|${subdistrict.subdistrict_name}`}
                          key={subdistrict.subdistrict_id}
                        >
                          {subdistrict.subdistrict_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col offset={1} md={4}>
                <Form.Item
                  label="Kode Pos"
                  validateStatus={errors.zipcode && touched.zipcode && "error"}
                  help={errors.zipcode && touched.zipcode && errors.zipcode}
                >
                  <Input
                    placeholder=""
                    name="zipcode"
                    onChange={handleChange}
                    value={values.zipcode}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Alamat Lengkap"
              validateStatus={
                errors.fullAddress && touched.fullAddress && "error"
              }
              help={
                errors.fullAddress && touched.fullAddress && errors.fullAddress
              }
            >
              <TextArea
                placeholder="Atas Nama"
                name="fullAddress"
                onChange={handleChange}
                value={values.fullAddress}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Row type="flex" justify="end">
              <Col md={4}>
                <span onClick={props.onCancel}>Batalkan</span>
              </Col>
              <Col md={4}>
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={props.onLoading}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </Formik>
  );
}

FormAddress.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string
};
