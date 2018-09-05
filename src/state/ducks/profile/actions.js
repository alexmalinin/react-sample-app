import * as types from "./types";
import { fetch, selectors } from "../../utils";
import {
  PUT,
  createNotification,
  SPECIALIST,
  CLIENT,
  CUSTOMER
} from "@utilities";
import { getSkillsAttr, specialistProfile, clientProfile } from "./utils";
import { DELETE } from "../../../utilities";

/**
 * Update user Data Profile
 *
 * @param  {object} data user data
 * @param  {array} education specialist education data
 * @param  {array} experience specialist experience data
 * @param  {function} callback success submit callback
 */

export const updateUserProfile = (data, education, experience, callback) => {
  return (dispatch, getState) => {
    const state = getState(),
      userType = selectors.getUserType(state),
      id = selectors.getUserId(state);

    switch (userType) {
      case SPECIALIST:
        return dispatch(
          updateSpecialistProfile(id, data, education, experience, callback)
        );
      case CLIENT:
        return dispatch(updateClientProfile(id, data, callback));
      default:
        break;
    }
  };
};

const updateSpecialistProfile = (id, data, education, experience, callback) => {
  const image = data["person"] && data["person"][0];

  const educationData = education.filter(e => !e.id),
    experienceData = experience.filter(e => !e.id);

  return dispatch => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        dispatch({
          type: types.USER_PROFILE_UPDATE,
          payload: fetch(PUT, `/specialists/${id}/dashboard/profile`, {
            profile: specialistProfile(
              data,
              educationData,
              experienceData,
              reader.result
            )
          })
        })
          .then(() => {
            createNotification({
              type: "success",
              text: "Changes was saved"
            });

            if (callback) callback();
          })
          .catch(error => {
            createNotification({
              type: "error"
            });
          });
      };
    } else {
      return dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: fetch(PUT, `/specialists/${id}/dashboard/profile`, {
          profile: specialistProfile(data, educationData, experienceData)
        })
      })
        .then(() => {
          createNotification({
            type: "success",
            text: "Changes was saved"
          });

          if (callback) callback();
        })
        .catch(error => {
          createNotification({
            type: "error"
          });
        });
    }
  };
};

const updateClientProfile = (id, data) => {
  const image = data["person"] ? data["person"][0] : null;

  return dispatch => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        dispatch({
          type: types.USER_PROFILE_UPDATE,
          payload: fetch(PUT, `/customers/${id}/dashboard/profile`, {
            profile: clientProfile(data, reader.result)
          })
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

            throw new Error();
          });
      };
    } else {
      dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: fetch(PUT, `/customers/${id}/dashboard/profile`, {
          profile: clientProfile(data)
        })
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

          throw new Error();
        });
    }
  };
};

export const addEducationCard = payload => ({
  type: types.EDUCATION_CARD_ADD,
  payload
});

/**
 * Edit education data card
 *
 * @param  {object} data card data
 */

export const editEducationCard = payload => (dispatch, getState) => {
  const user_id = getState().user.id;

  if (payload.id) {
    const education = {
      education: {
        ...payload
      }
    };

    return fetch(
      PUT,
      `/specialists/${user_id}/educations/${payload.id}`,
      education
    ).then(({ data }) => {
      dispatch({
        type: types.EDUCATION_CARDS_UPDATE,
        payload: data
      });
    });
  } else {
    dispatch({
      type: types.EDUCATION_CARD_EDIT,
      payload
    });
  }
};

/**
 * Delete education card
 *
 * @param  {object} payload card data
 */

export const deleteEducationCard = payload => (dispatch, getState) => {
  const user_id = getState().user.id;

  if (payload.id) {
    return fetch(
      DELETE,
      `/specialists/${user_id}/educations/${payload.id}`
    ).then(({ data }) => {
      dispatch({
        type: types.EDUCATION_CARDS_UPDATE,
        payload: data
      });
    });
  } else {
    dispatch({
      type: types.EDUCATION_CARD_DELETE,
      payload
    });
  }
};

export const addWorkExperienceCard = payload => ({
  type: types.EXPERIENCE_CARD_ADD,
  payload
});

/**
 * Edit work experience data card
 *
 * @param  {object} data card data
 * @param  {number} id card id
 */

export const editWorkExperienceCard = payload => (dispatch, getState) => {
  const user_id = getState().user.id;

  if (payload.id) {
    const data = {
      work_experience: {
        ...payload
      }
    };

    return fetch(
      PUT,
      `/specialists/${user_id}/experiences/${payload.id}`,
      data
    ).then(({ data }) => {
      dispatch({
        type: types.EXPERIENCE_CARD_UPDATE,
        payload: data
      });
    });
  } else {
    dispatch({
      type: types.EXPERIENCE_CARD_EDIT,
      payload
    });
  }
};

/**
 * Delete experience card
 *
 * @param  {object} payload card data
 */

export const deleteExperienceCard = payload => (dispatch, getState) => {
  const user_id = getState().user.id;

  if (payload.id) {
    return fetch(
      DELETE,
      `/specialists/${user_id}/experiences/${payload.id}`
    ).then(({ data }) => {
      dispatch({
        type: types.EXPERIENCE_CARD_UPDATE,
        payload: data
      });
    });
  } else {
    dispatch({
      type: types.EXPERIENCE_CARD_DELETE,
      payload
    });
  }
};

/**
 * Update data for specialists sign up step 2
 *
 * @param  {object} data specialist data
 */

