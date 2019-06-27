import React from "react";
import { Col } from "antd";
import "./Variant.sass";


const checkVariant = (variantId, valueid, selectedId) => {
    const id = variantId + valueid;
    var check = function (element) {
        return element === id;
    };
    let statusSelected = selectedId.some(check);
    return statusSelected;
};


const VariantText = props => {
    let { /*infoStockEmpty,*/ selected } = {
        selected: props.selected
    }
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
                <div
                    onClick={
                        /*stockInfo(props, infoStockEmpty, value, selected) ? null :*/
                        () => props.onClick(props.id)
                    }
                    key={value.id}
                    // style={stockInfo(props, infoStockEmpty, value, selected) ? disabled : null}
                    className={
                        props.selected &&
                            checkVariant(props.id, value.id, props.selected)
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
    let selected = props.selected;
    if (!selected) {
        const variantWarna = props.variantItems.filter(
            variant => variant.variantName === props.name
        )[0];
        selected = variantWarna && variantWarna.value;
        variantWarna && props.onClick(selected.id, selected);
    }
    return (
        <React.Fragment>
            Warna
    {props.variantItems.map(value => (
                <div onClick={() => props.onClick(props.id)}
                    key={value.id}
                    className={
                        props.selected &&
                            checkVariant(props.id, value.id, selected)
                            ? "box-variant active"
                            : "box-variant"
                    }
                >
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
