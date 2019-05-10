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
    // <Fragment>
      <Row>
        <Col xl={14} lg={14} md={14}>
          <b
            style={{
              color: "#4D4D4D",
              fontSize: 17
            }}
          >
            {labelName}
          </b>
          <br />
          <b
            style={{
              color: "#4D4D4D",
              fontSize: 17
            }}
          >{`${receiverName} - ${phoneNumber}`}
          </b>
          <br />
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
        <Col xl={10} lg={10} md={10}>
          <StatusAddress isDefault={isDefault} />
          <br/>
          <br />
            <Radio value={id}  style={{ float: "right" }} ></Radio>
            {/* <Radio value={id} defaultChecked={true} style={{ float: "right" }} ></Radio> */}
        </Col>
      </Row>
    // </Fragment>
  );
};

export default AddressListDetail;