export const updateSpecialistIndustry = data => {
  const attr = getSkillsAttr(data),
    spec_attr = getSkillsAttr(data);

  return (dispatch, getState) => {
    const state = getState(),
      id = selectors.getUserId(state);

    const body = {
      specialist: {
        job_title: data["job_title"]["value"],
        position: data["position"],
        contact_number: data["contact_number"],
        project_interest: data["project_interest"],
        communication_type: data["communication_type"],
        available: data["availability"],
        hourly_rate: data["hourly_rate"],
        project_type_id: data["project_type"]["value"],
        experience_level_id: data["experience_level"]["value"],
        industry_area_id: data["industry_area_id"]["value"],
        industry_title: data["industry_title"],
        specialist_skills_attributes: {
          skill_attributes: attr
        },
        speciality_ids: spec_attr || ""
      }
    };

    return dispatch({
      type: types.USER_INDUSTRY_UPDATE,
      payload: fetch(PUT, `/specialists/${id}`, body)
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

        throw new Error();
      });
  };
};

export const updateCompany = data => {
  return (dispatch, getState) => {
    const state = getState(),
      userType = selectors.getUserType(state),
      id = selectors.getUserId(state);

    switch (userType) {
      case SPECIALIST:
        return dispatch(updateSpecialistCompany(id, data));
      case CLIENT:
        return dispatch(updateClientCompany(id, data));
      default:
        break;
    }
  };
};

/**
 * Update data for specialists sign up step 2
 *
 * @param  {number} id specialist id
 * @param  {object} payload specialist company data
 */

const updateSpecialistCompany = (id, data) => dispatch => {
  const body = {
    specialist: {
      company_attributes: {
        name: data["name"],
        company_address: data["company_address"],
        country: data["country"],
        city: data["city"],
        industry_area_id: data["industry"]["value"] || data["industry"],
        number_of_employers:
          data["number_of_employers"]["value"] || data["number_of_employers"],
        segment: data["segment"]["value"] || data["segment"],
        website: data["website"]
      }
    }
  };

  return dispatch({
    type: types.USER_COMPANY_UPDATE,
    payload: fetch(PUT, `/specialists/${id}`, body)
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

      console.error(error);
      throw new Error();
    });
};

/**
 * Update Client Data Company
 *
 * @param  {number} id client id
 * @param  {object} payload client company data
 */

const updateClientCompany = (id, payload) => {
  return dispatch => {
    const body = {
      customer: {
        company_attributes: {
          name: payload["name"],
          registered_name: payload["registered_name"],
          company_address: payload["company_address"],
          website: payload["website"],
          country: payload["country"],
          city: payload["city"],
          abn_acn: payload["abn_acn"],
          tell_about: payload["tell_about"],
          segment: payload["segment"]["value"] || payload["segment"],
          number_of_employers:
            payload["number_of_employers"]["value"] ||
            payload["number_of_employers"],
          user_id: id,
          industry_area_id: payload["industry"]["value"] || payload["industry"]
        }
      }
    };

    return dispatch({
      type: types.USER_COMPANY_UPDATE,
      payload: fetch(PUT, `/customers/${id}`, body)
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

        console.error(error);
      });
  };
};

export const updateBillings = data => {
  return (dispatch, getState) => {
    const state = getState(),
      userType = selectors.getUserType(state),
      id = selectors.getUserId(state);

    switch (userType) {
      case SPECIALIST:
        return dispatch(updateSpecialistBillings(id, data));
      case CLIENT:
        return dispatch(updateClientBillings(id, data));
      default:
        break;
    }
  };
};

/**
 * Update specialist billings
 *
 * @param  {object} data specialist billings data
 */

const updateSpecialistBillings = (id, data) => {
  return dispatch => {
    const body = {
      specialist: {
        billing_attributes: {
          billing_type: data["billing_type"],
          card_name: data["card_name"],
          card_number: data["card_number"],
          expiry_date: data["expiry_date"],
          ccv: data["ccv"],
          correspondent_bank: data["correspondent_bank"],
          beneficiary_bank: data["beneficiary_bank"],
          beneficiary_name: data["beneficiary_name"],
          purpose_of_payment: data["purpose_of_payment"],
          beneficiary_account: data["beneficiary_account"],
          swift_code: data["swift_code"],
          iban: data["iban"],
          user_type: SPECIALIST,
          user_id: id
        }
      }
    };

    return dispatch({
      type: types.USER_BILLINGS_UPDATE,
      payload: fetch(PUT, `/specialists/${id}`, body)
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

        console.error(error);
        throw new Error();
      });
  };
};

/**
 * Update Client Billing
 *
 * @param  {object} data client billing data
 */

const updateClientBillings = (id, data) => {
  return dispatch => {
    const body = {
      customer: {
        billing_attributes: {
          billing_type: data["billing_type"],
          card_name: data["card_name"],
          card_number: data["card_number"],
          expiry_date: data["expiry_date"],
          ccv: data["ccv"],
          correspondent_bank: data["correspondent_bank"],
          beneficiary_bank: data["beneficiary_bank"],
          beneficiary_name: data["beneficiary_name"],
          purpose_of_payment: data["purpose_of_payment"],
          beneficiary_account: data["beneficiary_account"],
          swift_code: data["swift_code"],
          iban: data["iban"],
          user_type: CUSTOMER,
          user_id: id
        }
      }
    };

    return dispatch({
      type: types.USER_BILLINGS_UPDATE,
      payload: fetch(PUT, `/customers/${id}`, body)
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

        console.error(error);
        throw new Error();
      });
  };
};
