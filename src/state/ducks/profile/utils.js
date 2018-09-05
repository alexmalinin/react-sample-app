import jwtDecode from "jwt-decode";

export const getUserInfo = ({
  id,
  first_name,
  last_name,
  avatar,
  email,
  address,
  city,
  country,
  phone_number,
  professional_experience_info,
  project_interest,
  educations,
  work_experiences
}) => ({
  id,
  first_name,
  last_name,
  avatar,
  email,
  address,
  city,
  country,
  phone_number,
  professional_experience_info,
  project_interest,
  educations,
  work_experiences
});

export const getSpecialistIndustry = ({
  job_title,
  position,
  industry_title,
  experience_level_id,
  industry_area_id,
  contact_number,
  project_type,
  hourly_rate,
  available,
  skills,
  communication_type
}) => ({
  job_title,
  position,
  industry_title,
  experience_level_id,
  industry_area_id,
  contact_number,
  project_type,
  hourly_rate,
  available,
  skills,
  communication_type
});

export function getSkillsAttr(data) {
  return data.skills_attributes
    ? data.skills_attributes.map(attr => {
        return { name: attr.label, id: +attr.value };
      })
    : null;
}

export function getSpecAttr(data) {
  return data.speciality_ids
    ? Object.keys(data.speciality_ids).map(item => +item.match(/\d+/)[0])
    : null;
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

export function specialistProfile(
  data,
  education = [],
  experience = [],
  image
) {
  const token = localStorage.getItem("jwt_token");
  const { user_id } = jwtDecode(token);

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
    ...(!!image && { avatar: image }),
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
      user_id
    }
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

export function clientProfile(data, image = null) {
  const token = localStorage.getItem("jwt_token");
  const { user_id } = jwtDecode(token);

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
      user_id
    }
  };
}
