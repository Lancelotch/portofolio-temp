import { apiGetWithoutToken } from "../../services/api";
import { PATH_CATEGORY } from "../../services/path/category";
import jmespath from "jmespath";
import category from "./response/category";

async function getAll(props) {
  const loading = props && props.loading ? props.loading : function() {};
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_CATEGORY.CATEGORY);
    response = jmespath.search(response, category);
    loading(false);
    return response;
  } catch (error) {
    response = jmespath.search(error.response, category);
    loading(false);
    return error;
  }
}

const Category = {
  getAll
};

export default Category;
