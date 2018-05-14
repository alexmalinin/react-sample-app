import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import CompanyForm from "./CompanyForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

let renderError = true;

class SpecialistCompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      submitError: false
    };
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} onChange={this.handleChange}>
        <CompanyForm
          {...this.props}
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && nextProps.specialistData.company) {
      if (renderError) {
        this.fillFields(nextProps.specialistData.company);
        renderError = false;
      }
    }

    if (nextProps.submitFailed && Object.keys(this.state.formData).length > 0) {
      this.setState({ submitError: true });
    } else {
      this.setState({ submitError: false });
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

export default connect(state => {
  const { specialistData } = state;
  return { specialistData };
})(SpecialistCompanyForm);
