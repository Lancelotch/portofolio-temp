import React, { useState, useEffect } from "react";
import "./style.sass";
import ProfileEdit from "../../components/ProfileEdit";
import { notification, Card } from "antd";
import { useRootContext } from "../../hoc/RootContext";
import UploadImage from "../../components/UploadImage";

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

  return (
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
  );
}
