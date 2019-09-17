import { apiPatchWithToken } from "../../services/api";
import { PATH_PRODUCT } from "../../services/path/product";

async function vote(props) {
  const loading = props.loading ? props.loading : function() {};
  const questionAnswereId = props.questionAnswereId;
  const option = props.option;
  let response = "";
  loading(true);
  try {
    response = await apiPatchWithToken(
      `${PATH_PRODUCT.PRODUCT_QUESTION_ANSWER}/${questionAnswereId}/vote/${option}`
    );
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

const QuestionAnswer = {
  vote
};

export default QuestionAnswer;
