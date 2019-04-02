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
        <Col>
          <span>
            <p
              style={{
                color: "#4D4D4D",
                fontFamily: "Helvetica Neue",
                fontSize: 17
              }}
            >
              {labelName}
              <Icon
                type="edit"
                style={{ fontSize: "18px", color: "#007E80", float: "right" }}
                onClick={props.onEdit}
                className={"icon"}
              />
            </p>
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            style={{
              color: "#4D4D4D",
              fontFamily: "Helvetica Neue",
              fontSize: 17
            }}
          >{`${receiverName} - ${phoneNumber}`}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            style={{
              color: "#888888",
              fontFamily: "Helvetica Neue",
              fontSize: 14
            }}
          >{`${fullAddress}, ${city}, ${province} ${zipcode}`}</p>
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
              fontFamily: "PingFang SC",
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
    <AddressAvailable data={props.addressDefault} onEdit={props.onEdit}/>
  ) : (
    <AddressUnAvailable />
  );
};

export default AddressDetail;
