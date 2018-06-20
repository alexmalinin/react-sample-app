import jwtDecode from "jwt-decode";
import { createNotification } from "../helpers/functions";

import {
  PORT,
  HIDE_FOOTER,
  SIDEBAR,
  SIGN_UP_STEP_1,
  RESET_SIGN_UP,
  CHANGE_USER_TYPE,
  SIGN_IN,
  GET_TOKEN_FOR_RESET_PASSWORD,
  GET_PASSWORDS_FOR_RESET_PASSWORD,
  VERIFICATION,
  CHANGE_PASSWORD,
  DELETE_CONFIRMATION_TOKEN,
  GET_USER_ID,
  WELCOME_CLIENT,
  GET_INDUSTRIES,
  UPDATE_SPECIALIST_STEP_1,
  EDUCATION,
  COMPANY,
  BILLING,
  WORK_EXPERIENCE,
  SHOW_CHOSEN_SKILLS,
  GET_PROJECT_TYPES,
  GET_EXPERIENCE_LEVELS,
  UPDATE_SPECIALIST_STEP_2,
  UPDATE_SPECIALIST_BILLINGS,
  CLEAR_EDUCATION,
  CLEAR_WORK_EXPERIENCE,
  SHOW_CLIENT_DATA,
  SHOW_SPECIALIST_DATA,
  UPDATE_SPECIALIST_PROFILE,
  EDIT_BILLING_WITH_ID,
  EDIT_COMPANY_WITH_ID,
  EDIT_EDUCATION_CARD_WITH_ID,
  EDIT_EDUCATION_CARD_WITHOUT_ID,
  EDIT_EXPERIENCE_CARD_WITH_ID,
  EDIT_EXPERIENCE_CARD_WITHOUT_ID,
  DELETE_EDUCATION_CARD_WITH_ID,
  DELETE_EDUCATION_CARD_WITHOUT_ID,
  DELETE_EXPERIENCE_CARD_WITH_ID,
  DELETE_EXPERIENCE_CARD_WITHOUT_ID,
  UPDATE_CLIENT_PROFILE,
  UPDATE_CLIENT_COMPANY,
  UPDATE_CLIENT_BILLINGS,
  SAVE_CREATED_PROJECT,
  SUBMIT_CREATED_PROJECT,
  SHOW_ALL_PROJECTS,
  SHOW_PROJECT_WITH_ID,
  CREATE_PROJECT_EPIC,
  SHOW_ALL_EPICS_WITHOUT_PROJECT,
  SHOW_ALL_EPICS,
  DELETE_PROJECT_EPIC,
  UPDATE_PROJECT_EPIC,
  SHOW_ALL_EPIC_TASKS,
  CREATE_EPIC_TASK,
  SHOW_PROJECT_EPIC,
  SHOW_EPIC_TASKS,
  UPDATE_EPIC_TASK,
  DELETE_EPIC_TASK,
  SHOW_ALL_SPECIALISTS,
  ASSIGN_SPECIALIST_TO_TASK,
  REMOVE_SPECIALIST_FROM_TASK,
  SHOW_ALL_TEAMS,
  SHOW_CLIENT_TEAMS,
  CREATE_CHANNEL,
  SHOW_CHANNELS,
  ADD_MEMBER_TO_CHANNEL,
  REMOVE_MEMBER_FROM_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  ASSIGN_SPECIALIST_TO_TEAM,
  SHOW_PROJECT_TEAM,
  REMOVE_SPECIALIST_FROM_TEAM,
  SHOW_SPECIALIST_PROJECTS,
  SHOW_SPECIALIST_TEAMS,
  SHOW_CUSTOM_TEAMS,
  CREATE_CUSTOM_TEAM,
  GET_SKILLS,
  SEARCH_SPECIALIST,
  SEARCH_SPECIALIST_FOR_PROJECT,
  SHOW_SPECIALIST_WITH_ID,
  SHOW_SPECIALIST_TASKS,
  UPDATE_PROJECT,
  SHOW_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  SHOW_SUBMIT_ERROR_MODAL,
  CLOSE_SUBMIT_ERROR_MODAL,
  SHOW_CUSTOM_TEAM,
  SUCCESS,
  FAIL
} from "../constans/constans";
import Axios from "axios";

let token = localStorage.getItem("jwt_token"),
  id = null;

if (token) {
  id = jwtDecode(token).id;
}

