import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues, formValueSelector } from "redux-form";
import SkillsForm from "./SkillsForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

class SpecialistIndustryForm extends Component {
  constructor() {
    super();

    this.state = {
      fetchSubmitError: true,
      submitError: false
    };
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <SkillsForm
          {...this.props}
          handleSubmitError={this.handleSubmitError}
        />
        <SubmitFormErrorModal
          isOpen={this.state.submitError}
          close={this.closeErrorModal}
        />
      </form>
    );
  }

  closeErrorModal = () => {
    this.setState({ submitError: false, fetchSubmitError: false });
  };

  handleSubmitError = () => {
    if (this.props.submitFailed && this.props.invalid) {
      this.setState({ submitError: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.props.handleFormEdit(nextProps.dirty);

    if (
      (nextProps.submitFailed && this.state.fetchSubmitError) ||
      (nextProps.submitFailed && this.props.triggerSubmit)
    ) {
      this.setState({ submitError: true });
    }
  }
}

SpecialistIndustryForm = reduxForm({
  form: "SpecialistIndustryForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(SpecialistIndustryForm);

const selector = formValueSelector("SpecialistIndustryForm");

export default connect(state => {
  const { specialistData, industries, skills } = state;
  const {
    job_title,
    position,
    contact_number,
    specialities,
    industry_title,
    communication_type,
    available,
    hourly_rate,
    project_type,
    experience_level_id,
    industry_area_id
  } = specialistData ? specialistData : {};

  const experienceLevel = selector(state, "experienceLevel"),
    projectType = selector(state, "projectType");

  let renderSkills = [];

  specialistData &&
    specialistData.skills &&
    specialistData.skills.forEach(item => {
      renderSkills.push({ label: item["name"], value: item["id"] });
    });

  // let renderSpecialities = {};
  // specialities &&
  //   specialities.forEach(item => {
  //     return (renderSpecialities["_" + item["id"]] = true);
  //   });

  let renderProjectTypes = null;
  if (project_type) {
    renderProjectTypes = {
      label: project_type["name"],
      value: project_type["id"]
    };
  }

  let industryArea = null;

  if (
    industries &&
    industries["industry"] &&
    industries["industry"][industry_area_id - 1]
  ) {
    const { value, label } = industries["industry"][industry_area_id - 1];

    industryArea = {
      value,
      label
    };
  }

  return {
    specialistData,
    industry_area_id,
    projectType,
    experienceLevel,
    skills,
    initialValues: {
      job_title,
      position,
      contact_number,
      industry_title,
      communication_type,
      availability: available,
      hourly_rate,
      project_type: renderProjectTypes,
      experience_level: experience_level_id,
      industry_area_id: industryArea,
      skills_attributes: renderSkills
      // speciality_ids: renderSpecialities
    },
    formValues: getFormValues("SpecialistIndustryForm")(state)
  };
})(SpecialistIndustryForm);
