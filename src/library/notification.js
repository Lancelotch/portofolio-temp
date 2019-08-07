import { notification as notificationAntd} from "antd";
import propType from "prop-types";

const notification = (message, description, type) => {
    notificationAntd[type]({
    message: message,
    description: description,
    style: {
      width: 500,
      marginLeft: 400 - 508
    }
  });
};

notification.propType = {
  message: propType.string,
  description: propType.string,
  type: propType.oneOf(["success", "info", "warning", "error"])
};

notification.defaultProps = {
  type: "success"
};

export default notification;
