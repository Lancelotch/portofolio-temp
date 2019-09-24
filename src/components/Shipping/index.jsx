import React, { useState, useEffect } from "react";
import Shippings from "./Shippings";
import dummyShipping from "../../dummy/dummyShipping";
import strings from "../../localization/localization";

export default function Shipping(props) {
  const [shipping, setShipping] = useState([])
  const provinceData = ['Jakarta', 'Surabaya', 'MaduraDummy'];
  const cityData = {
    Jakarta: [props.totalShipping],
    Surabaya: [props.totalShipping],
    MaduraDummy: ['33000']
  };
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [cityPrice, setCityPrice] = useState(cityData[provinceData[0]][0]);

  function handleProvinceChange(value) {
    setCities(cityData[value])
    setCityPrice(cityData[value][0])
  };


  useEffect(() => {
    const res = dummyShipping;
    setShipping(res.data)
    setCityPrice(props.totalShipping)
  }, [props.totalShipping])


  return (
    <React.Fragment>
      <span className="mp-shipping-from-to-shipping">
        {strings.shipping_form}
        <b className="mp-shipping-from-to-shipping__china">
          {strings.china}
        </b>
      </span>
      <Shippings
        provinceData={provinceData}
        handleProvinceChange={handleProvinceChange}
        cityPrice={cityPrice}
        totalShipping={props.totalShipping}
        shipping={shipping}
      />
    </React.Fragment>
  );
}

