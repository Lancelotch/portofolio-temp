import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";
import { select } from '@redux-saga/core/effects';

const checkVariant = (variantId, valueid, selectedId) => {
    const id = variantId + valueid
    var check = function(element) {
        return element === id
    }
    let statusSelected = selectedId.some(check)
    return statusSelected
}

const VariantText = (props) => {
    let selected = props.selected
    if(!selected){
        const variantSize = props.sku.variants.filter( variant => variant.variantName === props.name)[0]    
        selected = variantSize && variantSize.value
        variantSize && props.onClick(selected.id, selected, props.name)
    };
    return (
        <React.Fragment>
            {props.values.map(value => (
                <div className={props.selected && (checkVariant(props.id,value.id,selected)  ? "box-variant active" : "box-variant")}>
                    <p onClick={() => props.onClick(props.id, value,props.name)} key={value.id}>{value.name}</p>
                </div>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    let selected = props.selected    
    if(!selected){
        const variantWarna = props.sku.variants.filter( variant => variant.variantName === props.name)[0]
        selected = variantWarna && variantWarna.value
        variantWarna && props.onClick(selected.id, selected, props.name)
    }
    console.log("ini selected brother",selected)
    // checkVariant("1","2",["3"])
    return (
        
        <React.Fragment>
   
            {props.sku.variants[0] && (
                <p>{props.name}: {selected.description}</p>
            )}
            {props.values.map(value => ( 
                    <div className={props.selected && (checkVariant(props.id,value.id,selected) ? "box-variant active" : "box-variant")} >
                        <img onClick={() => props.onClick(props.id, value, props.name)} className="variant_image" src={value.image.small} key={value.id} alt="" />
                    </div>
                ))
            }
        </React.Fragment>
    )
}

const Variant = (props) => {    
    return (
        <Col md={24}>
            <p>{props.name} : </p>
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