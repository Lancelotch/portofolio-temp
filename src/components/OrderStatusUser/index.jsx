import React from 'react';
import { Row, Col, Card } from 'antd';
import NumberFormat from 'react-number-format';
import "./style.sass";

const OrderStatusUser = props => {
    const {
        label,
        customer,
        estimateShippingDate,
        tabsInDelivery,
        tabsFinish,
        estimateAccepted } = props;
        let styleEstimateaAccepted = {
            color: "#BBBBBB",
            fontSize: 16,
            textAlign: "right",
            fontWeight: 500
        }
    return (
        <React.Fragment>
            {customer !== undefined | customer &&
                <div style={{ marginTop: 15 }}>
                    <Card>
                        <Row>
                            <Col md={12}>
                                <h2>{label}</h2>
                            </Col>
                            <Col md={12}>
                                {((tabsInDelivery === 3) || (tabsFinish === 4)) &&
                                    (<p style={styleEstimateaAccepted}>
                                        {estimateAccepted} : &nbsp;
                                {estimateShippingDate}
                                    </p>)
                                }
                            </Col>
                        </Row>
                        <hr className="productOrder__inline" />
                        <Row>
                            <Col md={9}>
                                <div className="borderRight">
                                    <b className="nameCustomer">{customer.receiverName}</b>
                                    <p className="nameCustomerText"
                                        style={{ marginTop: "1rem", marginBottom: 0 }}>
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
                    </Card>
                </div>}
        </React.Fragment>
    );
};

export default OrderStatusUser;