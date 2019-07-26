import React, { Fragment } from "react";
import { Radio, Col, Row } from "antd";

const StatusAddress = props => {
  return (
    <span
      style={{
        float: "right",
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
      <Row style={{ marginBottom: 19 }}>
        <Col md={16}>
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
          <p
            style={{
              color: "#888888",
              fontSize: 14
            }}
          >
            {fullAddress}
          </p>
        </Col>
        <Col md={8}>
          <br />
          {isDefault && (
            <Fragment>
              <StatusAddress isDefault={isDefault} />
              <br />
              <div style={{ clear: "both" }}></div>
            </Fragment>
          )}
          <Radio onClick={() => props.actionChangeDefaultAddress(id)} value={id} style={{ float: "right" }}>
          </Radio>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddressListDetail;
