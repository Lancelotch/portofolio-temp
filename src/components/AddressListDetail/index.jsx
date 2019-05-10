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
    id,
    labelName,
    fullAddress,
    receiverName,
    phoneNumber,
    isDefault
  } = props.address;
  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <b
            style={{
              color: "#4D4D4D",
              fontSize: 17
            }}
          >
            {labelName}
          </b>

          <b
            style={{
              color: "#4D4D4D",
              fontSize: 17
            }}
          >{`${receiverName} - ${phoneNumber}`}
          </b>
        </Col>
        <Col md={12}>
        <StatusAddress isDefault={isDefault} />
        </Col>
      </Row>
      <Row>
        <Col md={24}>
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
          <Radio value={id}  style={{ float: "right" }} ></Radio>
          {/* <Radio value={id} defaultChecked={true} style={{ float: "right" }} ></Radio> */}
        </Col>
      </Row>
      <br />
    </Fragment>
  );
};

export default AddressListDetail;
