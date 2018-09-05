import {
  S_PASSIVE,
  S_ACTIVE,
  S_CORE,
  S_REDGUY,
  CLIENT,
  SPECIALIST
} from "utilities";
import jwtDecode from "jwt-decode";
import { NotificationManager } from "react-notifications";
import _ from "lodash";

export function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split("=");

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1, -1);
        return "";
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === "undefined") {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

export function getFormIdByPageName(user, page) {
  if (user === "Specialist") {
    switch (page) {
      case "profile":
        return "RenderProfileForm";
      case "industry":
        return "SpecialistIndustryForm";
      case "company":
        return "SpecialistCompanyForm";
      case "billings":
        return "SpecialistBillingForm";
      default:
        return null;
    }
  }
  if (user === "Client") {
    switch (page) {
      case "company":
        return "ClientCompanyForm";
      case "billing":
        return "ClientBillingForm";
      default:
        return null;
    }
  }
}

export function checkObjectPropertiesForValues(obj) {
  return Object.values(obj).every(x => x === null || x === "");
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

export function detectSpecType(role) {
  switch (role) {
    case 0:
      return S_PASSIVE;
    case 1:
      return S_ACTIVE;
    case 2:
      return S_CORE;
    case 3:
      return S_REDGUY;
    default:
      return S_PASSIVE;
  }
}

/**
 * @description Returns a user role as string
 * @returns role as string
 * @see constants
 */

export function getUserRole() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    const { aud } = jwtDecode(token);
    return aud;
  }

  return "";
}

/**
 * @description Returns a user type as string
 * @returns CLIENT or SPECIALIST
 */

export function getUserType() {
  if (getUserRole() === "customer") {
    return CLIENT;
  } else if (
    [S_ACTIVE, S_CORE, S_PASSIVE, S_REDGUY].some(
      s_type => s_type === getUserRole()
    )
  ) {
    return SPECIALIST;
  }
}

/**
 * @param {...roles} - gets Roles from arguments
 * @returns true if current user approach with any of
 */

export function oneOfRoles(...roles) {
  return roles.some(role => role === getUserRole());
}

export function getUserId() {
  let token = localStorage.getItem("jwt_token");

  if (token) {
    const { user_id } = jwtDecode(token);
    return user_id;
  }
}

/**
 * Creates options for select
 *
 * @param  {number} start a start year
 * @param  {number} end uses to identify the finish date
 * @returns {array} an array of objects with label and value
 */

export function getYearsForSelect(start = 1960, end) {
  var startYear = start,
    years = [];

  while (startYear <= new Date().getFullYear()) {
    let item = {
      label: startYear,
      value: startYear
    };
    startYear++;
    years.push(item);
  }

  if (end) {
    years.push({
      label: "Present",
      value: "Present"
    });
  }

  return years;
}

export function compareObjects(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function renameObjPropNames(obj, oldName, newName) {
  if (!obj.hasOwnProperty(oldName)) {
    return false;
  }

  obj[newName] = obj[oldName];
  delete obj[oldName];
  return true;
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

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}
