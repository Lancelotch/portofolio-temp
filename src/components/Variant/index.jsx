import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.sass";
import strings from "../../localization/localization.js"


const checkVariant = (variantId, valueid, selectedId) => {
    const id = variantId + valueid
    var check = function (element) {
        return element === id
    }
    let statusSelected = selectedId.some(check)
    return statusSelected
}

// const stockInfo = (props, infoStockEmpty, value, selected) => {
//     return props.selected && infoStockEmpty === 0 && checkVariant(props.id, value.id, selected);
// }

const VariantText = (props) => {
    let { /*infoStockEmpty,*/ selected } =
    {
        selected: props.selected,
        // infoStockEmpty: props.sku.stock,
    }
    if (!selected) {
        const variantSize = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selected = variantSize && variantSize.value
        variantSize && props.onClick(selected.id, selected)
    };
    // let disabled = {
    //     border: "1px solid #eee",
    //     backgroundColor: "#bdc3c7"
    // }
    return (
        <React.Fragment>
            <p>{props.name.charAt(0).toUpperCase() + props.name.substring(1)}</p>
            {props.values.map(value => (
               /* <Tooltip title={strings.stock_empty} visible={stockInfo(props, infoStockEmpty, value, selected)} key={value.id}>*/
                    <div onClick={/*stockInfo(props, infoStockEmpty, value, selected) ? null :*/
                        (() => props.onClick(props.id, value, props.name))}
                        key={value.id}
                        // style={stockInfo(props, infoStockEmpty, value, selected) ? disabled : null}
                        className={props.selected && (checkVariant(props.id, value.id, selected) ?
                            "box-variant-text active" : "box-variant-text")}>
                        <span>{value.name}</span>
                    </div>
                // </Tooltip>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    let selected = props.selected
    if (!selected) {
        const variantWarna = props.sku.variants.filter(variant => variant.variantName === props.name)[0]
        selected = variantWarna && variantWarna.value
        variantWarna && props.onClick(selected.id, selected)
    }
    return (
        <React.Fragment>
            {props.sku.variants[0] && (
                <p>{props.name.charAt(0).toUpperCase() + props.name.substring(1)} :
                &nbsp;
                {props.sku.variants[0].value.description.charAt(0).toUpperCase() +
                        props.sku.variants[0].value.description.substring(1)}</p>
            )}
            {props.values.map(value => (
                <div onClick={() => props.onClick(props.id, value, props.name, true)} key={value.id} className={props.selected && (checkVariant(props.id, value.id, selected) ? "box-variant active" : "box-variant")} >
                    <img className="variant_image" src={value.image.small} alt="" />
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
                {props.values[props.index].image ? <VariantImage {...props} /> :
                    <VariantText {...props} />
                }
            </div>
        </Col>
    );
};

export default Variant;


