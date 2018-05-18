import {
  S_PASSIVE,
  S_ACTIVE,
  S_CORE,
  S_REDGUY,
  CLIENT,
  SPECIALIST
} from "../constans/constans";
import jwtDecode from "jwt-decode";

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

export function getUserRole() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    const { role } = jwtDecode(token);
    return role;
  }
}

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

export function getYearsForSelect(start = 1960, end = 2025) {
  var startYear = start,
    years = [];

  while (startYear <= end) {
    let item = {
      label: startYear,
      value: startYear
    };
    startYear++;
    years.push(item);
  }

  return years;
}
