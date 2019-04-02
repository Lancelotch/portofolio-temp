import React, { Component, Fragment } from "react";
import withApiMethod from "../../hoc/withApiMethod";
import { PATH_CUSTOMER } from "../../api/path";

class ExamplePage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { data,response } = this.props;
    const request = {
      labelName: "Rumah",
      receiverName: "Moh Ashari Muklis",
      phoneNumber: "085695492320",
      city: "Cikarang",
      fullAddress: "Perum Sukaraya Indah Blok c 14 no 2A rt -5 rw 07 kelurahan Sukaraya Kecamatan Karang Bahagia Bekasi",
      province:"Jawa Barat",
      provinceId:"3",
      cityId:"4",
      zipcode:"17530",
      geolocation: {
        longitude: -6.219201,
        latitude: 107.172443
      },
      isDefault: true
    }
   
    console.log(response);

    return (
      <Fragment>
        <p>Example</p>
        <p>{this.props.data}</p>
        <button onClick={()=>this.props.doGet(PATH_CUSTOMER.ADDRESS, null)}>Get Address</button>
      </Fragment>
    );
  }
}

export default withApiMethod(ExamplePage);