export function hideFooter() {
  const action = {
    type: HIDE_FOOTER
  };

  return action;
}

// show/hide mobile menu

export function toggleSidebar() {
  const action = {
    type: SIDEBAR
  };

  return action;
}

export function userType(user) {
  const action = {
    type: CHANGE_USER_TYPE,
    user
  };

  return action;
}

export function postContacts(data) {
  const action = {
    type: "CONTACTS",
    payload: data,
    contactRequest: `${PORT}api/v1/contact_requests`
  };

  return action;
}

export function signIn(user, data) {
  const action = {
    type: SIGN_IN,
    payload: data,
    signIn: `${PORT}/api/v1/${user}_token`
  };

  return action;
}

// Client and Specialist signUp step 1

export function postSignUpData(user, data) {
  const action = {
    type: SIGN_UP_STEP_1,
    user,
    payload: data,
    signUp: `${PORT}/api/v1/${user}`
  };

  return action;
}

// Reset signUpData;

export function resetSignUpData() {
  const action = {
    type: RESET_SIGN_UP
  };

  return action;
}

// Forgot Password action

export function getTokenForResetPassword(email, user) {
  const action = {
    type: GET_TOKEN_FOR_RESET_PASSWORD,
    payload: email,
    getTokenForResetPassword: `${PORT}/api/v1/${user}/password_request`
  };

  return action;
}

export function getPasswordsForResetPassword(passwords, user, token) {
  const action = {
    type: GET_PASSWORDS_FOR_RESET_PASSWORD,
    payload: passwords,
    getPasswordsForResetPassword: `${PORT}/api/v1/${user}/password_reset/${token}`
  };

  return action;
}

// Get User Id by confirmation token

export function getUserId(user, token) {
  const action = {
    type: GET_USER_ID,
    user,
    userConfirmationToken: `${PORT}/api/v1/${user}/${token}`
  };

  return action;
}

// Client and Specialist get request to API for deleting confirmation token

export function deleteConfirmationToken(user, token) {
  const action = {
    type: DELETE_CONFIRMATION_TOKEN,
    deleteConfirmationToken: `${PORT}/api/v1/${user}/confirmation/${token}`
  };

  return action;
}

// Client and Specialist Verification

export function verifyPassword(user, id, data) {
  const action = {
    type: VERIFICATION,
    user,
    payload: data,
    verification: `${PORT}/api/v1/${user}/${id}`
  };

  return action;
}

// Client and Specialist change password

export function changePassword(data, user) {
  const action = {
    type: CHANGE_PASSWORD,
    payload: data,
    user,
    changePassword1: `${PORT}/api/v1/${user + "s"}/`,
    changePassword2: "/dashboard/password"
  };

  return action;
}

// Client Welcome

export function welcomeClient(data) {
  const action = {
    type: WELCOME_CLIENT,
    payload: data,
    welcomeClient: `${PORT}/api/v1/customers/`
  };

  return action;
}

// company action

export function company(data) {
  const action = {
    type: COMPANY,
    payload: data
  };

  return action;
}

// billing action

export function billing(data) {
  const action = {
    type: BILLING,
    payload: data
  };

  return action;
}

// education action

export function education(data) {
  const action = {
    type: EDUCATION,
    payload: data
  };

  return action;
}

export function clearEducation() {
  const action = {
    type: CLEAR_EDUCATION
  };

  return action;
}

// workExperience action

export function workExperience(data) {
  const action = {
    type: WORK_EXPERIENCE,
    payload: data
  };

  return action;
}

export function clearworkExperience() {
  const action = {
    type: CLEAR_WORK_EXPERIENCE
  };

  return action;
}

// get Industries for specialists sign up step 2

export function getIndustries() {
  const action = {
    type: GET_INDUSTRIES,
    getIndustries: `${PORT}/api/v1/industry_areas`
  };

  return action;
}

// Get all project types

export function getProjectTypes() {
  const action = {
    type: GET_PROJECT_TYPES,
    getProjectTypes: `${PORT}/api/v1/project_types`
  };

  return action;
}

// Get all experience levels

export function getExperienceLevels() {
  const action = {
    type: GET_EXPERIENCE_LEVELS,
    getExperienceLevels: `${PORT}/api/v1/experience_levels`
  };

  return action;
}

// Get skills for specialist

export function getSkills() {
  const action = {
    type: GET_SKILLS,
    getSkills: `${PORT}/api/v1/skills`
  };

  return action;
}

