import React from "react";
import { Col } from "antd";
import "./Variant.sass";

const VariantText = props => {
    let selected = props.selected
    if (!selected) {
        const variantSize = props.variantItems.filter(
            variant => variant.variantName === props.name
        )[0];
        selected = variantSize && variantSize.value;
        variantSize && props.onClick(selected.id, selected);
    }
    return (
        <React.Fragment>
            Size
    {props.variantItems.map(value => (
                /* <Tooltip title={strings.stock_empty} visible={stockInfo(props, infoStockEmpty, value, selected)} key={value.id}>*/
                <div onClick={
                    /*stockInfo(props, infoStockEmpty, value, selected) ? null :*/
                    () => props.onClick(props.id, value, props.name)
                }
                    key={value.id}
                    // style={stockInfo(props, infoStockEmpty, value, selected) ? disabled : null}
                    className={
                        selected &&
                            (props.id, value.id)
                            ? "box-variant-text active"
                            : "box-variant-text"
                    }
                >
                    <span>{value.name}</span>
                </div>
                // </Tooltip>
            ))}
        </React.Fragment>
    );
};


const VariantImage = props => {
    return (
        <React.Fragment>
            Warna
           {props.variantItems.map(value => (
                <div onClick={() => props.onClick(props.id, value, props.name)}
                    key={value.id}
                    className={props.selected ===
                        props.id
                        ? "box-variant active"
                        : "box-variant"
                    }>
                    {console.log('awlselected', props.selected)}
                    {value.image === undefined ? <p>{value.name}</p> :
                        <img className="variant_image" src={value.image.smallUrl} alt="" />
                    }
                </div>
            ))}
        </React.Fragment>
    );
};

const Variant = props => {
    const variants = props.variantItems.sort((a, b) => a - b);
    return (
        <Col md={24}>
            <div className="variant">
                {props.name === "Warna" ? (
                    <VariantImage {...props} />
                ) : (
                        <VariantText {...props} />
                    )}
            </div>

        </Col>
    );
};

export default Variant;
