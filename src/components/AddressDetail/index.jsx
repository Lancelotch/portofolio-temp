import React from "react";
import { Row, Col, Icon } from "antd";
import "./style.sass";
import ButtonIcon from "../ButtonIcon";

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
        <Col md={12} className="address__name">
          <p>{labelName}</p>
        </Col>
        <Col md={12}>
          <div className="address__icon-edit">
            <ButtonIcon icon="edit" onClick={() => props.onEdit("EDIT")} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={24} className="address__detail-info">
          <p>{`${receiverName} - ${phoneNumber}`}</p>
          <span>{`${fullAddress},${city},${province}${zipcode}`}</span>
        </Col>
      </Row>
    </div>
  );
};

const AddressUnAvailable = () => {
  return (
    <div>
      <Row>
        <Col className="address__icon-exclamation">
          <center>
            <Icon
              type="exclamation-circle"
              theme="twoTone"
              twoToneColor="#FB6900"
            />
          </center>
        </Col>
      </Row>
      <Row>
        <Col className="address__empty">
          <p>
            Alamat pengiriman masih kosong, lengkapi alamat pengiriman untuk
            melanjutkan pembelian produk.
          </p>
        </Col>
      </Row>
    </div>
  );
};

const AddressDetail = React.memo(function AddressDetail(props){
  return props.address ? (
    <AddressAvailable data={props.address} onEdit={props.onEdit} />
  ) : (
      <AddressUnAvailable />
  )
});

export default AddressDetail;
