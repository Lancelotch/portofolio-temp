import React from 'react';
import { Tooltip, Col } from "antd";
import "./Variant.css";


const VariantText = (props) => {
    return (
        <React.Fragment>
                <div className={props.isSelected ? "box-variant-text active" : "box-variant-text"} >
                    <Tooltip title={props.description}>
                        <p onClick={() => props.onClick(props.id, props.value)}>{props.value.name}</p>
                    </Tooltip>
                </div>
            
        </React.Fragment>
    )
}

const VariantImage = (props) => {
    return (
        <React.Fragment>
                <div className={props.isSelected ?  "box-variant active" : "box-variant"} >
                    <img onClick={() => props.onClick(props.id, props.value)} className="variant_image" src={props.value.image.small} alt="" />
                </div>                        
        </React.Fragment>
    )
}

const Variant = (props) => {
    let selectedDescription = "";
    if(props.selectedVariant !== undefined) {
        selectedDescription = props.selectedVariant.value.description;
    }
    console.log("zzz", selectedDescription);

    const isShowLable = props.valueIndex === 0 ? true : false;
    return (
        <Col md={24}>
            <div className="variant">
                {props.value.image ?
                    <VariantImage {...props} /> :
                    <VariantText {...props} />
                }
            </div>
        </Col>
    );
};

export default Variant;