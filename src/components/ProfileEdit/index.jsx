import React from "react";
import "./style.sass";
import { Form, Row, Col } from "antd";
import Button from "../Button";
import Input from "../Input";

const ProfileEdit = props => {
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleSubmit();
      }
    });
  };
  const rules = (required, message, initialValue) => {
    return {
      rules: [{ required: required, message: message }],
      initialValue: initialValue
    };
  };
  const { customerName, customerEmail, handleChangeName } = props;
  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={onSubmit} className="profile__row-edit">
      <Row>
        <Col md={4}>
          <Form.Item>
            <span>Nama</span>
          </Form.Item>
        </Col>
        <Col md={20}>
          <Form.Item>
            {getFieldDecorator(
              "name",
              rules(true, "Nama harus diisi minimal 1 karakter", customerName)
            )(<Input onChange={handleChangeName} maxLength={30} />)}
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
  );
};

const ProfileEditForm = Form.create({ name: "profile_edit_form" })(ProfileEdit);

export default ProfileEditForm;
