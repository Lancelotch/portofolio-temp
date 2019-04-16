import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.sass";


const VariantText = (props) => {
    return (
        <React.Fragment>
        <p>Ukuran</p>
            {props.values.map(value => (
                <div className={props.selected === value.id ? "variant_selected_active" : "variant_selected"} style={{ display: "unset" }}>
                    <p style={{ display: "unset", marginLeft: 10 }} onClick={() => props.onClick(props.id, value)} key={value.id}>{value.description}</p>
                </div>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    console.log('product-sku', props.selected);
    return (
        <React.Fragment>
        <p>Warna</p>
            {props.values.map(value => (
                <div className={props.selected !== value.id ? "variant_selected_active" : "variant_selected"} style={{ display: "unset" }}>
                    <img onClick={() => props.onClick(props.id, value)} className="variant_image" src={value.image.small} key={value.id} alt="" />
                </div>
            ))}
        </React.Fragment>
    )
}

const Variant = (props) => {
    return (
        <Col md={24}>
            <div className="variant">
                {props.values[props.index].image ?
                    <VariantImage {...props} /> :
                    <VariantText {...props} />
                }
            </div>
        </Col>
    );
};

export default Variant;