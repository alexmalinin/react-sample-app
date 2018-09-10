import { connect } from "react-redux";

import Industry from "./Industry";

import { getUserData } from "@ducks/user/actions";
import { updateSpecialistIndustry } from "@ducks/profile/actions";
import { skillsOperations } from "@ducks/skills";
import { industryOperations } from "@ducks/industries";
import { experienceLevelOperations } from "@ducks/experienceLevels";
import { projectTypesOperations } from "@ducks/projectTypes";
import { showSubmitErrorModal } from "@ducks/modals/actions";

import { getDataForSelect } from "@utilities/selectors";

const makeMapStateToProps = () => {
  const prepareIndustries = getDataForSelect(),
    prepareProjectTypes = getDataForSelect(),
    prepareExperienceLevels = getDataForSelect(),
    prepareSkills = getDataForSelect();

  const mapStateToProps = (state, props) => {
    const {
      profile: { info, industry },
      skills,
      experienceLevels,
      industriesReducer: { industries, loading: industriesLoading },
      projectTypesReducer: { projectTypes, loading: projectTypesLoading }
    } = state;

    const { project_type, industry_area_id } = industry;

    let renderSkills = [];

    industry.skills &&
      industry.skills.forEach(item => {
        renderSkills.push({ label: item["name"], value: item["id"] });
      });

    return {
      avatar: info.avatar,
      skills: prepareSkills(skills, "value", "label"),
      industries: prepareIndustries(industries),
      industriesLoading,
      experienceLevels: prepareExperienceLevels(experienceLevels),
      experienceLevelsLoading: experienceLevels.loading,
      projectTypes: prepareProjectTypes(projectTypes),
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
        industry_area_id: industry_area_id,
        project_type: project_type && project_type.id,
        skills_attributes: renderSkills
      }
    };
  };

  return mapStateToProps;
};

const mapDispatchToProps = {
  getUserData,
  updateSpecialistIndustry,
  showSubmitErrorModal,
  ...skillsOperations,
  ...industryOperations,
  ...experienceLevelOperations,
  ...projectTypesOperations
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Industry);
