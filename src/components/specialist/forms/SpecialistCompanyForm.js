import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change, getFormValues } from "redux-form";
import CompanyForm from "./CompanyForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";
import { checkObjectPropertiesForValues } from "../../../helpers/functions";

let renderError = true;

class SpecialistCompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      fetchFormValues: true,
      fetchSubmitError: true,
      submitError: false
    };

    this.initialFormValues = null;
  }

  componentWillMount() {
    if (this.props.specialistData && this.props.specialistData.company) {
      this.fillFields(this.props.specialistData.company);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} onChange={this.handleChange}>
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

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value === "" ? null : e.target.value
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

  closeErrorModal = () => {
    this.setState({ submitError: false, fetchSubmitError: false });
  };

  handleSubmitError = () => {
    if (this.props.submitFailed && this.props.invalid) {
      this.setState({ submitError: true });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.isEditing) {
      if (checkObjectPropertiesForValues(nextState.formData)) {
        this.props.handleFormEdit(false);
      } else {
        this.props.handleFormEdit(true);
      }
    }

    if (this.props.isEditing) {
      if (!this.initialFormValues) {
        if (checkObjectPropertiesForValues(nextState.formData)) {
          this.props.handleFormEdit(false);
        } else {
          this.props.handleFormEdit(true);
        }
      } else {
        this.props.handleFormChange(nextState.formData, this.initialFormValues);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && nextProps.specialistData.company) {
      if (renderError) {
        this.fillFields(nextProps.specialistData.company);
        renderError = false;
      }
    }

    if (nextProps.formValues && this.props.isEditing) {
      if (this.state.fetchFormValues) {
        this.initialFormValues = nextProps.formValues;

        this.setState({
          formData: nextProps.formValues,
          fetchFormValues: false
        });
      }
    }

    if (
      (nextProps.submitFailed && this.state.fetchSubmitError) ||
      (nextProps.submitFailed && this.props.triggerSubmit)
    ) {
      this.setState({ submitError: true });
    }
  }

  fillFields = data => {
    let {
      name,
      company_address,
      website,
      number_of_employers,
      country,
      city,
      segment
    } = data;

    this.props.dispatch(change("SpecialistCompanyForm", "name", name));
    this.props.dispatch(
      change("SpecialistCompanyForm", "company_address", company_address)
    );
    this.props.dispatch(
      change("SpecialistCompanyForm", "industry", data.industry_area_id)
    );
    this.props.dispatch(
      change("SpecialistCompanyForm", "website", data.website)
    );
    this.props.dispatch(
      change(
        "SpecialistCompanyForm",
        "number_of_employers",
        data.number_of_employers
      )
    );
    this.props.dispatch(
      change("SpecialistCompanyForm", "country", data.country)
    );
    this.props.dispatch(change("SpecialistCompanyForm", "city", data.city));
    this.props.dispatch(
      change("SpecialistCompanyForm", "segment", data.segment)
    );
  };
}

SpecialistCompanyForm = reduxForm({
  form: "SpecialistCompanyForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SpecialistCompanyForm);

SpecialistCompanyForm = connect(state => ({
  formValues: getFormValues("SpecialistCompanyForm")(state)
}))(SpecialistCompanyForm);

export default connect(state => {
  const { specialistData } = state;
  return { specialistData };
})(SpecialistCompanyForm);
