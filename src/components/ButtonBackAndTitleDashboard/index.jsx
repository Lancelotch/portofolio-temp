import React from 'react';
import { Icon } from 'antd';
import Button from '../Button';
import "./style.sass";
import strings from '../../localization/localization';

function ButtonBackAndTitleDashboard(props) {
    return (
        <div className="mp-button-back-dashboard">
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <Button onClick={() => props.setIsShowDetailDashboard()}>
                    <Icon type="arrow-left" /> &nbsp;{strings.back}
            </Button>
            </div>
        </div>
    );
};

export default ButtonBackAndTitleDashboard;