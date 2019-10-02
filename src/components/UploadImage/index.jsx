import React, { useState, useEffect } from "react";
import "./style.sass";
import { Avatar, Icon, Upload as UploadAnt, Row, Col, Modal } from "antd";
import ImageRepo from "../../repository/Image";
import Button from "../Button";
import propTypes from "prop-types";
import { checkDimension, responseStatus, getBase64, errorUploadImage, errorAvatarImage } 
from "./functionUploadImage";

export default function UploadImage({
  initialValue,
  images,
  onChange,
  onSuccess,
  type,
  onRemove,
  values, }) {

  const photoUrl = initialValue;
  const imagesProduct = images && [...images];
  const [hideShowButtonUpload, setHideShowButtonUpload] = useState()
  const [loading, setLoading] = useState(false);
  const [isErrorDimension, setIsErrorDimension] = useState(false);
  const [isErrorFormat, setIsErrorFormat] = useState(false);
  const [isErrorSize, setIsErrorSize] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [onPreview, setOnPreview] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    updateProfile();
  }, [photoUrl, images]);

  async function updateProfile() {
    if (photoUrl) {
      const isDimention = await checkDimension(photoUrl);
      if (isDimention.height > isDimention.width) {
        setPortrait(true);
        setLandscape(false);
      }
      if (isDimention.height < isDimention.width) {
        setPortrait(false);
        setLandscape(true);
      }
      setDisabled(false);
    }
  }

  async function uploadImage({ onError, onSuccess, file }) {
    let formData = new FormData();
    formData.append("file", file);
    const isDimension = await checkDimension(file);
    if (isDimension.height >= 300 && isDimension.width >= 300) {
      if (isDimension.height > isDimension.width) {
        setPortrait(true);
        setLandscape(false);
      } else if (isDimension.height < isDimension.width) {
        setPortrait(false);
        setLandscape(true);
      }
      await type === "avatar" ? handleResponseAvatar() : handleResponseUploadImage();
    } else {
      setIsErrorDimension(true);
      setLoading(false);
    }

    async function handleResponseUploadImage() {
      if (!isErrorFormat && !isErrorSize && !isErrorDimension) {
        const response = await ImageRepo.uploadImage({
          loading: setLoading,
          params: formData
        });
        responseStatus(response, onSuccess, type);
      }
    }

    async function handleResponseAvatar() {
      if (!isErrorFormat && !isErrorSize && !isErrorDimension) {
        const response = await ImageRepo.upload({
          loading: setLoading,
          params: formData
        });
        responseStatus(response, onSuccess, type)
      }
    }
  }

  function handlePreview(file) {
    getBase64(file.originFileObj, image => {
      setImageUrl(image)
      setOnPreview(!onPreview)
    })
  }

  const handleChange = function (info) {
    if (info.file.status ===
      'uploading' &&
      !isErrorFormat &&
      !isErrorSize &&
      !isErrorDimension) {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      type === "avatar" && onSuccess(info.file.response);
      setLoading(false)
      getBase64(info.file.originFileObj, image => {
        let responseImage = info.file.response
        let tempPayloadItems = imagesProduct
        tempPayloadItems.unshift(responseImage)
        setHideShowButtonUpload(tempPayloadItems)
        onChange('images', tempPayloadItems)
      })
    }
  }

  function handleCancel() {
    setOnPreview(false)
  }

  function removeImage() {
    type === "avatar" && onSuccess("");
    setLandscape(false);
    setPortrait(false);
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
    setLoading(false);
    setDisabled(true);
  }

  function handleError() {
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
  }

  function beforeUpload(file) {
    const isPng = file.type === "image/png";
    const isJpeg = file.type === "image/jpeg";
    const isJPG = file.type === "image/jpg";
    const isLt2M = file.size <= 3145728;
    if (!isJPG && !isJpeg && !isPng) {
      setIsErrorFormat(true);
      setLoading(false);
    }
    if (!isLt2M) {
      setIsErrorSize(true);
      setLoading(false);
    }
  }

  const propsUpload = {
    beforeUpload: beforeUpload,
    customRequest: ({ onError, onSuccess, file }) => uploadImage({ onError, onSuccess, file }),
    onChange: file => handleChange(file)
  };

  let returnUpload;
  const mapIng = values && values.map((image, index) => index);
  const uploadButton = (
    <div
      className="mp-button-upload-image"
      onClick={handleError}>
      {photoUrl ? (
        <React.Fragment>
          <img
            src={photoUrl}
            alt=""
          />
        </React.Fragment>
      ) : (
          <Icon
            className="mp-button-upload-image__icon"
            type={loading ? "loading" : "plus"} />
        )}
    </div>
  );

  if (type === "avatar") {
    returnUpload = (
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
          <UploadAnt
            name="avatar"
            showUploadList={false}
            {...propsUpload}>
            <Button
              type="link"
              className="profile-avatar__button-command"
              onClick={handleError}
            >
              <Icon type="camera" />
              Upload / Ubah Foto Profil
            </Button>
          </UploadAnt>
        </Col>
        {errorAvatarImage(isErrorFormat, isErrorSize, isErrorDimension)}
      </Row>
    );
  } else {
    returnUpload = (
      <React.Fragment>
        <UploadAnt
          {...propsUpload}
          onRemove={() => onRemove(mapIng)}
          listType="picture-card"
          onPreview={handlePreview}
        >
          {hideShowButtonUpload &&
            hideShowButtonUpload.length > 5 ? "" :
            <div style={{ display: "flex" }}>
              {uploadButton}
            </div>}
        </UploadAnt>
        <Modal visible={onPreview} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={imageUrl} />
        </Modal>
        {errorUploadImage(isErrorFormat, isErrorSize, isErrorDimension)}
      </React.Fragment>
    );
  }

  return returnUpload;
};

UploadImage.propTypes = {
  type: propTypes.oneOf(["default", "avatar"]),
  onSuccess: propTypes.func,
  onError: propTypes.func,
  initialValue: propTypes.string
};

UploadImage.defaultProps = {
  type: "default"
};

