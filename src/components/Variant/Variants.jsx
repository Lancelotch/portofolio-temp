import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Variant from ".";

class Variants extends Component {
  constructor(props) {
    super(props);
    let selected = this.variantDefault();
    this.state = {
      index: this.props.index,
      name: this.props.name,
      values: this.props.values,
      id: this.props.id,
      changed: this.props.changed,
      warnaId: this.props.warnaId,
      ukranId: this.props.ukranId,
      sku: this.props.sku,
      variantSelected: selected
    };
    let sku = this.props.sku;
    this.stockInfo = {};
    for (let j = 0; j < sku.length; j++) {
      this.stockInfo[sku[j].id] = sku[j].stock;
      console.log(sku[j].stock);
    }
    this.variantsRef = []
    for(let i = 0; i < this.state.values.length; i++)
      this.variantsRef[i] = React.createRef()
  }

  changedInfo = (warnaId, ukranId) => {
    console.log(warnaId);
    console.log(ukranId);
    this.setState({
      warnaId: warnaId,
      ukranId: ukranId,
    });
    // for (let i = 0; i < this.state.values.length; i++) {
    //   this.stockInfo[idWarna + this.warnaId + idWarna + this.ukranId]
    // }
  }

  componentDidMount() {
    console.log(this.state.warnaId);
  }

  onChangeVariant = selected => {
    this.setState(
    { 
      variantSelected: selected, 
      selectedValue: selected.description
    },
    () => {
        let variant = {
          name: this.state.name,
          index: this.state.index,
          id: this.state.id,
          value: this.state.variantSelected
        };
        this.props.onChangeVariant(variant);
      }
    );
  };

  loopVariantProduct = () => {
    let idUkuran = "002";
    let idWarna = "001"; 
    console.log(this.stockInfo);
    console.log(this.stockInfo);
    if(this.state.index === 1) {    
        return this.state.values.map((value,index) => (
          <Variant
            key={value.id}
            id={value.id}
            ref={this.variantsRef[index]}
            image={value.image}
            name={value.name}
            onChangeVariant={this.onChangeVariant}
            disabled={
              this.stockInfo[idWarna + this.state.warnaId + idUkuran + value.id]
            }
            selected={
              ((this.state.variantSelected.id === value.id && 
                this.props.changed === 0 ) || 
              (this.props.changed === 1 && index === 0))
                ? true
              : false
            }
          />
        ));
      
    } else {
      return this.state.values.map((value, index) => (
        <Variant
          key={value.id}
          id={value.id}
          ref={this.variantsRef[index]}
          image={value.image}
          name={value.name}
          onChangeVariant={this.onChangeVariant}
          description={value.description}
          disabled={"1"}
          selected={
          (this.state.variantSelected.id === value.id )
              ? true
              : false
          }
        />
      ));
    }
  };

  variantDefault() {
    let selected = [];
    let i = 0;
    if (this.props.index === 0) {  
      for (i = 0; i < this.props.values.length; i++) {
        if (this.props.values[i].id === this.props.warnaId) {
          selected = this.props.values[i];
        }
      }
    }
    if (this.props.index === 1) {
      for (i = 0; i < this.props.values.length; i++) {
        if (this.props.values[i].id === this.props.ukranId) {
          selected = this.props.values[i];
        }
      }
    }
    return selected;
  };

  render() {
    console.log(this.state.warnaId);
    console.log(this.state.ukranId);
    return (
        <Row>
          <Col md={24}>
            <p style={{ fontSize: 14 }}>
              {this.state.name}&nbsp;
              <font style={{fontWeight: 600}}>{
                this.state.selectedValue}</font>
            </p>
            {this.loopVariantProduct()}
          </Col>
        </Row>
    );
  }
}
Variants.propTypes = {
  name: PropTypes.string,
  value: PropTypes.arrayOf(Object),
  id: PropTypes.string,
  ukranId: PropTypes.string,
  warnaId: PropTypes.string,
  sku: PropTypes.arrayOf(Object)
};

export default Variants;