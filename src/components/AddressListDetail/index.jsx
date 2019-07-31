import React, { Fragment } from "react";
import { Radio, Col, Row } from "antd";
import "./style.sass";

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
      <Row>
        <Col md={16}>
          <div className="address-list-detail">
            <b>
              {labelName}
            </b>
            <br />
            <b>{`${receiverName} - ${phoneNumber}`}
            </b>
            <p>
              {fullAddress}
            </p>
          </div>
        </Col>
        <Col md={8}>
          <br />
          {isDefault && (
            <Fragment>
              <StatusAddress isDefault={isDefault} />
              <br />
              <div style={{ clear: "both" }} />
            </Fragment>
          )}
          <Radio value={id} style={{ float: "right" }} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddressListDetail;
