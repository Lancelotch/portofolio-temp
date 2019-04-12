import React from 'react';
import { Tooltip } from "antd";

const VariantText = (props) => {
    return (
        <div>
            {props.values.map(value => (
                <p onClick={() => props.onClick(props.id,value.id)} key={value.id}>{value.description}</p>
            ))}
        </div>
    )
}

const VariantImage = (props) => {
    return (
        <div>
            {props.values.map(value => (
                <img onClick={() => props.onClick(props.id,value.id)} src={value.image.small} key={value.id} alt="" />
            ))}
        </div>
    )
}

const Variant = (props) => {
    return (
        <div>
            {props.values[props.index].image ?
                <VariantImage {...props} onClick={props.onClick} /> :
                <VariantText {...props} />}
        </div>
    );
};

export default Variant;