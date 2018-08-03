import { NotificationManager } from "react-notifications";
import {
  SPECIALIST,
  CLIENT,
  S_ACTIVE,
  S_CORE,
  S_PASSIVE,
  S_REDGUY
} from "./constants";
/**
 * Gets object, field you want rename and new name, you want rename it to
 *
 * @param  {object} obj
 * @param  {string} oldName
 * @param  {string} newName
 */
export function renameObjPropNames(obj, oldName, newName) {
  if (!obj.hasOwnProperty(oldName)) {
    return false;
  }

  obj[newName] = obj[oldName];
  delete obj[oldName];
  return true;
}

export function getUserUrl(usetype) {
  switch (usetype) {
    case SPECIALIST:
      return "specialists";
    case CLIENT:
      return "customers";
    default:
      return;
  }
}
/**
 * Gets user role and returns appropriate type
 *
 * @param  {string} role
 * @returns  {string} type
 *
 */
export function getUserType(role) {
  if (role === "customer") return CLIENT;
  else if (
    [S_ACTIVE, S_CORE, S_PASSIVE, S_REDGUY].some(s_type => s_type === role)
  )
    return SPECIALIST;
  else return null;
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
