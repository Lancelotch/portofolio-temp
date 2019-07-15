import React from 'react';
import { Row, Col, Card } from 'antd';
import NumberFormat from 'react-number-format';
import "./style.sass";
import convertTimesTime from '../../library/convertTimestime';

const OrderStatusUser = props => {
    const {
        label,
        customer,
        estimateShippingDate,
        tabsInDeliveryOrderStatusUser,
        tabsFinishOrderStatusUser,
        estimateAccepted,
        logOrderTransactions
    } = props;


    let styleEstimateaAccepted = {
        color: "#BBBBBB",
        fontSize: 16,
        textAlign: "right",
        fontWeight: 500
    }

    const responseOrderLogTransactions = sortList(logOrderTransactions, "DESC")

    function sortList(list, order) {
        if (order === "ASC") {
            return list.sort((a, b) => {
                return parseFloat(a.createdDate) - parseFloat(b.createdDate);
            })
        }
        else {
            return list.sort((a, b) => {
                return parseFloat(b.createdDate) - parseFloat(a.createdDate);
            });
        }
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
                                {((tabsInDeliveryOrderStatusUser === 3) || (tabsFinishOrderStatusUser === 4)) &&
                                    (<p style={styleEstimateaAccepted}>
                                        {estimateAccepted} : &nbsp;
                                {convertTimesTime.millisecond(estimateShippingDate && estimateShippingDate.receivedDate)}
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
                                    <p className="nameCustomerText">
                                        {customer.fullAddress},&nbsp;{customer.city},&nbsp;
                                        {customer.subdistrict},&nbsp;{customer.province},&nbsp;{customer.zipcode}
                                    </p>
                                </div>
                            </Col>
                            <Col md={15}>
                                <div className="wrapperRight">
                                    {responseOrderLogTransactions.map((log,index) => {
                                        return (
                                            <Row key={index}>
                                                <Col md={24}>
                                                    <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 10 }}>
                                                        <span className="dot" />
                                                        <p className="dateTransaction" style={{ textAlign: "left" }}>
                                                            {convertTimesTime.millisecond(log.createdDate)}&nbsp;{log.description}
                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>}
        </React.Fragment>
    );
};

export default OrderStatusUser;