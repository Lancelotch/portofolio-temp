import { dummyService } from "./httpClient";

  export const getMethod = (pathService) => {
    return new Promise((resolve, reject) => {
      dummyService
        .request({
          method: "GET",
          url: `${pathService}`
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  };

  export const fetchData = (request) => {
    return new Promise((resolve, reject) => {
      dummyService
        .request({...request})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  }