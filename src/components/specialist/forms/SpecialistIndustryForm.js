import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, formValueSelector } from "redux-form";
import SkillsForm from "./SkillsForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

let renderError = true;

class SpecialistIndustryForm extends Component {
  constructor() {
    super();

    this.state = {
      formData: {},
      submitError: false
    };
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <SkillsForm
          {...this.props}
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          handleCheckboxChange={this.handleCheckboxChange}
        />
        <SubmitFormErrorModal
          isOpen={this.state.submitError}
          close={this.closeErrorModal}
        />
      </form>
    );
  }

  closeErrorModal = () => {
    this.setState({ submitError: false });
  };

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value === "" ? null : e.target.value
      }
    });
  };

  handleCheckboxChange = (e, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: value || null
      }
    });
  };

  handleSelectChange = (e, name) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: e.value || null
      }
    });
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.formData) {
      this.props.handleFormValueChange(nextState.formData);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.specialistData) {
      if (renderError) {
        this.fillFields(nextProps.specialistData);
        renderError = false;
      }
    }

    if (nextProps.submitFailed) {
      this.setState({ submitError: true });
    } else {
      this.setState({ submitError: false });
    }
  }

  fillFields = data => {
    let {
      job_title,
      position,
      contact_number,
      project_interest,
      skills,
      specialities,
      industry_title,
      communication_type,
      available,
      hourly_rate,
      project_type,
      experience_level_id
    } = data;
    let renderSkills = [];

    skills &&
      skills.forEach(item => {
        renderSkills.push({ label: item["name"], value: item["id"] });
      });

    let renderSpecialities = {};
    specialities &&
      specialities.forEach(item => {
        return (renderSpecialities["_" + item["id"]] = true);
      });

    if (project_type) {
      let renderProjectTypes = {
        label: project_type["name"],
        value: project_type["id"]
      };
      this.props.dispatch(
        change("SpecialistIndustryForm", "project_type", renderProjectTypes)
      );
    }

    this.props.dispatch(
      change("SpecialistIndustryForm", "job_title", job_title)
    );
    this.props.dispatch(change("SpecialistIndustryForm", "position", position));
    this.props.dispatch(
      change("SpecialistIndustryForm", "contact_number", contact_number)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "project_interest", project_interest)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "experience_level", experience_level_id)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "industry_title", industry_title)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "skills_attributes", renderSkills)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "communication_type", communication_type)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "hourly_rate", hourly_rate)
    );
    this.props.dispatch(
      change("SpecialistIndustryForm", "availability", available)
    );

    if (specialities[0]) {
      this.props.dispatch(
        change("SpecialistIndustryForm", "industry", {
          label: specialities[0].industry_area["name"],
          value: specialities[0].industry_area["id"]
        })
      );
    }
    Object.keys(renderSpecialities).length > 0 &&
      this.props.dispatch(
        change("SpecialistIndustryForm", "speciality_ids", renderSpecialities)
      );
  };
}

SpecialistIndustryForm = reduxForm({
  form: "SpecialistIndustryForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SpecialistIndustryForm);

const selector = formValueSelector("SpecialistIndustryForm");

SpecialistIndustryForm = connect(state => {
  const industry = selector(state, "industry");
  const projectType = selector(state, "projectType");
  const experienceLevel = selector(state, "experienceLevel");
  const { specialistData } = state;
  return { industry, specialistData, projectType, experienceLevel };
})(SpecialistIndustryForm);

export default SpecialistIndustryForm;
