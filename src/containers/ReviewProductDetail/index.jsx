import React from 'react';
import RatingCardProductDetail from '../../components/RatingCardProductDetail';
import "./style.sass";
import FilterReviewProductDetail from '../../components/FilterReviewProductDetail';
import { Row, Col, Pagination } from 'antd';
import LatestReview from '../../components/LatestReview';
import dummyReviewCommendProductDetail from "../../dummy/dummyReviewCommendProductDetail.json"
import strings from '../../localization/localization';

const dummyReview = dummyReviewCommendProductDetail

function ReviewProductDetail(props) {
    return (
        <div className="mp-review-product-detail">
            <RatingCardProductDetail />
            <Row>
                <Col md={17} offset={3}>
                    <div className="mp-review-product-detail__filter">
                        <FilterReviewProductDetail />
                    </div>
                </Col>
            </Row>
            <h3>{strings.latest_review}</h3>
            {dummyReview.map(dummy => {
                return <LatestReview dummy={dummy} />
            })}
            <Pagination
                className="mp-pagination-review-product-detail"
                defaultCurrent={1}
                total={5} />
        </div>
    );
};

export default ReviewProductDetail;