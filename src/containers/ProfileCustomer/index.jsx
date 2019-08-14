import React, { Component } from "react";
import "./style.sass";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileEdit from "../../components/ProfileEdit";
import customer from "../../api/services/customer";
import { connect } from "react-redux";
import { customerNameEdit } from "../../store/actions/authentication";
import { Row, Col, notification, Card } from "antd";
import { apiPostWithToken } from "../../api/services";
import { PATH_CUSTOMER } from "../../api/path";

class ProfileCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: this.props.customerName,
      customerEmail: "",
      photoUrl: "",
      allData: {},
      isErrorDimension: false,
      isErrorFormat: false,
      isErrorSize: false,
      landscape: false,
      portrait: false,
      disabled: true
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const profile = await customer.customerDetail();
      this.setState({
        customerName: profile.data.name,
        customerEmail: profile.data.email,
        photoUrl: profile.data.photoUrl,
        allData: profile.data
      });
      if (profile.data.photoUrl) {
        const isDimention = await this.checkDimensionGet(profile.data.photoUrl);
        if (isDimention.height > isDimention.width) {
          this.setState({ portrait: true, landscape: false });
        }
        if (isDimention.height < isDimention.width) {
          this.setState({ portrait: false, landscape: true });
        }
        this.setState({ disabled: false, isErrorDimension: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  uploadImage = async ({ onError, onSuccess, file }) => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      const isDimension = await this.checkDimension(file);
      if (isDimension.height >= 450 && isDimension.width >= 450) {
        if (isDimension.height > isDimension.width) {
          this.setState({ portrait: true, landscape: false });
        } else if (isDimension.height < isDimension.width) {
          this.setState({ portrait: false, landscape: true });
        }
        const response = await apiPostWithToken(
          PATH_CUSTOMER.CUSTOMER_UPLOAD,
          formData
        );
        onSuccess(response.data.data);
      } else {
        this.setState({ isErrorDimension: true });
      }
    } catch (error) {
      onError(console.log(error));
    }
  };

  handleChangeImage = res => {
    console.log("onChange", res.file.status);
    if (res.file.status === "done") {
      this.setState({
        photoUrl: res.file.response.smallUrl,
        allData: {
          ...this.state.allData,
          photoUrl: res.file.response.smallUrl
        },
        disabled: false
      });
    }
  };

  checkDimensionGet = file => {
    return new Promise(resolve => {
      var image = new Image();
      image.src = file;
      image.onload = function() {
        let dimension = {};
        dimension.width = image.naturalWidth;
        dimension.height = image.naturalHeight;
        resolve(dimension);
      };
    });
  };

  checkDimension = file => {
    return new Promise(resolve => {
      let _URL = window.URL || window.webkitURL;
      var image = new Image();
      image.src = _URL.createObjectURL(file);
      image.onload = function() {
        let dimension = {};
        dimension.width = image.naturalWidth;
        dimension.height = image.naturalHeight;
        resolve(dimension);
      };
    });
  };

  removeImage = () => {
    this.setState({
      photoUrl: "",
      allData: {
        ...this.state.allData,
        photoUrl: ""
      },
      landscape: false,
      portrait: false,
      isErrorDimension: false,
      isErrorFormat: false,
      isErrorSize: false,
      disabled: true
    });
  };

  handleChangeName = e => {
    e.preventDefault();
    this.setState({
      allData: {
        ...this.state.allData,
        name: e.target.value
      }
    });
  };

  handleSubmit = async () => {
    try {
      await this.props.customerNameEdit(this.state.allData);
      this.openNotificationSuccess("success");
    } catch (error) {
      console.log(error);
    }
  };

  handleError = () => {
    this.setState({
      isErrorDimension: false,
      isErrorFormat: false,
      isErrorSize: false
    });
  };

  openNotificationSuccess = type => {
    notification[type]({
      message: "Berhasil Menyimpan Perubahan Data",
      duration: 2
    });
  };

  render() {
    const {
      customerName,
      customerEmail,
      photoUrl,
      landscape,
      portrait,
      isErrorDimension,
      isErrorFormat,
      isErrorSize,
      disabled
    } = this.state;

    const beforeUpload = file => {
      const isPng = file.type === "image/png";
      const isJpeg = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size <= 3145728;
      if (!isJPG && !isJpeg && !isPng) {
        this.setState({ isErrorFormat: !this.state.isErrorFormat });
      }
      if (!isLt2M) {
        this.setState({ isErrorSize: !this.state.isErrorSize });
      }
    };

    return (
      <Card title="Profil Pengguna" bodyStyle={{display:"flex"}}>
        <Row className="profile">
          <Col md={12}>
            <ProfileAvatar
              photoUrl={photoUrl}
              beforeUpload={beforeUpload}
              uploadImage={this.uploadImage}
              handleChangeImage={this.handleChangeImage}
              removeImage={this.removeImage}
              handleError={this.handleError}
              landscape={landscape}
              portrait={portrait}
              isErrorDimension={isErrorDimension}
              isErrorFormat={isErrorFormat}
              isErrorSize={isErrorSize}
              disabled={disabled}
            />
          </Col>
          <Col md={12}>
            <ProfileEdit
              customerName={customerName}
              customerEmail={customerEmail}
              handleSubmit={this.handleSubmit}
              handleChangeName={this.handleChangeName}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  customerName: state.authentication.customerName
});

export default connect(
  mapStateToProps,
  { customerNameEdit }
)(ProfileCustomer);
