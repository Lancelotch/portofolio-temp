import React, { useState, useEffect } from "react";
import "./style.sass";
import { Avatar } from "antd";
import Customer from "../../repository/Customer";

export default function ProfileMain() {
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getCustomer();
  }, []);

  async function getCustomer() {
    const params = {};
    const response = await Customer.get(params);
    const res = response.data.data;
    if (response.status === 200) {
      setCustomerName(res.name);
      setPhotoUrl(res.photoUrl);
    }
    if (res.photoUrl) {
      const isDimention = await checkDimension(res.photoUrl);
      if (isDimention.height > isDimention.width) {
        setPortrait(true);
        setLandscape(false);
      }
      if (isDimention.height < isDimention.width) {
        setPortrait(false);
        setLandscape(true);
      }
    }
  }

  function checkDimension(file) {
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

  return (
    <div>
      <div className="profile-main">
        <div className={portrait ? "portrait" : landscape ? "landscape" : ""}>
          <Avatar icon="user" size={40} src={photoUrl} />
        </div>
        <div className="profile-main__customer-name">
          <span>{customerName}</span>
        </div>
      </div>
    </div>
  );
}
