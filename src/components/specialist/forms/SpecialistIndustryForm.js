import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, getFormValues } from "redux-form";
import SkillsForm from "./SkillsForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

let renderError = true;

class SpecialistIndustryForm extends Component {
  constructor() {
    super();

    this.state = {
      formData: {},
      fetchFormValues: true,
      fetchSubmitError: true,
      submitError: false
    };

    this.initialFormValues = null;
  }

  componentWillMount() {
    if (this.props.specialistData) {
      this.fillFields(this.props.specialistData);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <SkillsForm
          {...this.props}
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          handleCheckboxChange={this.handleCheckboxChange}
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
    this.props.handleFormChange(nextState.formData, this.initialFormValues);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.specialistData) {
      if (renderError) {
        this.fillFields(nextProps.specialistData);
        renderError = false;
      }
    }

    if (nextProps.formValues) {
      if (this.state.fetchFormValues) {
        this.initialFormValues = nextProps.formValues;

        this.setState({
          formData: nextProps.formValues,
          fetchFormValues: false
        });
      }
    }

    if (nextProps.submitFailed && this.state.fetchSubmitError) {
      this.setState({ submitError: true });
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

SpecialistIndustryForm = connect(state => ({
  formValues: getFormValues("SpecialistIndustryForm")(state)
}))(SpecialistIndustryForm);

export default SpecialistIndustryForm;
