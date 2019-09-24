import { apiPatchWithToken } from "../../services/api";
import { PRODUCT_QUESTION_ANSWER } from "../../services/path/questionAnswer";

async function vote(props) {
  const loading = props.loading ? props.loading : function() {};
  const questionAnswerId = props.questionAnswerId;
  const option = props.option;
  let response = "";
  loading(true);
  try {
    response = await apiPatchWithToken(
      `${PRODUCT_QUESTION_ANSWER.QUESTION_ANSWER}/${questionAnswerId}/vote/${option}`
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
