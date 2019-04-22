import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";

const VariantText = (props) => {
    let selectedSize = props.selectedSize
    if (!selectedSize) {
        const variantSize = props.sku.variants.filter(variant => variant.variantName === 'ukuran')[0]
        selectedSize = variantSize && variantSize.value
        variantSize && props.onClickSize(selectedSize.id, selectedSize)
    };
    return (
        <React.Fragment>
            <p>{props.name.charAt(0).toUpperCase() + props.name.substring(1)}</p>
            {props.values.map(value => (
                <Tooltip title={value.description}>
                <div onClick={() => props.onClickSize(props.id, value)} key={value.id} className={props.selectedSize && (selectedSize.id === value.id ? "box-variant-text active" : "box-variant-text")}>
                    <p>{value.name}</p>
                </div>
                </Tooltip>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    let selected = props.selected
    console.log("=====", selected)
    if (!selected) {
        const variantWarna = props.sku.variants.filter(variant => variant.variantName === 'warna')[0]
        selected = variantWarna && variantWarna.value
        variantWarna && props.onClick(selected.id, selected)
    }

    return (
        <React.Fragment>
            {props.sku.variants[0] && (
                <p>{props.name.charAt(0).toUpperCase() + props.name.substring(1)}: {selected.name}</p>
            )}
            {props.values.map(value => (
                <div onClick={() => props.onClick(props.id, value)} className={props.selected && (props.selected.id === value.id ? "box-variant active" : "box-variant")} >
                    <img className="variant_image" src={value.image.small} key={value.id} alt="" />
                </div>
            ))
            }
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