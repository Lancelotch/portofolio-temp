import { dummyService } from "./httpClient";
import { PATH_CUSTOMER } from "../path";

const service = dummyService;

export const getAddressDefault = () => {
  return service
    .request({
      method: "GET",
      url: PATH_CUSTOMER.ADDRESS_DEFAULT
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response;
    });
};

export const addressService = (request) => {
  return service
  .request(request)
  .then(response => {
    return response.data
  })
  .catch(error => {
    return error.response;
  });
}

export const patchDefaultAddress = request => {
  return service
    .request({
      method: "PATCH",
      url: PATH_CUSTOMER.ADDRESS_DEFAULT,
      data: request
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    });
};

export const postAddressForm = request => {
  return service
    .request({
      method: "POST",
      url: PATH_CUSTOMER.ADDRESS,
      data: request
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    });
};

export const editAddressForm = request => {
  return service
    .request({
      method: "PUT",
      url: PATH_CUSTOMER.ADDRESS,
      data: request
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response;
    });
};

export const deleteAddress = id => {
  return service
    .request({
      method: "DELETE",
      url: `${PATH_CUSTOMER.ADDRESS}/${"06fc0503-8f93-4195-a8e4-9751c7e2024f"}`
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};
