import React from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
import "./style.sass";

const OrderStatusUser = props => {
    const { label, customer, estimateShippingDate, tabsInDelivery, tabsFinish,estimateAccepted } = props;
    return (
        <React.Fragment>
            {customer !== undefined | customer &&
                <div className="orderStatusUser"
                    style={{
                        marginTop: 10,
                        marginBottom: 70,
                        padding: 15
                    }}>
                    <Row>
                        <Col md={12}>
                            <h2>{label}</h2>
                        </Col>
                        <Col md={12}>
                            {((tabsInDelivery === 3) || (tabsFinish === 4)) &&
                                (<p className="perkiraanDiterima">
                                    {estimateAccepted} : &nbsp;
                                {estimateShippingDate}
                                </p>)
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