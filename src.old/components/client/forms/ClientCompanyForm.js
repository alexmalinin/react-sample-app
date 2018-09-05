import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change, getFormValues } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import { clientCategories } from "../../../helpers/selects/clientCategories";
import { DvButton } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import LocationField from "../../forms/renders/LocationField";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import CompanyForm from "./CompanyForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

class ClientCompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchSubmitError: true,
      submitError: false
    };
  }

  render() {
    const {
      handleSubmit,
      submitting,
      clientData,
      industries,
      isEditing
    } = this.props;

    return (
      <form onSubmit={handleSubmit} onChange={this.handleChange}>
        <CompanyForm
          industries={industries}
          clientData={clientData}
          submitting={submitting}
          isEditing={isEditing}
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

ClientCompanyForm = reduxForm({
  form: "ClientCompanyForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(ClientCompanyForm);

export default connect(state => {
  const { clientData } = state;

  const companyData = (clientData && clientData.company) || {};

  const {
    name,
    city,
    abn_acn,
    tell_about,
    company_address,
    country,
    industry_area_id,
    number_of_employers,
    segment,
    website,
    registered_name
  } = companyData;

  return {
    clientData,
    initialValues: {
      name,
      city,
      abn_acn,
      tell_about,
      company_address,
      country,
      number_of_employers,
      segment,
      website,
      registered_name,
      industry: industry_area_id
    }
  };
})(ClientCompanyForm);
