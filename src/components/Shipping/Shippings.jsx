import React from "react";
import { Row, Col, Select, Typography } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";
import PropTypes from "prop-types";
import strings from "../../localization/localization";

const { Option } = Select;
const { Text } = Typography

const Shippings = props => {
  const { shipping, provinceData, handleProvinceChange, cityPrice } = props;
  return (
    <React.Fragment>
      {shipping && shipping.length > 0 ? (
          <div className="mp-shipping">
            <Row>
              <Col md={10} className="mp-shipping__content">
                <Text>{strings.shipping_send_to}</Text>
                <Select
                  defaultValue={provinceData[0]}
                  style={{ width: '100%' }}
                  onChange={handleProvinceChange}>
                  {provinceData.map(province => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
              </Col>
              <Col md={10} offset={1} className="mp-shipping__content">
                <Text>{strings.shipping_estimated_shipping_costs}</Text>
                <span className="mp-shipping__price">{currencyRupiah(cityPrice)}</span>
              </Col>
            </Row>
          </div>
      ) : null}
    </React.Fragment>
  );
};

Shippings.propTypes = {
  estimation: PropTypes.string,
  price: PropTypes.string
};

export default Shippings;
