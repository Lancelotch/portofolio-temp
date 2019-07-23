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
        tabsInDelivery,
        tabsFinish,
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
                <div className="orderStatusUser">
                    <Card>
                        <Row>
                            <Col md={12}>
                                <h2>{label}</h2>
                            </Col>
                            <Col md={12}>
                                {((tabsInDelivery === 3) || (tabsFinish === 4)) &&
                                    (<p style={styleEstimateaAccepted}>
                                        {estimateAccepted} : &nbsp;
                                {convertTimesTime.millisecond(estimateShippingDate && estimateShippingDate.receivedDate)}
                                    </p>)
                                }
                            </Col>
                        </Row>
                        <hr className="productOrder__inline" />
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="borderRight">
                                            <label className="nameCustomer">{customer.receiverName}</label>
                                            <p className="nameCustomerText"
                                                style={{ marginBottom: 7 }}>
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
                                    </td>
                                    <td>
                                        <div className="wrapperRight">
                                            {responseOrderLogTransactions.map((log, index) => {
                                                let styleLog = index === 0 ? "parentDateTransaction dateTransaction logEnable" : "parentDateTransaction dateTransaction logDisabled"
                                                return (
                                                    <div key={index} className={styleLog}>
                                                        <span className="dot" />
                                                        <p key={index} className={styleLog} style={{ textAlign: "left" }}>
                                                            {convertTimesTime.millisecond(log.createdDate)}&nbsp;{log.description}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>}
        </React.Fragment>
    );
};

export default OrderStatusUser;