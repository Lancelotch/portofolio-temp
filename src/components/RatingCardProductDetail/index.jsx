import React from 'react';
import { Card, Row, Col, Rate, Progress } from 'antd';
import "./style.sass";

function RatingCardProductDetail(props) {
    const starProgress = [
        {
            star: 5,
            progress: 90
        },
        {
            star: 4,
            progress: 80
        },
        {
            star: 3,
            progress: 70
        },
        {
            star: 2,
            progress: 60
        },
        {
            star: 1,
            progress: 50
        }
    ]

    return (
        <Card>
            <Row>
                <Col md={19} offset={5}>
                    <div className="mp-rating-card-product-detail">
                        <Col md={6}>
                            <div className="mp-rating-card-product-detail__wrapper-number-review">
                                <span className="mp-rating-card-product-detail__number-review-wrapper">
                                    <strong className="mp-rating-card-product-detail__number-review">
                                        4.8
                                    </strong>
                                    / 5
                                </span>
                                <Rate disabled value={4} />
                                <p>816 Ulasan</p>
                            </div>
                        </Col>
                        <Col md={18}>
                            {starProgress.map(star => {
                                return (
                                    <React.Fragment>
                                        <div className="mp-rating-card-product-detail__progress">
                                            <span>
                                                {star.star}
                                            </span>
                                            <Rate disabled defaultValue={1} count={1} />
                                            <Progress percent={star.progress} />
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </Col>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default RatingCardProductDetail;