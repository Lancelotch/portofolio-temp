import React from "react";
import { notification } from "antd";

export function checkDimension(file) {
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

export function responseStatus(response, onSuccess, type) {
  if (response.status === 200) {
    const url = response.data.data;
    type === "avatar" && onSuccess(url);
    onSuccess(response.data.data);
  }
  else {
    notification.error({
      message: response.data.message
    });
  }
}

export const getBase64 = function (img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function errorUploadImage(isErrorFormat, isErrorSize, isErrorDimension) {
  let errorFormat = isErrorFormat === true ? "red" : ""
  let errorSize = isErrorSize === true ? "red" : ""
  let errorDimension = isErrorDimension === true ? "red" : ""
  return (
    <React.Fragment>
      <span style={{ color: errorSize, display: "block", lineHeight: 0 }}>
        Ukuran foto tidak lebih dari 3 mb.
      </span>
      <span style={{ color: errorDimension, display: "block", lineHeight: 3 }}>
        Bingkai tidak kurang dari 300px X 300px.
      </span>
      <span style={{ color: errorFormat, display: "block", lineHeight: 0 }}>
        Format foto jpg,jpeg,png
    </span>
    </React.Fragment>
  )
}

export function errorAvatarImage(isErrorFormat, isErrorSize, isErrorDimension) {
  return (
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
  )
}
