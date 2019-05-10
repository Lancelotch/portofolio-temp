import React from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
import "./style.sass";
import strings from '../../localization/localization';

const OrderStatusUser = props => {
    const { label, customer, estimateShippingDate, index } = props;
    return (
        <React.Fragment>
            {customer !== undefined | customer &&
                <div className="orderStatusUser"
                    style={{
                        marginTop: 10,
                        padding: 15
                    }}>
                    <Row>
                        <Col md={12}>
                            <h2>{label}</h2>
                        </Col>
                        <Col md={12}>
                            {index === 3 && index === 4 &&
                                <p className="perkiraanDiterima">
                                    {strings.estimate_accepted} : &nbsp;
                        {estimateShippingDate}
                                </p>
                            }
                        </Col>
                    </Row>
                    <hr className="inline" />
                    <Row>
                        <Col md={9}>
                            <div className="wrapperLeft borderRight">
                                <b className="nameCustomer">{customer.receiverName}</b>
                                <p className="nameCustomerText">
                                    <NumberFormat
                                        value={customer.phoneNumber}
                                        displayType={'text'}
                                        format="####-####-####"
                                    />
                                </p>
                                <p className="nameCustomerText">{customer.fullAddress}{customer.zipcode}</p>
                            </div>
                        </Col>
                        <Col md={15}>
                            <div className="wrapperRight"></div>
                        </Col>
                    </Row>
                </div>}
        </React.Fragment>
    );
};

export default OrderStatusUser;