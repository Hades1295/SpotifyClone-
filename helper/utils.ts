export const Messages: any = {
    "token expired": "Link is expired",
    "token invalid": "Link is invalid",
};
import { getCookie } from "../helper/cookie";


export const getErrorMessage = (message: any) => {
    let resultMessage;
    if (Array.isArray(message)) {
      resultMessage = message.map(
        (message: string) => Messages[message] || message
      );
    } else resultMessage = Messages[message] || message;
    return resultMessage;
  };