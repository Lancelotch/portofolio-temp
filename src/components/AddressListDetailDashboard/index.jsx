import React, { Fragment } from 'react';
import { List, Icon, Button } from 'antd';
import "./style.sass";

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
    return (
        <React.Fragment>
            <tr>
                <td>
                    <List.Item>Nama Alamat</List.Item>
                    <List.Item>Atas Nama</List.Item>
                    <List.Item>No Telepon</List.Item>
                    <List.Item>Alamat</List.Item>
                </td>
                <td>
                    <List.Item>:</List.Item>
                    <List.Item>:</List.Item>
                    <List.Item>:</List.Item>
                    <List.Item>:</List.Item>
                </td>
                <td>
                    <List.Item>{labelName}</List.Item>
                    <List.Item>{receiverName}</List.Item>
                    <List.Item>{phoneNumber}</List.Item>
                    <List.Item>{fullAddress}{" "}{subdistrict}{" "}{city}{" "}{province}{" "}{zipcode}</List.Item>
                </td>
                <td>
                    {isDefault === true ?
                        showDefaultAddress(props, lengthAddress, isDefault)
                        :
                        showChangeDefaultAddress(props, id)}
                </td>
            </tr>
        </React.Fragment>
    );
};

export default AddressListDetailDashboard;

function showChangeDefaultAddress(props, id) {
    return <Fragment>
        <div className="addressListDetailAddress">
            <Icon type="edit" onClick={() => props.actionShowEditFormAddress(props.address)} />
            <Icon type="delete" onClick={() => props.showDeleteAddress(id)} />
        </div>
        <div className="addressListDetailAddressButton" style={{ marginTop: 30 }}>
            <Button style={{ width: 149, height: 40 }} onClick={() => props.actionChangeAddress(id)}>Jadikan Utama</Button>
        </div>
    </Fragment>;
}

function showDefaultAddress(props, lengthAddress, isDefault) {
    return <Fragment>
        <div className="addressListDetailAddress">
            <Icon type="edit" onClick={() => props.actionShowEditFormAddress(props.address)} />
            <Icon type="delete" style={{ cursor: "not-allowed", color: "#DDDDDD" }} />
        </div>
        <div className="addressListDetailAddressButton" style={{ marginTop: 30 }}>
            {lengthAddress.length <= 1 && <Icon type="delete" style={{ cursor: "not-allowed", color: "#DDDDDD" }} />}
            <StatusAddress isDefault={isDefault} />
        </div>
    </Fragment>;
}
