import React, { useState, useEffect } from "react";
import "./style.sass";
import ProfileEdit from "../../components/ProfileEdit";
import { notification, Card } from "antd";
import { useRootContext } from "../../hoc/RootContext";
import UploadImage from "../../components/UploadImage";

export default function Profile() {
  const { authProfile, handleUpdate } = useRootContext();
  const [allData, setAllData] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    if (authProfile) {
      setAllData(authProfile);
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

  return (
    <Card title="Profil Pengguna">
      <div className="profile">
        <div className="profile__content">
          <UploadImage
            type="avatar"
            allData={allData}
            setAllData={setAllData}
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
  );
}
