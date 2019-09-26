import React from 'react';
import { Row, Col } from 'antd';
import variantItems from '../../library/variantItems';
import strings from '../../localization/localization';

function ReviewCardInfoDetail(props) {
    const { image, name, informations } = props.order.productSnapshot
    return (
        <Row>
            <Col md={2}>
                <img
                    className="product-order__image"
                    src={image.defaultImage}
                    alt=""
                />
            </Col>
            <Col md={19}>
                <div className="product-order__variant">
                    <h3> {name}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ width: 70 }}>
                                    <p>
                                        {strings.varian}
                                    </p>
                                </td>
                                <td style={{ width: 30 }}>
                                    <p>
                                        :
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        {variantItems(informations)}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    );
};

export default ReviewCardInfoDetail;