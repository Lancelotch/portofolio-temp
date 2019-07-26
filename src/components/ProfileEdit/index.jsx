import React from "react";
import { Row, Col, Input, Button } from "antd";

const ProfileEdit = props => {
  const { customerName, customerEmail, handleChangeName, handleSubmit } = props;
  return (
    <Row style={{ padding: 28, maxWidth: 400 }}>
      <Col md={4} style={{ lineHeight: 3 }}>
        <span>Nama</span>
        <br />
        <span>Email</span>
      </Col>
      <Col md={20} style={{ lineHeight: 3 }}>
        <Input onChange={handleChangeName} defaultValue={customerName} />
        <span>{customerEmail}</span>
        <Button onClick={handleSubmit}>Simpan Perubahan</Button>
      </Col>
    </Row>
  );
};

export default ProfileEdit;
