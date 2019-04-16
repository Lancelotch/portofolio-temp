import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";


const VariantText = (props) => {
    return (
        <React.Fragment>
            <p>Ukuran</p>
            {props.values.map(value => (
                <div className={props.selected && (props.selected.id === value.id ? "box-variant-text active" : "box-variant-text")} style={{ display: "unset" }}>
                    <p onClick={() => props.onClick(props.id, value)} key={value.id}>{value.name}</p>
                </div>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    console.log('product-sku-images', props.sku.variants[0]);
    console.log('sku----variants', props.sku.value)
    console.log('sku----values', props.selected)

    return (
        <React.Fragment>
            {props.sku.variants[0] && (
                <p>Warna: {props.sku.variants[0].value.description}</p>
            )}
            {props.values.map(value => {
                let selected = {...props.selectedSize}
                if (!selected) selected = value[0];
                return (

                    <div className={props.selectedSize && (props.selectedSize.id === value.id ? "box-variant active" : "box-variant")} style={{ display: "unset" }}>
                        {console.log('aaaaaavalue', value)}
                        <img onClick={() => props.onClickSize(props.id, value)} className="variant_image" src={value.image.small} key={value.id} alt="" />
                    </div>
                )
            })}
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