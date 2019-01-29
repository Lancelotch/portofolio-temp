import React from "react";
import PropTypes from "prop-types";
import Skeleton from "components/Skeleton/Skeleton";
import { Row, Col, Card } from "antd";

const addressReceiver = props => {
  const address = props.addressReceiver;

  const colorChange = {
    color: "#9B9B9B"
  };

  const textChangeAddress = {
    float: "right",
    display: "unset",
    cursor: "pointer",
    color: "#9B9B9B"
  };

  const labelAddAddress = {
    cursor: "pointer",
    color: "#8B572A",
    fontWeight: "600",
    textAlign: "right"
  };

  return (
    <Row>
      <Col md={12}>
        {!props.labelName ? <Skeleton /> : <p>{props.labelName}</p>}
      </Col>
      <Col md={12}>
        <p onClick={props.addAddress} style={labelAddAddress}>
          Tambah Alamat
        </p>
      </Col>
      <Col md={24}>
        <Card>
          {!address.receiverName ? (
            <Col md={4}>
              <Skeleton />
            </Col>
          ) : (
            <i className="far fa-user-circle CustomeridIcon">
              <b
                className="CustomeridIconText"
                style={{ marginBottom: "24px" }}
              >
                {address.receiverName}
              </b>
            </i>
          )}

          <p onClick={props.changeAddress} style={textChangeAddress}>
            <i style={{ marginRight: "10px" }} className="fas fa-pencil-alt" />
            Ganti alamat
          </p>

          {!address.labelName ? (
            <Skeleton heightSkeleton="180px" widthSkeleton="50%" />
          ) : (
            <p style={colorChange}>
              {address.labelName +
                ", " +
                address.fullAddress +
                ", " +
                address.city}
            </p>
          )}
          {!address.province ? (
            <Skeleton />
          ) : (
            <p style={colorChange}>
              {address.province + ", " + address.zipcode}
            </p>
          )}
          {!address.phoneNumber ? (
            <Skeleton />
          ) : (
            <p style={colorChange}>{"Phone Number : " + address.phoneNumber}</p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

addressReceiver.propTypes = {
  id: PropTypes.string,
  labelName: PropTypes.string,
  receiverName: PropTypes.string,
  fullAddress: PropTypes.string,
  isDefault: PropTypes.bool
};

export default addressReceiver;
