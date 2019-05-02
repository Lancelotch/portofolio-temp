import React from "react";
import { Row, Col, Icon } from "antd";
import "./style.sass"

const AddressAvailable = props => {
  const {
    city,
    fullAddress,
    labelName,
    phoneNumber,
    province,
    receiverName,
    zipcode
  } = props.data;
  return (
    <div>
      <Row>
        <Col md={12}>
          <p
            style={{
              color: "#4D4D4D",
              fontSize: 17
            }}
          >
            {labelName}
          </p>
        </Col>
        <Col md={12}>
          <Icon
            type="edit"
            style={{
              fontSize: "18px",
              color: "#007E80",
              float: "right",
              cursor: "pointer"
            }}
            onClick={() => props.onEdit("EDIT")}
            className={"icon"}
          />
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <p
            style={{
              color: "#4D4D4D",
              fontSize: 17,
              marginBottom: 5
            }}>
            {`${receiverName} - ${phoneNumber}`}
          </p>
          <span
            style={{
              display: "block",
              fontSize: 15,
              color: "#777777"
            }}>
            {`${fullAddress},${city},${province}${zipcode}`}
          </span>
        </Col>
      </Row>
    </div>
  );
};

const AddressUnAvailable = () => {
  return (
    <div>
      <Row>
        <Col>
          <center>
            <Icon
              style={{ fontSize: "32px" }}
              type="exclamation-circle"
              theme="twoTone"
              twoToneColor="#FB6900"
            />
          </center>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            style={{
              color: "rgba(0,0,0,0.65)",
              fontSize: 14,
              textAlign: "center"
            }}
          >
            Alamat pengiriman masih kosong, lengkapi alamat pengiriman untuk
            melanjutkan pembelian produk.
          </p>
        </Col>
      </Row>
    </div>
  );
};

const AddressDetail = props => {
  return props.isAddressAvailable ? (
    <AddressAvailable data={props.addressDefault} onEdit={props.onEdit} />
  ) : (
      <AddressUnAvailable />
    );
};

export default AddressDetail;
