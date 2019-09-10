import React, { useState, useEffect } from "react";
import "./style.sass";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileEdit from "../../components/ProfileEdit";
import { notification, Card } from "antd";
import ImageRepo from "../../repository/Image";
import { useRootContext } from "../../hoc/RootContext";
import Customer from "../../repository/Customer";
import ResendVerifikasiEmail from "../../components/ResendVerifikasiEmail";
import strings from "../../localization/localization";

export default function Profile() {
  const { authProfile, handleUpdate } = useRootContext();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState({});
  const [isErrorDimension, setIsErrorDimension] = useState(false);
  const [isErrorFormat, setIsErrorFormat] = useState(false);
  const [isErrorSize, setIsErrorSize] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [statusVRFI, setStatusVRFI] = useState("")
 
  useEffect(() => {
    getProfile();
    statusVerifikasi();
  }, []);

  useEffect(() => {
    statusVerifikasi();
  }, [statusVRFI]);


  async function statusVerifikasi() {
    let statusVerifikasi = await Customer.get({})
    console.log(statusVerifikasi);
    
    if (statusVerifikasi.status === 200) {
      setStatusVRFI(statusVerifikasi.data.data.status)
    } else {
      setStatusVRFI("")
    }

  }

  async function getProfile() {
    if (authProfile) {
      setAllData(authProfile);
    }
    if (authProfile.photoUrl) {
      const isDimention = await checkDimensionFirst(authProfile.photoUrl);
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
      image.onload = function () {
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
    const isDimension = await checkDimension(file);
    if (isDimension.height >= 450 && isDimension.width >= 450) {
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
        onSuccess(response.data.data);
      }
    } else {
      setIsErrorDimension(true);
      setLoading(false);
    }
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
      image.onload = function () {
        let dimension = {};
        dimension.width = image.naturalWidth;
        dimension.height = image.naturalHeight;
        resolve(dimension);
      };
    });
  }

  function removeImage() {
    setAllData({
      ...allData,
      photoUrl: ""
    });
    setLandscape(false);
    setPortrait(false);
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
    setLoading(false);
    setDisabled(true);
  }

  function openNotificationWithIcon(type) {
    notification[type]({
      message: strings.profile_status_verifikasi
    });
  };

  async function actionResendVerifikasiEmail() {
    let resendVerifikasi = await Customer.resendVerification({})
    if (resendVerifikasi.status === 200) {
      openNotificationWithIcon('success');
    }
  }

  async function handleSubmit(name) {
    const params = {
      ...allData,
      name: name
    };
    handleUpdate(params);
    if (authProfile) {
      openNotificationSubmit("success");
    } else {
      openNotificationSubmit("error");
    }
  }

  function handleError() {
    setIsErrorDimension(false);
    setIsErrorFormat(false);
    setIsErrorSize(false);
  }

  function openNotificationSubmit(type) {
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
      setLoading(false);
    }
    if (!isLt2M) {
      setIsErrorSize(true);
      setLoading(false);
    }
  }

  let checkStatusVerifikasiEmail = statusVRFI === "VRFI" ? true : false

  return (
    <React.Fragment>
      <Card title="Profil Pengguna">
        <div className="profile">
          <div className="profile__content">
            <ProfileAvatar
              photoUrl={allData.photoUrl}
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
              customerName={allData.name}
              customerEmail={allData.email}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </Card>
      {checkStatusVerifikasiEmail &&
      <ResendVerifikasiEmail
        actionResendVerifikasiEmail={actionResendVerifikasiEmail} />}

    </React.Fragment>
  );
}
