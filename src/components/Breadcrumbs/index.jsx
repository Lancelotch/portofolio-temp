import React from 'react';
import { Breadcrumb } from "antd";
import "./style.sass";
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import strings from '../../localization/localization';

export default function Breadcrumbs(props) {
    const breadcrumbs = props.breadcrumbs
    const type = props.type
    return (
        <div style={{ marginTop: 30 }}>
            <Breadcrumb separator=">" className="mp-breadcrumbs">
                <Breadcrumb.Item key="home">
                    <Link to="/">{strings.monggoPesen}</Link>
                </Breadcrumb.Item>
                {breadcrumbs.map((breadcrumb, index) => {
                    let checkLast = index === breadcrumbs.length - 1 ? true : false
                    return (
                        <Breadcrumb.Item key={index}>
                            {checkLast && type === "product" ?
                                <Breadcrumb.Item>
                                    {breadcrumb.label}
                                </Breadcrumb.Item>
                                :
                                <Link to={breadcrumb.link} className="mp-breadcrumbs-actived">
                                    {breadcrumb.label}
                                </Link>                                 
                            }
                        </Breadcrumb.Item>
                    )
                })}

            </Breadcrumb>
        </div>
    );
};

Breadcrumbs.propTypes = {
    type: propTypes.oneOf(['default', 'product']),
    breadcrumb: propTypes.arrayOf(Object)
}

Breadcrumbs.defaultProps = {
    type: 'default'
}
