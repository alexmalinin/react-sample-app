import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import CompanyForm from "./CompanyForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";
import { checkObjectPropertiesForValues } from "../../../helpers/functions";

let renderError = true;

class SpecialistCompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchSubmitError: true,
      submitError: false
    };
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <CompanyForm
          {...this.props}
          handleSubmitError={this.handleSubmitError}
          handleSelectChange={this.handleSelectChange}
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

SpecialistCompanyForm = reduxForm({
  form: "SpecialistCompanyForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(SpecialistCompanyForm);

export default connect(state => {
  const { specialistData } = state;

  let initialValues = {};

  if (specialistData) {
    const { company } = specialistData;

    initialValues = {
      name: company && company.name,
      company_address: company && company.company_address,
      website: company && company.website,
      number_of_employers: company && company.number_of_employers,
      country: company && company.country,
      city: company && company.city,
      segment: company && company.segment,
      industry: company && company.industry_area_id
    };
  }

  return {
    specialistData,
    initialValues
  };
})(SpecialistCompanyForm);
