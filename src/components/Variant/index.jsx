import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";

const VariantText = (props) => {
    console.log('log props text', props.name);

    let { selectedSize, infoStockEmpty } =
    {
        selectedSize: props.selectedSize,
        infoStockEmpty: props.sku.stock
    }
    if (!selectedSize) {
        const variantSize = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selectedSize = variantSize && variantSize.value
        variantSize && props.onClick('selectedSize', selectedSize.id, selectedSize)
    };
    let disabled = {
        border: "1px solid #eee",
        backgroundColor: "#bdc3c7"
    }
    console.log('props on kliiiik', props.onClick);
    return (
        <React.Fragment>
            <p>{props.name.charAt(0).toUpperCase() + props.name.substring(1)}</p>
            {props.values.map(value => (
                <Tooltip title={infoStockEmpty === 0 ?
                    <p>Stock Kosong</p>
                    :
                    value.description}
                    key={value.id}
                >
                    <div onClick={infoStockEmpty === 0 ? null
                        : (() => props.onClick('selectedSize', props.id, value))}
                        style={infoStockEmpty === 0 ? disabled : null}
                        className={props.selectedSize &&
                            (selectedSize.id === value.id ?
                                "box-variant-text active"
                                :
                                "box-variant-text")}>
                        <p>{value.name}</p>
                    </div>
                </Tooltip>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    console.log('log props warna', props.name);
    let selected = props.selected
    console.log("=====", selected)
    if (!selected) {
        const variantWarna = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selected = variantWarna && variantWarna.value
        variantWarna && props.onClick(props.name, selected.id, selected)
        console.log('ini variant', variantWarna);
    }
    return (
        <React.Fragment>
            {selected && (
                <p>{props.name.charAt(0).toUpperCase()
                    + props.name.substring(1)} : {selected.name.charAt(0).toUpperCase()
                    + selected.name.substring(1)}
                </p>
            )}
            {props.values.map(value => (
                <div onClick={() => props.onClick(props.name, props.id, value)} key={value.id} className={props.selected && (props.selected.id === value.id ? "box-variant active" : "box-variant")} >
                    <img className="variant_image" src={value.image.small} alt="" />
                </div>
            ))}
        </React.Fragment>
    )
}

const Variant = (props) => {
    console.log('variaaaaaaaaaants', props);
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