import React, { Fragment } from "react";
import { Radio, Col, Row } from "antd";

const StatusAddress = props => {
  return (
    <span
      style={{
        float: "right",
        fontFamily: "Helvetica Neue",
        fontSize: 17
      }}
    >
      {props.isDefault ? "Alamat Utama" : ""}
    </span>
  );
};

const AddressListDetail = props => {
  const {
    // id,
    labelName,
    fullAddress,
    receiverName,
    phoneNumber,
    isDefault
  } = props.address;
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
          <Radio value={props} checked={isDefault} style={{ float: "right" }} ></Radio>
        </Col>
      </Row>
      <br/>
    </Fragment>
  );
};

export default AddressListDetail;
