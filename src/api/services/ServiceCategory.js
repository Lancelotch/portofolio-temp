import urls from "../urls";
import httpClient from "../../config/httpClient";

const apiCategoryFeature = () => {    
    return new Promise((resolve, reject) => {
      httpClient.mainService
        .request({
          method: "GET",
          url: urls.GetCategoryFeature
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };


const serviceCategory = {
    apiCategoryFeature : apiCategoryFeature,
}

export default serviceCategory;