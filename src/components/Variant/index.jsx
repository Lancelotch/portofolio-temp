import React from "react";
import { Col, Tooltip } from "antd";
import "./Variant.sass";

const VariantText = props => {
    selectedDefaultVariant(props);
    return (
        <React.Fragment>
            <p className="title-text">
                {props.name}
            </p>
            {props.variantItems.map(value => (
                <div onClick={() => props.onClick(props.id, value, props.name)}
                    key={value.id}
                    className={
                        `box-variant-text 
                        ${setActiveIndicator(props.selected, props.name, value.id)}`
                    }
                >
                    <span>{value.name}</span>
                </div>
            ))}
        </React.Fragment>
    );
};

const setActiveIndicator = (selected, name, id) => {
    if (selected.length > 0) {
        const isActive = selected.filter(variants => {
            return variants.variantItem.id === id
        }).length > 0

        if (isActive) {
            return "active";
        }
    }
    return;
}



const VariantImage = props => {
    selectedDefaultVariant(props);
    return (
        <React.Fragment>
            <p className="title-text">
                {props.name}
            </p>
            {props.variantItems.map(value => (
                <Tooltip title={value.name} key={value.id}>
                    <div onClick={() => props.onClick(props.id, value, props.name)}
                        key={value.id}
                        className={value.image === undefined ? `box-variant-text 
                    ${setActiveIndicator(props.selected, props.name, value.id)}`
                            :
                            `box-variant ${setActiveIndicator(props.selected, props.name, value.id)}`}>
                        {console.log('awlselected', props.selected)}
                        {value.image === undefined ? <span>{value.name}</span> :
                            <img className="variant_image" src={value.image.smallUrl} alt="" />
                        }
                    </div>
                </Tooltip>
            ))}
        </React.Fragment>
    );
};

const Variant = props => {
    return (
 
            <div className="variant">
                {props.name === "Warna" ? (
                    <VariantImage {...props} />
                ) : (
                        <VariantText {...props} />
                    )}
            </div>

      
    );
};

export default Variant;

function selectedDefaultVariant(props) {
    let isRegisteredVariant = props.selected.filter(variant => variant.name === props.name).length > 0;
    if (!isRegisteredVariant) {
        const SelectedDefaultVariant = props.variantItems[0];
        SelectedDefaultVariant && props.onClick(props.id, SelectedDefaultVariant, props.name);
    }
}

