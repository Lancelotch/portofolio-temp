import React from "react";
import "./style.sass";
import { Avatar, Icon, Upload, Row, Col } from "antd";
import Button from "../Button";

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
          src={loading ? null : photoUrl}
          alt="You're Perfect"
        />
      </Col>
      <Col md={16}>
        <p className="profile-avatar__title">
          Ukuran Gambar Max 3 mb. Format .JPG, .JPEG, .PNG.
        </p>
        <Button
          style={disabled ? { cursor: "default" } : {}}
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
            type="link"
            className="profile-avatar__button-command"
            onClick={handleError}
          >
            <Icon type="camera" />
            Upload / Ubah Foto Profil
          </Button>
        </Upload>
        <div className="profile-avatar__error">
          {isErrorFormat === true && (
            <span>
              Format file yang diupload tidak sesuai.
              <br />
            </span>
          )}
          {isErrorSize === true && (
            <span>
              Ukuran gambar lebih dari 3 mb.
              <br />
            </span>
          )}
          {isErrorDimension === true && (
            <span>
              Minimal height / width 450 px.
              <br />
            </span>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ProfileAvatar;
