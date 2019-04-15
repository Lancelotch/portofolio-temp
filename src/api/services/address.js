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

export const patchDefaultAddress = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "PATCH",
        url: PATH_CUSTOMER.ADDRESS_DEFAULT,
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

export const editAddressForm = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "PUT",
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

export const deleteAddress = (id) => {
  return dummyService
    .request({
      method: "DELETE",
      url: `${PATH_CUSTOMER.ADDRESS}/${'06fc0503-8f93-4195-a8e4-9751c7e2024f'}`
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    });
};
