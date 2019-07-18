import { PATH_ORDER } from "../path";
import { dummyService } from "./httpClient";
const service = dummyService;

export const AddOrder = response => {
  return service
    .request({
      method: "POST",
      url: `${PATH_ORDER.ORDER}`,
      data: response
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};
