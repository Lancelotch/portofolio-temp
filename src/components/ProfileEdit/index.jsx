import React from "react";
import "./style.sass";
import { Form, Row, Col } from "antd";
import Button from "../Button";
import Input from "../Input";
import { Formik } from "formik";
import { schema } from "./schema";

const ProfileEdit = props => {
  const onSubmit = data => {
    props.handleSubmit(data);
  };
  const { customerName, customerEmail } = props;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ name: customerName }}
      onSubmit={values => {
        const name = values.name;
        onSubmit(name);
      }}
      validationSchema={schema}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="profile__row-edit">
          <Row>
            <Col md={4}>
              <Form.Item>
                <span>Nama</span>
              </Form.Item>
            </Col>
            <Col md={20}>
              <Form.Item
                validateStatus={errors.name && "error"}
                help={errors.name}
              >
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  maxLength={30}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Item>
                <span>Email</span>
              </Form.Item>
            </Col>
            <Col md={20}>
              <Form.Item>
                <span className="profile__customer-email">{customerEmail}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={4}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Simpan Perubahan
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

const ProfileEditForm = Form.create({ name: "profile_edit_form" })(ProfileEdit);

export default ProfileEditForm;
