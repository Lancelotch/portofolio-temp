import React from "react";
import { Avatar, Button, Icon, Upload, message, Row, Col } from "antd";
import { apiPostWithToken } from "../../api/services";
import { PATH_CUSTOMER } from "../../api/path";

const beforeUpload = file => {
  const isPng = file.type === "image/png";
  const isJpeg = file.type === "image/jpeg";
  const isJPG = file.type === "image/jpg";
  const isLt2M = file.size <= 3145728;
  if (!isJPG && !isJpeg && !isPng) {
    message.error("You can only upload JPG file!");
  }
  if (!isLt2M) {
    message.error("Image must smaller than 3MB!");
  }
};

const uploadImage = async ({ onError, onSuccess, file }) => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    const response = await apiPostWithToken(
      PATH_CUSTOMER.CUSTOMER_UPLOAD,
      formData
    );
    onSuccess(response.data.data);
  } catch (error) {}
};

const ProfileAvatar = props => {
  const propsUpload = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: beforeUpload,
    customRequest: ({ onError, onSuccess, file }) =>
      uploadImage({ onError, onSuccess, file }),
    onChange: file => props.handleChange(file)
  };

  const { imageUrl, removeImage, disabled } = props;

  return (
    <Row style={{ padding: 28, maxWidth: 360 }}>
      <Col md={10} style={{ paddingTop: 5 }}>
        <Avatar shape="circle" src={imageUrl} size={94} />
      </Col>
      <Col md={14}>
        <p>Ukuran Gambar Max 3 mb. Format .JPG, .JPEG, .PNG.</p>
        <Button
          style={{
            padding: 0,
            height: 24,
            color: imageUrl ? "#777777" : "#DDDDDD"
          }}
          type="link"
          onClick={removeImage}
          disabled={disabled}
        >
          <Icon type="delete" />
          Hapus Foto Profil
        </Button>
        <Upload {...propsUpload}>
          <Button
            style={{ padding: 0, height: 24, color: "#777777" }}
            type="link"
          >
            <Icon type="camera" />
            Ubah Foto Profil
          </Button>
        </Upload>
      </Col>
    </Row>
  );
};

export default ProfileAvatar;
