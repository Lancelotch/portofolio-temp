import React, { useState, useEffect } from "react";
import "./style.sass";
import { Avatar } from "antd";
import { useRootContext } from "../../hoc/RootContext";

export default function ProfileMain() {
  const { authProfile } = useRootContext();
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);

  console.log("main", authProfile);
  useEffect(() => {
    getCustomer();
  }, []);

  async function getCustomer() {
    if (authProfile.photoUrl) {
      const isDimention = await checkDimension(authProfile.photoUrl);
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
          <Avatar icon={authProfile.photoUrl || "user"} size={40} src={authProfile.photoUrl} />
        </div>
        <div className="profile-main__customer-name">
          <span>{authProfile.name}</span>
        </div>
      </div>
    </div>
  );
}
