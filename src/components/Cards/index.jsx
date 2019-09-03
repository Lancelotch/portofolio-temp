import React from 'react';
import { Card as CardAnt } from 'antd';
import ButtonPlay from '../ButtonPlay';
import classNames from 'classnames';
import style from "./style.sass";
import PropTypes from "prop-types";

export default function Cards(props) {

    const classNamesStyle = classNames.bind(style)

    const cssClassesWrapper = classNamesStyle({
        'mp-hover-box-popular': (props.type === 'popular'),
        'mp-hover-box-best': (props.type === 'bestSeller'),
        'mp-hover-box-recommend': (props.type === 'recommend'),
        'mp-hover-box-default': (props.type === 'default'),
        'mp-border-actived': (props.border === 'active')

    });

    const titleCard = classNamesStyle({
        'mp-cards-title-popular': (props.type === 'popular'),
        'mp-cards-title-best': (props.type === 'bestSeller'),
        'mp-cards-title-recommend': (props.type === 'recommend'),
        'mp-cards-title-default':(props.type === 'default')
    });

    const priceCard = classNamesStyle({
        'mp-cards-price-popular': (props.type === 'popular'),
        'mp-cards-price-best': (props.type === 'bestSeller' || props.type === 'recommend'),
        'mp-cards-price-default': (props.type === 'default')
    });

    return (
        <CardAnt
            bordered={false}
            className={cssClassesWrapper}
            cover={
                <div className="mp-card-image-cover">
                    <img alt="example" src={props.urlImage} className="mp-card-image" />
                    {props.playButton && <ButtonPlay type="thumbnail" />}
                </div>}>
            <div className="mp-card-info">
                <span className={`mp-card-title ${titleCard}`}>
                    {props.title}
                </span>
                <span className={priceCard}>{props.price} </span>
            </div>

        </CardAnt>
    );
};


Cards.propTypes = {
    type: PropTypes.oneOf(['popular', 'best', 'recommend']),
    border: PropTypes.oneOf(['active']),
    playButton: PropTypes.string,
    urlImage: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string
};

Cards.defaultProps = {
    type: 'default'
}