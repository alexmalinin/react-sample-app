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

export function prepareForSelect(array) {
  let data = [];

  array.forEach(item => {
    data.push({ label: item["name"], value: item["id"] });
  });

  return data;
}

export function getUserUrl(usetype) {
  switch (usetype) {
    case SPECIALIST:
      return "specialists";
    case CLIENT:
      return "customers";
    default:
      return null;
  }
}

/**
 * Gets user role and returns appropriate type
 *
 * @param  {string} role
 * @returns  {string} type
 */

export function getUserType(role) {
  if (role === "customer") return CLIENT;
  else if (
    [S_ACTIVE, S_CORE, S_PASSIVE, S_REDGUY].some(s_type => s_type === role)
  )
    return SPECIALIST;
  else return null;
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
  console.log("dsd", type, text);
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
