import React, {Fragment} from 'react';
import { Row, Col, List, Typography, Icon, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

const Text = Typography.Text;
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

export default function Body({address, onEdit, onDelete, onChange, index}){
    const {labelName, receiverName, phoneNumber, subdistrict, city, province, zipcode, fullAddress, isDefault} = address;
    return(
        <Row>
            {index > 0 && <hr className="mp-address-in-line" />}
            <Col md={3}>
                <List.Item><Text className="mp-list-data-address">Nama Alamat</Text></List.Item>
                <List.Item><Text className="mp-list-data-address">Atas Nama</Text></List.Item>
                <List.Item><Text className="mp-list-data-address">No Telefon</Text></List.Item>
                <List.Item><Text className="mp-list-data-address">Aalamat Lengkap</Text></List.Item>

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
                <List.Item>{`${fullAddress} ${subdistrict} ${city} ${province} ${zipcode}`}</List.Item>
            </Col>
            <Col md={3} style={{ marginTop: 22 }}>
                {isDefault ? 
                    <Fragment>
                        <div className="mp-address-list-detail-address">
                            <Icon type="edit" className="mp-address-list-detail-address-button-icon-change" onClick={() => onEdit(address)} />
                            {index+1 >= 1 &&<Icon type="delete" className="mp-address-list-detail-address-button-icon-default" />}
                        </div>
                        <div className="mp-address-list-detail-address-button-icon-default" style={{ marginTop: 30 }}>
                            <StatusAddress isDefault={isDefault} />
                        </div>
                    </Fragment>
                     : 
                    <Fragment>
                        <div className="mp-address-list-detail-address">
                            <Icon type="edit" className="mp-address-list-detail-address-button-icon-change"  onClick={() => onEdit(address)} />
                            <Popconfirm
                                placement="top"
                                title={"Apa anda yakin ?"}
                                onConfirm={()=>onDelete(address)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Icon type="delete" className="mp-address-list-detail-address-button-icon-change" />
                            </Popconfirm>
                        </div>
                        <div className="mp-address-list-detail-address-button" style={{ marginTop: 30 }}>
                            <Button  onClick={() => onChange(address)}>Jadikan Utama</Button>
                        </div>
                    </Fragment>
                }
            </Col>
        </Row>
    )
}

Body.propType = {
    address : PropTypes.object,
    index: PropTypes.number,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}

Body.defaultProps = {
    index : 0
}