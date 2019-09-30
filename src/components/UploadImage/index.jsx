import React, { useState, useEffect } from "react";
import "./style.sass";
import {
  Avatar,
  Icon,
  Upload as UploadAnt,
  Row,
  Col,
  notification
} from "antd";
import ImageRepo from "../../repository/Image";
import Button from "../Button";
import propTypes from "prop-types";

const UploadImage = props => {
  const photoUrl = props.initialValue;
  const [loading, setLoading] = useState(false);
  const [isErrorDimension, setIsErrorDimension] = useState(false);
  const [isErrorFormat, setIsErrorFormat] = useState(false);
  const [isErrorSize, setIsErrorSize] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    updateProfile();
  }, [photoUrl]);

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

  async function uploadImage({ file }) {
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
      if (!isErrorFormat && !isErrorSize && !isErrorDimension) {
        const response = await ImageRepo.upload({
          loading: setLoading,
          params: formData
        });
        if (response.status === 200) {
          const url = response.data.data;
          props.onSuccesss(url);
        } else {
          notification.error({
            message: response.data.message
          });
        }
      }
    } else {
      setIsErrorDimension(true);
      setLoading(false);
    }
  }


  async function uploadImage({ file }) {
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
      if (!isErrorFormat && !isErrorSize && !isErrorDimension) {
        const response = await ImageRepo.upload({
          loading: setLoading,
          params: formData
        });
        if (response.status === 200) {
          const url = response.data.data;
          props.onSuccesss(url);
        } else {
          notification.error({
            message: response.data.message
          });
        }
      }
    } else {
      setIsErrorDimension(true);
      setLoading(false);
    }
  }


  function checkDimension(file) {
    return new Promise(resolve => {
      let _URL = window.URL || window.webkitURL;
      var image = new Image();
      image.src = file.uid ? _URL.createObjectURL(file) : file;
      image.onload = function () {
        let dimension = {};
        dimension.width = image.naturalWidth;
        dimension.height = image.naturalHeight;
        resolve(dimension);
      };
    });
  }

  function handleChangeImage(res) {
    if (
      res.file.status === "uploading" &&
      !isErrorFormat &&
      !isErrorSize &&
      !isErrorDimension
    ) {
      setLoading(true);
    }
    if (res.file.status === "done") {
     // props.onSuccesss(res.file.response);
     setLoading(false);
     setDisabled(false);
     getBase64(res.file.originFileObj, image => {
      console.log(res.file.response);
      props.successChangeUploadImage(res.file.response)
      })
    }
  }

  const getBase64 = function (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadImages = async function ({onError, onSuccess,file}) {
    let formData = new FormData();
    setLoading(true)
    formData.append("file", file)
    return checkDimension (file)
      .then(() => {
        return ImageRepo.upload({params : formData})
      })
      .then(response => {
        onSuccess(response.data.data)
      })
      .catch(error => {
        props.onError(error)
        onError(error)
        setLoading(false)
      })
  }

  function removeImage() {
    props.onSuccess("");
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
    name: "avatar",
    showUploadList: false,
    beforeUpload: beforeUpload,
    customRequest: ({ file }) => uploadImage({ file }),
    onChange: file => handleChangeImage(file)
  };

  const uploadImageDefault = {
    name: "avatar",
    beforeUpload: beforeUpload,
    customRequest: ({ onError, onSuccess,file }) => uploadImages({ onError, onSuccess,file }),
    onChange: file => handleChangeImage(file)
  }

  let returnUpload;
  if (props.type === "avatar") {
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
          <UploadAnt {...propsUpload}>
            <Button
              type="link"
              className="profile-avatar__button-command"
              onClick={handleError}
            >
              <Icon type="camera" />
              Upload / Ubah Foto Profil
            </Button>
          </UploadAnt>
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
                Minimal height / width 300 px.
                <br />
              </span>
            )}
          </div>
        </Col>
      </Row>
    );
  }
  const uploadButton = (
    <div
      onClick={handleError}
      style={{
        width: 100,
        height: 100,
        backgroundColor: "#ededed",
        color: "#777777 ",
        textAlign: "center",
        fontSize: 20
      }}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="lah"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      ) : (
          <Icon style={{ marginTop: 40 }} type={loading ? "loading" : "plus"} />
        )}
    </div>
  );
  if (props.type === "default") {
    returnUpload = (
      <div>
        <UploadAnt {...uploadImageDefault} listType="picture-card">
          <div style={{ display: "flex" }}>{uploadButton}</div>
        </UploadAnt>
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
              Minimal height / width 300 px.
              <br />
            </span>
          )}
        </div>
      </div>
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

export default UploadImage;
