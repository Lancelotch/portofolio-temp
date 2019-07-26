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
            <hr className="addressInline" />
            <Col md={3}>
                {listDataAddress.map((list,i) => {
                    return (
                        <Fragment key={i}>
                            <List.Item><Text disabled>{list.addressName}</Text></List.Item>
                            <List.Item><Text disabled>{list.nameReceived}</Text></List.Item>
                            <List.Item><Text disabled>{list.phone}</Text></List.Item>
                            <List.Item><Text disabled>{list.address}</Text></List.Item>
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
        <div className="addressListDetailAddress">
            <Icon type="edit" className="addressListDetailAddressButtonIconChange"  onClick={() => props.actionShowEditFormAddress(props.address)} />
            <Icon type="delete" className="addressListDetailAddressButtonIconChange" onClick={() => props.showDeleteAddress(id)} />
        </div>
        <div className="addressListDetailAddressButton" style={{ marginTop: 30 }}>
            <Button  onClick={() => props.actionChangeAddress(id)}>Jadikan Utama</Button>
        </div>
    </Fragment>;
}

function showDefaultAddress(props, lengthAddress, isDefault) {
    return <Fragment>
        <div className="addressListDetailAddress">
            <Icon type="edit" className="addressListDetailAddressButtonIconChange" onClick={() => props.actionShowEditFormAddress(props.address)} />
            {lengthAddress.length >= 1 &&<Icon type="delete" className="addressListDetailAddressButtonIconDefault" />}
        </div>
        <div className="addressListDetailAddressButtonIconDefault" style={{ marginTop: 30 }}>
            <StatusAddress isDefault={isDefault} />
        </div>
    </Fragment>;
}
