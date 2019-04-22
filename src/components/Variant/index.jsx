import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";
import { select } from '@redux-saga/core/effects';

const VariantText = (props) => {
    let selectedSize = props.selectedSize
    if(!selectedSize){
        // console.log("==========================props sku", props.sku.variants)
        const variantSize = props.sku.variants.filter( variant => variant.variantName === 'ukuran')[0]
       
        selectedSize = variantSize && variantSize.value
        variantSize && props.onClickSize(selectedSize.id, selectedSize)
    };
    return (
        <React.Fragment>
            {props.values.map(value => (
                <div className={props.selectedSize && (selectedSize.id === value.id ? "box-variant-text active" : "box-variant-text")}>
                    <p onClick={() => props.onClick(props.id, value)} key={value.id}>{value.name}</p>
                </div>
            ))}
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    let selected = props.selected
    if(!selected){
        const variantWarna = props.sku.variants.filter( variant => variant.variantName === 'warna')[0]
        selected = variantWarna && variantWarna.value
        variantWarna && props.onClick(selected.id, selected)
    }
    props.values.map(value => {
        value.selected = false
    })

    return (
        <React.Fragment>
            {props.sku.variants[0] && (
                <p>Warna: {selected.name}</p>
            )}
            {props.values.map(value => (
                    <div className={props.selected && (value.selected? "box-variant active" : "box-variant")} >
      
                        <img onClick={() => props.onClick(props.id, value)} className="variant_image" src={value.image.small} key={value.id} alt="" />
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