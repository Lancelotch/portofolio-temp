import React, { Fragment } from 'react';
import { List, Icon, Button, Row, Col, Typography } from 'antd';
import "./style.sass";


const { Text } = Typography;

const StatusAddress = props => {
    return (
        <span
            style={{
                color: "#FB6900",
                fontSize: 16
            }}
        >
            {props.isDefault ? "Alamat Utama" : ""}
        </span>
    );
};

const AddressListDetailDashboard = props => {
    const {
        id,
        labelName,
        receiverName,
        phoneNumber,
        city,
        fullAddress,
        province,
        zipcode,
        subdistrict,
        isDefault
    } = props.address;
    const { lengthAddress } = props;
    const listDataAddress = [{
        addressName: "Nama Alamat",
        nameReceived: "Atas Nama",
        phone: "No Telepon",
        address: "Alamat"
    }]
    return (
        <Row>
            <hr className="mp-address-in-line" />
            <Col md={3}>
                {listDataAddress.map((list,i) => {
                    return (
                        <Fragment key={i}>
                            <List.Item><Text className="mp-list-data-address">{list.addressName}</Text></List.Item>
                            <List.Item><Text className="mp-list-data-address">{list.nameReceived}</Text></List.Item>
                            <List.Item><Text className="mp-list-data-address">{list.phone}</Text></List.Item>
                            <List.Item><Text className="mp-list-data-address">{list.address}</Text></List.Item>
                        </Fragment>)})}

            </Col>
            <Col md={1}>
                <List.Item>:</List.Item>
                <List.Item>:</List.Item>
                <List.Item>:</List.Item>
                <List.Item>:</List.Item>

            </Col>
            <Col md={17}>
                <List.Item>{labelName}</List.Item>
                <List.Item>{receiverName}</List.Item>
                <List.Item>{phoneNumber}</List.Item>
                <List.Item>{fullAddress}{" "}{subdistrict}{" "}{city}{" "}{province}{" "}{zipcode}</List.Item>
            </Col>
            <Col md={3} style={{ marginTop: 22 }}>
                {isDefault === true ?
                    showDefaultAddress(props, lengthAddress, isDefault)
                    :
                    showChangeDefaultAddress(props, id)}
            </Col>

        </Row>
    );
};

export default AddressListDetailDashboard;

function showChangeDefaultAddress(props, id) {
    return <Fragment>
        <div className="mp-address-list-detail-address">
            <Icon type="edit" className="mp-address-list-detail-address-button-icon-change"  onClick={() => props.actionShowEditFormAddress(props.address)} />
            <Icon type="delete" className="mp-address-list-detail-address-button-icon-change" onClick={() => props.showDeleteAddress(id)} />
        </div>
        <div className="mp-address-list-detail-address-button" style={{ marginTop: 30 }}>
            <Button  onClick={() => props.actionChangeAddress(id)}>Jadikan Utama</Button>
        </div>
    </Fragment>;
}

function showDefaultAddress(props, lengthAddress, isDefault) {
    return <Fragment>
        <div className="mp-address-list-detail-address">
            <Icon type="edit" className="mp-address-list-detail-address-button-icon-change" onClick={() => props.actionShowEditFormAddress(props.address)} />
            {lengthAddress.length >= 1 &&<Icon type="delete" className="mp-address-list-detail-address-button-icon-default" />}
        </div>
        <div className="mp-address-list-detail-address-button-icon-default" style={{ marginTop: 30 }}>
            <StatusAddress isDefault={isDefault} />
        </div>
    </Fragment>;
}
