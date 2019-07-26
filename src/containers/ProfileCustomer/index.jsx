import React, { Component } from "react";
import { apiGetWithToken, apiPutWithToken } from "../../api/services";
import { PATH_CUSTOMER } from "../../api/path";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileEdit from "../../components/ProfileEdit";

class ProfileCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerEmail: "",
      imageUrl: "",
      allData: {},
      disabled: true
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.CUSTOMER);
      const name = response.data.data.name;
      const email = response.data.data.email;
      const imageUrl = response.data.data.photoUrl;
      console.log(response);
      this.setState({
        customerName: name,
        customerEmail: email,
        imageUrl: imageUrl
      });
      if (imageUrl) {
        this.setState({ disabled: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = response => {
    console.log("onChange", response.file.status);
    if (response.file.status === "done") {
      this.setState({
        imageUrl: response.file.response.smallUrl,
        disabled: false
      });
    }
  };

  removeImage = () => {
    this.setState({ imageUrl: "", disabled: true });
  };

  handleSubmit = async () => {
    try {
      const file = await apiPutWithToken(
        PATH_CUSTOMER.CUSTOMER,
        this.state.allData
      );
      console.log("lah", file);
    } catch (err) {
      console.log("err");
    }
  };

  handleChangeName = e => {
    e.preventDefault();
    console.log("e", e);
    const data = {};
    data.email = this.state.customerEmail;
    data.name = e.target.value;
    data.photoUrl = this.state.imageUrl;
    console.log("jadi", data);
    this.setState({ allData: data });
  };

  render() {
    const {
      customerName,
      customerEmail,
      imageUrl,
      allData,
      disabled
    } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderRadius: 4,
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.11)"
        }}
      >
        <div>
          <ProfileAvatar
            imageUrl={imageUrl}
            handleChange={this.handleChange}
            removeImage={this.removeImage}
            disabled={disabled}
          />
        </div>
        <div>
          <ProfileEdit
            customerName={customerName}
            customerEmail={customerEmail}
            allData={allData}
            handleSubmit={this.handleSubmit}
            handleChangeName={this.handleChangeName}
          />
        </div>
      </div>
    );
  }
}

export default ProfileCustomer;
