import React, { Component } from "react";
import PropTypes from "prop-types";
import strings from "../../config/localization";
import { Select } from "antd";
const Option = Select.Option

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
      <Option key={index} value={courier.serviceCode}>
        {courier.courierCode +
          " - " +
          courier.serviceName +
          " (" +
          courier.estimation +
          ")"}
      </Option>
    ));
  };
  render() {
    return (
      <React.Fragment>
        <h4>
          {strings.delivery_courier}
        </h4>
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
