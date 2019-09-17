import React, { Fragment } from "react";
import { Radio, Col, Row } from "antd";
import "./style.sass";

const StatusAddress = props => {
  return (
    <span className="address-list-detail-status-address">
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

  let selectedListAddress =
    (props.customerAddress ? id === props.customerAddress : props.selected === id) ||
    (props.statusSelect && isDefault) ? "address-selected-active" : "address-selected"

  return (
    <Fragment>
      <Radio className="address-list-detail-radio" value={id}>
        <Row className={`address-list-detail-wrapper ${selectedListAddress}`}>
          <Col md={16}>
            <div className="address-list-detail">
              <b>
                {labelName}
              </b>
              <br />
              <strong>{`${receiverName} - ${phoneNumber}`}</strong>
              <p>
                {fullAddress}
              </p>
            </div>
          </Col>
          <Col md={8}>
            {isDefault && <StatusAddress isDefault={isDefault} />}
          </Col>
        </Row>
      </Radio>
    </Fragment>
  );
};

export default AddressListDetail;
