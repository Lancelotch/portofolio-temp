import { serviceWithToken } from "./httpClient";
import { PATH_CUSTOMER } from "../path";

export const getAddressDefault = async () => {
  return await serviceWithToken()
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
  return serviceWithToken()
  .request(request)
  .then(response => {
    return response.data
  })
  .catch(error => {
    return error.response;
  });
}

export const patchDefaultAddress = request => {
  return serviceWithToken()
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
  return serviceWithToken()
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
  return serviceWithToken()
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
  return serviceWithToken()
    .request({
      method: "DELETE",
      url: `${PATH_CUSTOMER.CUSTOMER_ADDRESS_DELETE}/${id}`
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};
