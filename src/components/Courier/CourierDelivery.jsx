import React, { Component } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import strings from "../../config/localization";
import { Select } from "antd";

class CourierDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCode: "",
      couriers: this.props.couriers
    };
  }
  onChangeCourier = serviceCode => {
    this.setState(
      {
        serviceCode
      },
      () => {
        this.props.onChangeCourier(this.state.serviceCode);
      }
    );
  };
  listCouriers = () => {
    return this.state.couriers[0].map((courier, index) => (
      <MenuItem key={index} value={courier.serviceCode}>
        {courier.courierCode +
          " - " +
          courier.serviceName +
          " (" +
          courier.estimation +
          ")"}
      </MenuItem>
    ));
  };
  render() {
    return (
      <React.Fragment>
        <InputLabel htmlFor="simple-select">
          {strings.delivery_courier}
        </InputLabel>
        <Select
          value={this.state.serviceCode}
          onChange={this.onChangeCourier}
          name="serviceCode"
        >
          {this.listCouriers()}
        </Select>
      </React.Fragment>
    );
  }
}
CourierDelivery.propTypes = {
  couriers: PropTypes.arrayOf(Object)
};
export default CourierDelivery;
