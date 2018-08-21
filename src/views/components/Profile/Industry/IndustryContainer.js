import { connect } from "react-redux";

import Industry from "./Industry";

import { getUserData } from "@ducks/user/actions";
import { profileOperations } from "@ducks/profile";
import { skillsOperations } from "@ducks/skills";
import { industryOperations } from "@ducks/industries";
import { experienceLevelOperations } from "@ducks/experienceLevels";
import { projectTypesOperations } from "@ducks/projectTypes";
import { modalsOperations } from "@ducks/modals";

import { getDataForSelect } from "@utilities/selectors";

const mapStateToProps = () => {
  const prepareIndustries = getDataForSelect(),
    prepareProjectTypes = getDataForSelect(),
    prepareExperienceLevels = getDataForSelect(),
    prepareSkills = getDataForSelect();

  return ({
    profile: { info, industry },
    skills,
    experienceLevelsReducer: {
      experienceLevels,
      loading: experienceLevelsLoading
    },
    industriesReducer: { industries, loading: industriesLoading },
    projectTypesReducer: { projectTypes, loading: projectTypesLoading }
  }) => {
    const { project_type, industry_area_id } = industry;

    let industryArea = null;

    if (industries[industry_area_id - 1]) {
      const { value, label } = industries[industry_area_id - 1];

      industryArea = value;
    }

    let renderSkills = [];

    industry.skills &&
      industry.skills.forEach(item => {
        renderSkills.push({ label: item["name"], value: item["id"] });
      });

    return {
      avatar: info.avatar,
      skills: prepareSkills(skills, "value, text"),
      industries: prepareIndustries(industries, "value", "text"),
      industriesLoading,
      experienceLevels: prepareExperienceLevels(
        experienceLevels,
        "value",
        "text"
      ),
      experienceLevelsLoading,
      projectTypes: prepareProjectTypes(projectTypes, "value", "text"),
      projectTypesLoading,
      initialValues: {
        job_title: industry.job_title,
        position: industry.position,
        contact_number: industry.contact_number,
        industry_title: industry.industry_title,
        communication_type: industry.communication_type,
        availability: industry.available,
        hourly_rate: industry.hourly_rate,
        experience_level: industry.experience_level_id,
        industry_area_id: industryArea,
        project_type: project_type && project_type.id,
        skills_attributes: renderSkills
      }
    };
  };
};

const mapDispatchToProps = {
  getUserData,
  updateSpecialistIndustry: profileOperations.updateSpecialistIndustry,
  showSubmitErrorModal: modalsOperations.showSubmitErrorModal,
  ...skillsOperations,
  ...industryOperations,
  ...experienceLevelOperations,
  ...projectTypesOperations
};

export default connect(mapStateToProps, mapDispatchToProps)(Industry);
