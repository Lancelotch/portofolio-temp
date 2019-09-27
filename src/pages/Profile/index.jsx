import React, { useState, useEffect } from "react";
import "./style.sass";
import ProfileEdit from "../../components/ProfileEdit";
import { notification, Card } from "antd";
import { useRootContext } from "../../hoc/RootContext";
import UploadImage from "../../components/UploadImage";
import Customer from "../../repository/Customer";
import ResendVerification from "../../components/ResendVerification";
import strings from "../../localization/localization";

export default function Profile() {
  const { authProfile, handleUpdate } = useRootContext();
  const [payload, setPayload] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    if (authProfile) {
      setPayload(authProfile);
    }
  }

  function openNotificationWithIcon(type) {
    notification[type]({
      message: strings.profile_status_verifikasi
    });
  };

  async function actionResendVerificationEmail() {
    let resendVerifikasi = await Customer.resendVerification({})
    if (resendVerifikasi.status === 200) {
      openNotificationWithIcon('success');
    }
  }

  async function handleSubmit(name) {
    const params = {
      ...payload,
      name: name
    };
    handleUpdate(params);
    if (authProfile) {
      openNotificationSubmit("success");
    } else {
      openNotificationSubmit("error");
    }
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

  function onSuccess(response) {
    setPayload({
      ...payload,
      photoUrl: response
    })
  }

  let checkStatusVerificationEmail = authProfile.status === "VRFI" ? true : false

  return (
    <React.Fragment>
    <Card title="Profil Pengguna">
      <div className="profile">
        <div className="profile__content">
          <UploadImage
            type="avatar"
            onSuccess={onSuccess}
            initialValue={payload.photoUrl}
          />
        </div>
        <div className="profile__content">
          <ProfileEdit
            customerName={payload.name}
            customerEmail={payload.email}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Card>
    {checkStatusVerificationEmail &&
      <ResendVerification
      actionResendVerificationEmail={actionResendVerificationEmail} />}

    </React.Fragment>
  );
}