/**
 * Update data for specialists sign up step 2
 *
 * @param  {object} data specialist data
 *
 */

export function updateSpecStep1(data) {
  let attr = data.skills_attributes
    ? data.skills_attributes.map(attr => {
        return { name: attr.label, id: +attr.value };
      })
    : null;
  let spec_attr = data.speciality_ids
    ? Object.keys(data.speciality_ids).map(item => +item.match(/\d+/)[0])
    : null;

  return dispatch => {
    Axios({
      method: "put",
      url: `${PORT}/api/v1/specialists/${id}`,
      data: {
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
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let data = response.data;
        data.successIndustryId = Math.random();

        dispatch({
          type: UPDATE_SPECIALIST_STEP_1 + SUCCESS,
          data
        });
      })
      .then(() => {
        createNotification({
          type: "success",
          text: "Form updated"
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });
      });
  };
}

// get chosen skills

export function showChosenSkills() {
  const action = {
    type: SHOW_CHOSEN_SKILLS,
    showChosenSkills: `${PORT}/api/v1/specialists/`
  };
  return action;
}

// update data for specialists sign up step 3

export function updateSpecStep2(data) {
  return dispatch => {
    Axios({
      method: "put",
      url: `${PORT}/api/v1/specialists/${id}`,
      data: {
        specialist: {
          company_attributes: {
            name: data["name"],
            company_address: data["company_address"],
            country: data["country"],
            city: data["city"],
            industry_area_id: data["industry"]["value"] || data["industry"],
            number_of_employers:
              data["number_of_employers"]["value"] ||
              data["number_of_employers"],
            segment: data["segment"]["value"] || data["segment"],
            website: data["website"]
          }
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let { data } = response;
        data.successUpdateId = Math.random();

        dispatch({
          type: UPDATE_SPECIALIST_STEP_2 + SUCCESS,
          data
        });
      })
      .then(() => {
        createNotification({
          type: "success",
          text: "Form updated"
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Update specialist billings
 *
 * @param  {object} data specialist billings data
 *
 */

export function updateSpecialistBillings(data) {
  return dispatch => {
    Axios({
      method: "put",
      url: `${PORT}/api/v1/specialists/${id}`,
      data: {
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
            user_type: "Specialist",
            user_id: id
          }
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let data = response.data;
        data.successUpdateId = Math.random();

        dispatch({
          type: UPDATE_SPECIALIST_BILLINGS + SUCCESS,
          data
        });
      })
      .then(() => {
        createNotification({
          type: "success",
          text: "Form updated"
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

// Show client Data Profile

export function showClientData() {
  const action = {
    type: SHOW_CLIENT_DATA,
    showClientData: `${PORT}/api/v1/customers/`
  };

  return action;
}

// Show specialist Data Profile

export function showSpecialistData() {
  const action = {
    type: SHOW_SPECIALIST_DATA,
    showSpecialistData: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// Show specialist Data by id

export function showSpecialistWithId(id) {
  const action = {
    type: SHOW_SPECIALIST_WITH_ID,
    showSpecialistWithId: `${PORT}/api/v1/specialists/${id}`
  };

  return action;
}

// Show all specialists

export function showAllSpecialists(...roles) {
  const action = {
    type: SHOW_ALL_SPECIALISTS,
    roles,
    showAllSpecialists: `${PORT}/api/v1/specialists`
  };

  return action;
}

/**
 * Update Specialist Data Profile
 *
 * @param  {object} data specialist data
 * @param  {array} education specialist education data
 * @param  {array} experience specialist experience data
 *
 */

export function updateSpecialistProfile(data, education, experience) {
  let reader = new FileReader(),
    image = data["person"] ? data["person"][0] : null;

  return dispatch => {
    if (image) {
      reader.readAsDataURL(image);

      reader.onload = () => {
        Axios({
          method: "put",
          url: `${PORT}/api/v1/specialists/${id}/dashboard/profile`,
          data: {
            profile: specialistProfile(
              data,
              education,
              experience,
              reader.result
            )
          }
        })
          .then(response => {
            let data = response.data;
            data.successProfileId = Math.random();

            dispatch({
              type: UPDATE_SPECIALIST_PROFILE + SUCCESS,
              data
            });
          })
          .then(() => {
            createNotification({
              type: "success",
              text: "Form updated"
            });
          })
          .catch(error => {
            createNotification({
              type: "error"
            });

            console.error(error);
          });
      };
    } else {
      Axios({
        method: "put",
        url: `${PORT}/api/v1/specialists/${id}/dashboard/profile`,
        data: {
          profile: specialistProfile(data, education, experience)
        }
      })
        .then(response => {
          let data = response.data;
          data.successProfileId = Math.random();

          dispatch({
            type: UPDATE_SPECIALIST_PROFILE + SUCCESS,
            data
          });
        })
        .then(() => {
          createNotification({
            type: "success",
            text: "Form updated"
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });

          console.error(error);
        });
    }
  };
}

// edit company

export function editCompany(data) {
  const action = {
    type: EDIT_COMPANY_WITH_ID,
    payload: data,
    editCompany: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// edit billing

export function editBillingWithId(data, id) {
  const action = {
    type: EDIT_BILLING_WITH_ID,
    payload: data,
    editBilliny: `${PORT}/api/v1/specialists/billings/`
  };

  return action;
}

// edit education data card

export function editEducationCardWithId(data, id) {
  const action = {
    type: EDIT_EDUCATION_CARD_WITH_ID,
    payload: data,
    editEducationCard1: `${PORT}/api/v1/specialists/`,
    editEducationCard2: `/educations/${id}`
  };

  return action;
}

export function editEducationCardWithOutId(education, id) {
  const action = {
    type: EDIT_EDUCATION_CARD_WITHOUT_ID,
    payload: education,
    id: id
  };

  return action;
}

// edit work experience data card

export function editExperienceCardWithId(experience, id) {
  const action = {
    type: EDIT_EXPERIENCE_CARD_WITH_ID,
    payload: experience,
    editExperienceCard1: `${PORT}/api/v1/specialists/`,
    editExperienceCard2: `/experiences/${id}`
  };

  return action;
}

export function editExperienceCardWithOutId(experience, id) {
  const action = {
    type: EDIT_EXPERIENCE_CARD_WITHOUT_ID,
    id: id,
    payload: experience
  };

  return action;
}

// delete education data card

export function deleteEducationCardWithId(id) {
  const action = {
    type: DELETE_EDUCATION_CARD_WITH_ID,
    deleteEducationCard1: `${PORT}/api/v1/specialists/`,
    deleteEducationCard2: `/educations/${id}`
  };

  return action;
}

export function deleteEducationCardWithOutId(education) {
  const action = {
    type: DELETE_EDUCATION_CARD_WITHOUT_ID,
    payload: education
  };

  return action;
}

// delete work experience data card

export function deleteExperienceCardWithId(id) {
  const action = {
    type: DELETE_EXPERIENCE_CARD_WITH_ID,
    deleteExperienceCard1: `${PORT}/api/v1/specialists/`,
    deleteExperienceCard2: `/experiences/${id}`
  };

  return action;
}

export function deleteExperienceCardWithOutId(experience) {
  const action = {
    type: DELETE_EXPERIENCE_CARD_WITHOUT_ID,
    payload: experience
  };

  return action;
}

/**
 * Update Client Data Profile
 *
 * @param  {object} data client profile data
 *
 */

export function updateClientProfile(data) {
  let image = data["person"] ? data["person"][0] : null;

  return dispatch => {
    if (image) {
      let reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        Axios({
          method: "put",
          url: `${PORT}/api/v1/customers/${id}/dashboard/profile`,
          data: {
            profile: clientProfile(data, reader.result)
          }
        })
          .then(response => {
            let data = response.data;
            data.successProfileId = Math.random();

            dispatch({
              type: UPDATE_CLIENT_PROFILE + SUCCESS,
              data
            });
          })
          .then(() => {
            createNotification({
              type: "success",
              text: "Form updated"
            });
          })
          .catch(error => {
            createNotification({
              type: "error"
            });

            console.error(error);
          });
      };
    } else {
      Axios({
        method: "put",
        url: `${PORT}/api/v1/customers/${id}/dashboard/profile`,
        data: {
          profile: clientProfile(data)
        }
      })
        .then(response => {
          let data = response.data;
          data.successProfileId = Math.random();

          dispatch({
            type: UPDATE_CLIENT_PROFILE + SUCCESS,
            data
          });
        })
        .then(() => {
          createNotification({
            type: "success",
            text: "Form updated"
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });

          console.error(error);
        });
    }
  };
}

/**
 * Update Client Data Company
 *
 * @param  {object} payload client company data
 *
 */

export function updateClientCompany(payload) {
  return async dispatch => {
    await Axios({
      method: "put",
      url: `${PORT}/api/v1/customers/${id}`,
      data: {
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
            industry_area_id:
              payload["industry"]["value"] || payload["industry"]
          }
        }
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        let payload = data;
        payload.successCompanyId = Math.random();

        dispatch({
          type: UPDATE_CLIENT_COMPANY + SUCCESS,
          data: payload
        });

        return data;
      })
      .then(({ name }) => {
        createNotification({
          type: "success",
          text: "Form updated"
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Update Client Billing
 *
 * @param  {object} data client billing data
 *
 */

export function updateClientBilling(data) {
  return dispatch => {
    Axios({
      method: "put",
      url: `${PORT}/api/v1/customers/${id}`,
      data: {
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
            user_type: "Customer",
            user_id: id
          }
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let data = response.data;
        data.successBillingId = Math.random();

        dispatch({
          type: UPDATE_CLIENT_BILLINGS + SUCCESS,
          data
        });
      })
      .then(() => {
        createNotification({
          type: "success",
          text: "Form updated"
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Post a Project
 *
 * @param  {object} data project data
 */

export function saveCreatedProgect(data) {
  let reader = new FileReader();
  let logo = data["logo"] ? data["logo"][0] : null;

  return dispatch => {
    if (logo) {
      reader.readAsDataURL(logo);

      reader.onload = () => {
        Axios({
          method: "post",
          url: `${PORT}/api/v1/projects`,
          data: {
            project: postProject(data, reader.result)
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(({ data }) => {
            dispatch({
              type: SAVE_CREATED_PROJECT + SUCCESS,
              data
            });

            return data;
          })
          .then(({ name }) => {
            createNotification({
              type: "success",
              text: `${name ? `${name} project ` : "Project"} was created`
            });
          })
          .catch(error => {
            createNotification({
              type: "error"
            });

            console.error(error);
          });
      };
    } else {
      Axios({
        method: "post",
        url: `${PORT}/api/v1/projects`,
        data: {
          project: postProject(data)
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          dispatch({
            type: SAVE_CREATED_PROJECT + SUCCESS,
            data
          });

          return data;
        })
        .then(({ name }) => {
          createNotification({
            type: "success",
            text: `${name ? `${name} project ` : "Project"} was created`
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });

          console.error(error);
        });
    }
  };
}

// submit a Project

export function submitCreatedProgect(data) {
  const action = {
    type: SUBMIT_CREATED_PROJECT,
    payload: data,
    submitCreatedProgect: `${PORT}/api/v1/projects`
  };

  return action;
}

// submit a Project

export function updateCreatedProject(data) {
  const action = {
    type: UPDATE_PROJECT,
    payload: data,
    updateCreatedProject: `${PORT}/api/v1/projects/${data.project_id}`
  };

  return action;
}

export function asyncUpdateProject(data) {}

// get array of all projects (include unsubmitted) by customer, created this project

export function showAllProjects() {
  const action = {
    type: SHOW_ALL_PROJECTS,
    showAllProjects: `${PORT}/api/v1/projects?customer_id=`
  };

  return action;
}

// get array of all projects, specialist assigned on

export function showSpecialistProjects() {
  const action = {
    type: SHOW_SPECIALIST_PROJECTS,
    showSpecialistProjects: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// get array of all teams, specialist assigned on

export function showSpecialistTeams() {
  const action = {
    type: SHOW_SPECIALIST_TEAMS,
    showSpecialistTeams: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// show all custom teams

export function showCustomTeams() {
  const action = {
    type: SHOW_CUSTOM_TEAMS,
    showCustomTeams: `${PORT}/api/v1/custom_teams/`
  };

  return action;
}

// get array of all tasks, specialist assigned on

export function showSpecialistTasks() {
  const action = {
    type: SHOW_SPECIALIST_TASKS,
    showSpecialistTasks: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// get project by id

export function showProjectWithId(id) {
  const action = {
    type: SHOW_PROJECT_WITH_ID,
    id,
    showProjectWithId: `${PORT}/api/v1/projects/`
  };

  return action;
}

/**
 * Post project Epic
 *
 * @param  {object} data epic data
 * @param  {number} project project id
 */

export function createProjectEpic(data, project) {
  let files = data.file
    ? data["file"].map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  return dispatch => {
    Axios({
      method: "post",
      url: `${PORT}/api/v1/projects/${project}/epics`,
      data: {
        epic: {
          name: data["name"],
          project_id: project,
          user_story: data["user_story"],
          business_requirements: data["requirements"],
          business_rules: data["rules"],
          deliverables: data["criteria"],
          description: data["description"],
          notes: data["solution"],
          eta: data["eta"],
          attached_files_attributes: files
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let data = response.data;
        data.successEpicId = Math.random();

        dispatch({
          type: CREATE_PROJECT_EPIC + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });
      });
  };
}

// update project Epic

export function updateProjectEpic(data) {
  const action = {
    type: UPDATE_PROJECT_EPIC,
    payload: data,
    updateProjectEpic: `${PORT}/api/v1/projects/${data.project_id}/epics/${
      data.id
    }`
  };

  return action;
}

/**
 * Delete Epic by project and id
 *
 * @param  {number} project project id
 * @param  {number} id epic id
 */

export function deleteProjectEpic(project, id) {
  return dispatch => {
    Axios({
      method: "delete",
      url: `${PORT}/api/v1/projects/${project}/epics/${id}`
    })
      .then(response => {
        let data = response.data;
        data.successId = Math.random();

        dispatch({
          type: DELETE_PROJECT_EPIC + SUCCESS,
          data
        });

        return data;
      })
      .then(({ name }) => {
        createNotification({
          type: "success",
          text: `${name ? `${name} module ` : "Module"} was deleted`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

// get array of all epics without projects

export function showAllEpicsWithoutProject() {
  const action = {
    type: SHOW_ALL_EPICS_WITHOUT_PROJECT,
    showAllEpicsWithoutProject: `${PORT}/api/v1/all_epics`
  };

  return action;
}

// get array of all projects (include unsubmitted)

export function showAllEpics(projectId) {
  const action = {
    type: SHOW_ALL_EPICS,
    projectId: projectId,
    showAllEpics: `${PORT}/api/v1/epics?project_id=${projectId}`
  };

  return action;
}

// show epic with id

export function showProjectEpic(project, epic) {
  const action = {
    type: SHOW_PROJECT_EPIC,
    showProjectEpic: `${PORT}/api/v1/projects/${project}/epics/${epic}`
  };

  return action;
}

// show all tasks without epic

export function showAllEpicTasks() {
  const action = {
    type: SHOW_ALL_EPIC_TASKS,
    showAllEpicTasks: `${PORT}/api/v1/tasks`
  };

  return action;
}

/**
 * Create task by project and epic
 *
 * @param  {object} data task data
 * @param  {number} epic epic id
 *
 */

export function createEpicTask(data, epic) {
  let files = data.file
    ? data.file.map(file => {
        return {
          document: file,
          entity_type: "Task"
        };
      })
    : [];

  let specialist_ids = [];
  data["specIds"] &&
    data["specIds"].split(",").forEach(id => specialist_ids.push(+id));

  return dispatch => {
    Axios({
      method: "post",
      url: `${PORT}/api/v1/epics/${epic}/tasks`,
      data: {
        task: {
          name: data["name"],
          description: data["description"],
          epic_id: epic,
          state: 0,
          specialist_ids,
          eta: data["eta"],
          cost: data["cost"],
          user_story: data["user_story"],
          deliverables: data["deliverables"],
          business_requirements: data["business_requirements"],
          business_rules: data["business_rules"],
          notes: data["notes"],
          attached_files_attributes: files
        },
        attached_files_attributes: {
          document: data["file"]
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        let data = response.data;
        data.successId = Math.random();

        dispatch({
          type: CREATE_EPIC_TASK + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

// update task by epic

export function updateEpicTask(data, epic, task) {
  const action = {
    type: UPDATE_EPIC_TASK,
    payload: data,
    updateEpicTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}`
  };

  return action;
}

/**
 * Delete task by epic
 *
 * @param  {number} epic epic id
 * @param  {number} task task id
 */

export function deleteEpicTask(epic, task) {
  return dispatch => {
    Axios({
      method: "delete",
      url: `${PORT}/api/v1/epics/${epic}/tasks/${task}`
    })
      .then(response => {
        let data = response.data;
        data.successId = Math.random();

        dispatch({
          type: DELETE_EPIC_TASK + SUCCESS,
          data
        });

        return data;
      })
      .then(({ name }) => {
        createNotification({
          type: "success",
          text: `${name ? `${name} epic ` : "Epic"} was deleted`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

// show all tasks by epic

export function showEpicTasks(epic) {
  const action = {
    type: SHOW_EPIC_TASKS,
    epic,
    showEpicTasks: `${PORT}/api/v1/epics/${epic}/tasks`
  };

  return action;
}

export function assignSpecialistToTask(epic, task, data) {
  const action = {
    type: ASSIGN_SPECIALIST_TO_TASK,
    payload: data,
    assignSpecialistToTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}/assign`
  };

  return action;
}

export function removeSpecialistFromTask(epic, task, data) {
  const action = {
    type: REMOVE_SPECIALIST_FROM_TASK,
    removeSpecialistFromTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}/remove/${data}`
  };

  return action;
}

// Show all Teams

export function showAllTeams() {
  const action = {
    type: SHOW_ALL_TEAMS,
    showAllTeams: `${PORT}/api/v1/teams`
  };

  return action;
}

// get array of all teams, assigned on customer projects

export function showClientTeams() {
  const action = {
    type: SHOW_CLIENT_TEAMS,
    showClientTeams: `${PORT}/api/v1/customers/`
  };

  return action;
}

// Show Project Team

export function showProjectTeam(project) {
  const action = {
    type: SHOW_PROJECT_TEAM,
    showProjectTeam: `${PORT}/api/v1/projects/${project}/teams`
  };

  return action;
}

// Show Custom Team

export function showCustomTeam(team) {
  const action = {
    type: SHOW_CUSTOM_TEAM,
    showCustomTeam: `${PORT}/api/v1/custom_team/${team}`
  };

  return action;
}

// Assign specialist to team

export function assignSpecialistToTeam(project, team, data) {
  const action = {
    type: ASSIGN_SPECIALIST_TO_TEAM,
    payload: data,
    assignSpecialistToTeam: `${PORT}/api/v1/projects/${project}/teams/${team}/assign`
  };

  return action;
}

// Remove specialist from team

export function removeSpecialistFromTeam(project, team, specialist) {
  const action = {
    type: REMOVE_SPECIALIST_FROM_TEAM,
    removeSpecialistFromTeam: `${PORT}/api/v1/projects/${project}/teams/${team}/remove/${specialist}`
  };

  return action;
}

/**
 * Create custom team
 *
 * @param  {object} data // payload
 * @param  {number} specialistId // The id of the specialist who is creating team
 */

export function createCustomTeam(data, specialistId) {
  return async dispatch => {
    await Axios({
      method: "post",
      url: `${PORT}/api/v1/teams`,
      data: {
        team: {
          name: data["name"],
          specialist_id: specialistId,
          custom_team: true
        }
      }
    })
      .then(({ data }) => {
        dispatch({
          type: CREATE_CUSTOM_TEAM + SUCCESS,
          data: data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Create team channel
 *
 * @param  {number} team team id
 * @param  {object} data channel data
 */

export function createTeamChannel(team, data) {
  return dispatch => {
    Axios({
      method: "post",
      url: `${PORT}/api/v1/teams/${team}/channels`,
      data: {
        name: data["name"]
      }
    })
      .then(({ data }) => {
        dispatch({
          type: CREATE_CHANNEL + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Delete team channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 *
 */

export function deleteTeamChannel(team, channel) {
  return dispatch => {
    Axios({
      method: "delete",
      url: `${PORT}/api/v1/teams/${team}/channels/${channel}`
    })
      .then(({ data }) => {
        dispatch({
          type: DELETE_CHANNEL + SUCCESS,
          data
        });

        return data;
      })
      .then(({ name }) => {
        createNotification({
          type: "success",
          text: `${name ? `${name} channel ` : "Channel"} was deleted`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Update team channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 * @param  {object} data channel data
 *
 */

export function updateTeamChannel(team, channel, data) {
  return dispatch => {
    Axios({
      method: "put",
      url: `${PORT}/api/v1/teams/${team}/channels/${channel}`,
      data: {
        name: data["name"]
      }
    })
      .then(({ data }) => {
        dispatch({
          type: UPDATE_CHANNEL + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

// Show all chanels of team

export function showChannels(team) {
  const action = {
    type: SHOW_CHANNELS,
    team,
    showChannels: `${PORT}/api/v1/teams/${team}/channels`
  };

  return action;
}

/**
 * Add member to team channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 * @param  {number} data specilalist id
 *
 */

export function addToChannel(team, channel, data) {
  return dispatch => {
    Axios({
      method: "PUT",
      url: `${PORT}/api/v1/teams/${team}/channels/${channel}/assign`,
      data: {
        specialist_id: data
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        dispatch({
          type: ADD_MEMBER_TO_CHANNEL + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Remove member from channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 * @param  {number} id specialist id
 *
 */

export function removeFromChannel(team, channel, id) {
  return dispatch => {
    Axios({
      method: "DELETE",
      url: `${PORT}/api/v1/teams/${team}/channels/${channel}/remove/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        dispatch({
          type: REMOVE_MEMBER_FROM_CHANNEL + SUCCESS,
          data
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}

/**
 * Search specialist by name\skill
 *
 * @param {number} id The id of the user. Optional parameter only for core specialist
 */

export function searchSpecialist(payload, id) {
  const action = {
    type: SEARCH_SPECIALIST,
    payload,
    id,
    searchSpecialist: `${PORT}/api/v1/specialists/search`
  };

  return action;
}

export function searchSpecialistForProject(project) {
  const action = {
    type: SEARCH_SPECIALIST_FOR_PROJECT,
    searchSpecialistForProject: `${PORT}/api/v1/specialists/search?project_id=${project}`
  };

  return action;
}

export function showConfirmationModal(payload) {
  const action = {
    type: SHOW_CONFIRMATION_MODAL,
    payload
  };

  return action;
}

export function closeConfirmationModal() {
  const action = {
    type: CLOSE_CONFIRMATION_MODAL
  };

  return action;
}

export function showSubmitErrorModal() {
  const action = {
    type: SHOW_SUBMIT_ERROR_MODAL
  };

  return action;
}

export function closeSubmitErrorModal() {
  const action = {
    type: CLOSE_SUBMIT_ERROR_MODAL
  };

  return action;
}

/**
 * Returns an object of project data
 *
 * @param  {object} payload project data
 * @param  {string} logo logo of the project. Optional parametr
 * @returns {object}
 *
 */

function postProject(payload, logo = null) {
  let files = payload.file
    ? payload.file.map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  let skill_ids =
    payload["skills"] &&
    payload["skills"].map(skill => {
      return skill.value;
    });

  return {
    name: payload["name"],
    customer_id: id,
    description: payload["description"],
    user_story: payload["user_story"],
    state: payload["state"],
    business_requirements: payload["requirements"],
    business_rules: payload["rules"],
    deliverables: payload["criteria"],
    further_notes: payload["solution"],
    logo: logo,
    attached_files_attributes: files,
    team_attributes: {
      name: payload["name"],
      specialist_id: null,
      custom_team: false
    },
    skill_ids
  };
}

/**
 * Returns an object of client profile data
 *
 * @param  {object} data client profile data
 * @param  {string} image avatar of the client. Optional parametr
 * @returns {object}
 *
 */

function clientProfile(data, image = null) {
  return {
    avatar: image,
    first_name: data["first_name"],
    last_name: data["last_name"],
    phone_number: data["phone_number"],
    email: data["email"],
    description: data["description"],
    address_attributes: {
      city: data["city"],
      country: data["country"],
      user_id: id
    }
  };
}

/**
 * Returns an object of specialist profile data
 *
 * @param  {object} data specialits data
 * @param  {array} education specialist education data
 * @param  {array} experience specialist experience data
 * @param  {string} image avatar of the specialist. Optional parametr
 * @returns {object}
 *
 */

function specialistProfile(data, education, experience, image) {
  const educationData = education.map(item => {
    return {
      name: item["name"],
      specialisation: item["specialisation"],
      started_at: item["started_at"]["value"] || item["started_at"],
      finished_at: item["finished_at"]["value"] || item["finished_at"],
      degree: item["degree"],
      description: item["description"]
    };
  });

  const experienceData = experience.map(item => {
    return {
      name: item["name"],
      country: item["country"],
      city: item["city"],
      position: item["position"],
      started_at: item["started_at"]["value"] || item["started_at"],
      finished_at: item["finished_at"]["value"] || item["finished_at"],
      description: item["description"]
    };
  });

  return {
    avatar: image || null,
    first_name: data["first_name"],
    last_name: data["last_name"],
    phone_number: data["phone_number"],
    email: data["email"],
    professional_experience_info: data["professional_experience_info"],
    educations_attributes: educationData,
    work_experiences_attributes: experienceData,
    address_attributes: {
      city: data["city"],
      country: data["country"],
      user_id: id
    }
  };
}
