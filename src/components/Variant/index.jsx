import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";
import strings from "../../localization/localization";

const VariantText = (props) => {
    console.log('log props text', props.name);

    let { selectedText, infoStockEmpty } =
    {
        selectedText: props.selectedText,
        infoStockEmpty: props.sku.stock
    }
    if (!selectedText) {
        const variantText = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selectedText = variantText && variantText.value
        variantText && props.onClick('selectedText', selectedText.id, selectedText)
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
                    <p>{strings.stock_empty}</p>
                    : value.description} key={value.id}>
                    <div onClick={infoStockEmpty === 0 ? null : (() => props.onClick('selectedText', props.id, value))}
                        style={infoStockEmpty === 0 ? disabled : null} className={props.selectedText &&
                            (selectedText.id === value.id ? "box-variant active" : "box-variant")}>
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
        const variantImage = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selected = variantImage && variantImage.value
        variantImage && props.onClick('selected', selected.id, selected)
        console.log('ini variant', variantImage);
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
                <div key={value.id} onClick={() => props.onClick(props.id, value.id, props.name)} className={props.selected && (props.selected.id === value.id ? "box-variant active" : "box-variant")} >
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
                {props.values[props.index].image ? <VariantImage {...props} /> :
                    <VariantText {...props} />
                }
            </div>
        </Col>
    );
};

export default Variant;