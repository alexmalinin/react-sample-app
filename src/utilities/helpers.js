import _ from "lodash";
import { NotificationManager } from "react-notifications";
import { SPECIALIST, CLIENT } from "./constants";

export function renameObjPropNames(obj, oldName, newName) {
  if (!obj.hasOwnProperty(oldName)) {
    return false;
  }

  obj[newName] = obj[oldName];
  delete obj[oldName];
  return true;
}

export function getUserUrl(usetype) {
  let url;

  switch (usetype) {
    case SPECIALIST:
      url = "specialists";
      break;
    case CLIENT:
      url = "customers";
      break;
    default:
      url = null;
  }

  return url;
}

/**
 * Creates a notification for user
 *
 * @param {string} type type of notification
 * @param {string} text title of notification
 * @param {integer} timeOut the popup timeout in milliseconds
 * @param {function} callback a function that gets fired when the popup is clicked
 * @param {boolean} priority if true, the message gets inserted at the top
 *
 */

export const createNotification = ({ type, text }) => {
  switch (type) {
    case "info":
      NotificationManager.info("Info message", text || "");
      break;
    case "success":
      NotificationManager.success("Success message", text || "");
      break;
    case "warning":
      NotificationManager.warning("Warning message", text || "");
      break;
    case "error":
      NotificationManager.error(
        "Error message",
        text || "Something went wrong, please try again"
      );
      break;
    default:
      break;
  }
};
