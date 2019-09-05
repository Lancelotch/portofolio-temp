import React, { useState, useEffect } from "react";
import "./style.sass";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileEdit from "../../components/ProfileEdit";
import { notification, Card } from "antd";
import Customer from "../../repository/Customer";
import ImageContainer from "../../repository/Image";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [allData, setAllData] = useState({});
  const [isErrorDimension, setIsErrorDimension] = useState(false);
  const [isErrorFormat, setIsErrorFormat] = useState(false);
  const [isErrorSize, setIsErrorSize] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const params = {
      loading: setLoading
    };
    const response = await Customer.get(params);
    const res = response.data.data;
    if (response.status === 200) {
      setCustomerName(res.name);
      setCustomerEmail(res.email);
      setPhotoUrl(res.photoUrl);
      setAllData(res);
    }
    if (res.photoUrl) {
      const isDimention = await checkDimensionFirst(res.photoUrl);
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

  function checkDimensionFirst(file) {
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
  }

  async function uploadImage({ onError, onSuccess, file }) {
    let formData = new FormData();
    formData.append("file", file);
    const request = {
      loading: setLoading,
      params: formData
    };
    const isDimension = await checkDimension(file);
    if (isDimension.height >= 450 && isDimension.width >= 450) {
      if (isDimension.height > isDimension.width) {
        setPortrait(true);
        setLandscape(false);
      } else if (isDimension.height < isDimension.width) {
        setPortrait(false);
        setLandscape(true);
      }
      const response = await ImageContainer.upload(request);
      onSuccess(response.data.data);
    } else {
      setIsErrorDimension(true);
    }
  }

  function handleChangeImage(res) {
    setTimeout(() => {
      if (
        res.file.status === "uploading" &&
        !isErrorFormat &&
        !isErrorSize &&
        !isErrorDimension
      ) {
        setLoading(true);
        setPhotoUrl("");
        setAllData({
          ...allData,
          loading: true
        });
      }
    }, 10);
    if (res.file.status === "done") {
      setPhotoUrl(res.file.response.smallUrl);
      setAllData({
        ...allData,
        photoUrl: res.file.response.smallUrl
      });
      setLoading(false);
      setDisabled(false);
    }
  }

  function checkDimension(file) {
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
  }

  function removeImage() {
    setPhotoUrl("");
    setAllData({
      ...allData,
      photoUrl: ""
    });
    setLandscape(false);
    setPortrait(false);
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
    setDisabled(true);
  }

  async function handleSubmit(name) {
    const request = {
      ...allData,
      name: name
    };
    const response = await Customer.update(request);
    if (response.status === 200) {
      openNotificationSuccess("success");
    } else {
      openNotificationSuccess("error");
    }
  }

  function handleError() {
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
  }

  function openNotificationSuccess(type) {
    let message;
    if (type === "success") {
      message = "Berhasil Menyimpan Perubahan Data";
    } else {
      message = "Gagal Menyimpan Perubahan Data";
    }
    notification[type]({
      message: message,
      duration: 4
    });
  }

  function beforeUpload(file) {
    const isPng = file.type === "image/png";
    const isJpeg = file.type === "image/jpeg";
    const isJPG = file.type === "image/jpg";
    const isLt2M = file.size <= 3145728;
    if (!isJPG && !isJpeg && !isPng) {
      setIsErrorFormat(true);
    }
    if (!isLt2M) {
      setIsErrorSize(true);
    }
  }

  return (
    <Card title="Profil Pengguna">
      <div className="profile">
        <div className="profile__content">
          <ProfileAvatar
            photoUrl={photoUrl}
            loading={loading}
            beforeUpload={beforeUpload}
            uploadImage={uploadImage}
            handleChangeImage={handleChangeImage}
            removeImage={removeImage}
            handleError={handleError}
            landscape={landscape}
            portrait={portrait}
            isErrorDimension={isErrorDimension}
            isErrorFormat={isErrorFormat}
            isErrorSize={isErrorSize}
            disabled={disabled}
          />
        </div>
        <div className="profile__content">
          <ProfileEdit
            customerName={customerName}
            customerEmail={customerEmail}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Card>
  );
}
