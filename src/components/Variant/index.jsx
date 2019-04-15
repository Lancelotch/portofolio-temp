import React from 'react';
import { Tooltip } from "antd";
import "./Variant.sass";


const VariantText = (props) => {
    return (
        <div>
            {props.values.map(value => (
                <p onClick={() => props.onClick(props.id, value)} key={value.id}>{value.description}</p>
            ))}
        </div>
    )
}

const VariantImage = (props) => {
    return (
        <div>
            {props.values.map(value => (
                <img onClick={() => props.onClick(props.id, value)} src={value.image.small} key={value.id} alt="" />
            ))}
        </div>
    )
}

const Variant = (props) => {
    return (
        <div className="variant">    
            {props.values[props.index].image ?
            <VariantImage {...props} /> :
            <VariantText {...props} />}
        </div>
    );
};

export default Variant;