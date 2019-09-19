import React from 'react';
import "./style.sass";
import { Rate, Typography } from 'antd';
import convertTimesTime from '../../library/convertTimestime';

const { Text } = Typography

function LatestReview(props) {
    const { image, comment, star, username, imageUser, date } = props.dummy
    return (
        <div className="mp-latest-review">
            <span>
                <img src={imageUser} alt="" className="mp-latest-review__profil-image-user" />
                &nbsp;
                <Rate defaultValue={star} />
            </span>
            <br />
            <div className="mp-latest-review__content">
                <Text disabled> Di ulas oleh
            <b>
                        {username}
            </b>pada &nbsp;
            {convertTimesTime.millisecondnohours(date)}
                </Text>
                <p>{comment}</p>
                <img src={image} alt="" className="mp-latest-review__product-image-order-user" />
            </div>
        </div>
    );
};

export default LatestReview;