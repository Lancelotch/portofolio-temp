import { apiGetWithoutToken } from "../../services/api";
import { PATH_CATEGORY } from "../../services/path/category";

async function getAll(props) {
  const loading = props && props.loading ? props.loading : function() {};
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_CATEGORY.CATEGORY);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

const Category = {
  getAll
};

export default Category;
