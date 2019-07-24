import React, { Fragment } from 'react';
import { List, Icon } from 'antd';
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

const AddressListDetailDashboard = props => {
    const {
        id,
        labelName,
        receiverName,
        phoneNumber,
        city,
        fullAddress,
        province,
        provinceId,
        cityId,
        zipcode,
        geolocation,
        subdistrict,
        subdistrictId,
        isDefault
    } = props.address;
    const {address} = props;
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
                    <button onClick={() => props.actionChangeAddress(id)}>Utamakan</button>
                    {isDefault && (
                        <Fragment>
                            <StatusAddress isDefault={isDefault} />
                            <br />
                            <div style={{ clear: "both" }}></div>
                        </Fragment>
                    )}
                    <button onClick={() => props.showDeleteAddress(id)}>Delete Address</button>
                    <Icon
                        type="edit"
                        style={{
                            float: "right"
                        }}
                        onClick={() => props.actionShowEditFormAddress(address)}
                        className={"icon"}
                    />

                </td>
            </tr>
        </React.Fragment>
    );
};

export default AddressListDetailDashboard;