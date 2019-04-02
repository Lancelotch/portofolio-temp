import { dummyService } from "./httpClient";
import { PATH_CUSTOMER } from "../path";

export const getAddressDefault = () => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: PATH_CUSTOMER.ADDRESS_DEFAULT
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const postAddressForm = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "POST",
        url: PATH_CUSTOMER.ADDRESS,
        data: request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};