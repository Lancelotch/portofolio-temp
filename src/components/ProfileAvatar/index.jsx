import React from "react";
import "./style.sass";
import { Avatar, Button, Icon, Upload, Row, Col } from "antd";

const ProfileAvatar = props => {
  const {
    photoUrl,
    loading,
    uploadImage,
    removeImage,
    handleError,
    landscape,
    portrait,
    isErrorDimension,
    isErrorFormat,
    isErrorSize,
    disabled
  } = props;

  const propsUpload = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: props.beforeUpload,
    customRequest: ({ onError, onSuccess, file }) =>
      uploadImage({ onError, onSuccess, file }),
    onChange: file => props.handleChangeImage(file)
  };

  return (
    <Row className="profile-avatar">
      <Col
        md={8}
        className={portrait ? "portrait" : landscape ? "landscape" : ""}
      >
        <Avatar
          size={98}
          icon={loading ? "loading" : "user"}
          src={photoUrl}
          alt="You're Perfect"
        />
      </Col>
      <Col md={16}>
        <p className="profile-avatar__title">
          Ukuran Gambar Max 3 mb. Format .JPG, .JPEG, .PNG.
        </p>
        <Button
          style={{
            color: photoUrl ? "#777777" : "#DDDDDD"
          }}
          className="profile-avatar__button-command"
          type="link"
          onClick={removeImage}
          disabled={disabled}
        >
          <Icon type="delete" />
          Hapus Foto Profil
        </Button>
        <Upload {...propsUpload}>
          <Button
            style={{ color: "#777777" }}
            className="profile-avatar__button-command"
            onClick={handleError}
            type="link"
          >
            <Icon type="camera" />
            Upload / Ubah Foto Profil
          </Button>
        </Upload>
        <Button type="primary">lah</Button>
        
        <div className="profile-avatar__error">
          {isErrorFormat === true && (
            <p>Format file yang diupload tidak sesuai.</p>
          )}
          {isErrorSize === true && <p>Ukuran gambar lebih dari 3 mb.</p>}
          {isErrorDimension === true && <p>Minimal height / width 450 px.</p>}
        </div>
      </Col>
    </Row>
  );
};

export default ProfileAvatar;
