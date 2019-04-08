import React, { Fragment } from "react";
import { Radio, Col, Row, Icon } from "antd";

const StatusAddress = props => {
  return (
    <span
      style={{
        float: "right",
        fontFamily: "Helvetica Neue",
        fontSize: 17
      }}
    >
      {props.isDefault ? "Utama" : "Jadikan Utama"}
    </span>
  );
};

const Address = props => {
  const {
    id,
    labelName,
    fullAddress,
    receiverName,
    phoneNumber,
    isDefault
  } = props;
  return (
    <Fragment>
      <Row>
        <Col>
          <p
            style={{
              color: "#4D4D4D",
              fontFamily: "Helvetica Neue",
              fontSize: 17
            }}
          >
            {labelName}
            <StatusAddress isDefault={isDefault} />
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <span
            style={{
              color: "#4D4D4D",
              fontFamily: "Helvetica Neue",
              fontSize: 17
            }}
          >{`${receiverName} - ${phoneNumber}`}</span>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <p
            style={{
              color: "#888888",
              fontFamily: "Helvetica Neue",
              fontSize: 14
            }}
          >
            {fullAddress}
          </p>
        </Col>
        <Col>
          <Radio value={id} checked={isDefault} style={{ float: "right" }} >Pilih</Radio>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            style={{
              color: "#888888",
              fontFamily: "Helvetica Neue",
              fontSize: 16
            }}
          >
            <Icon type="delete" style={{ marginRight: 12 }} />
            Edit
          </p>
        </Col>
      </Row>
      <hr />
    </Fragment>
  );
};

export default Address;
