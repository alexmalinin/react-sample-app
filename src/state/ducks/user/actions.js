// import { createNotification } from "../helpers/functions";
import * as types from "./types";
import { fetch } from "../../utils";
import {
  GET,
  SPECIALIST,
  getUserUrl,
  PUT,
  createNotification
} from "../../../utilities";
import {
  getSkillsAttr,
  getSpecAttr,
  specialistProfile,
  clientProfile
} from "./utils";

export const showUserData = (usertype, id) => {
  let url = getUserUrl(usertype);

  return {
    type: types.USER_DATA_SHOW,
    payload: fetch(GET, `/${url}/${id}`)
  };
};

/**
 * Update Specialist Data Profile
 *
 * @param  {object} data specialist data
 * @param  {array} education specialist education data
 * @param  {array} experience specialist experience data
 *
 */

export const updateUserProfile = (data, education, experience) => {
  let reader = new FileReader(),
    image = data["person"] ? data["person"][0] : null;

  return (dispatch, getState) => {
    if (image) {
      reader.readAsDataURL(image);

      dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: fetch(PUT, `/specialists/59/dashboard/profile`, data)
      })
        .then(() => {
          createNotification({
            type: "success",
            text: "Changes was saved"
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });
        });
    } else {
      dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: fetch(PUT, `/specialists/59/dashboard/profile`, data)
      })
        .then(() => {
          createNotification({
            type: "success",
            text: "Changes was saved"
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });
        });
    }
  };
};
