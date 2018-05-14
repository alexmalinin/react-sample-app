import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
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

let renderError = true;

class ClientCompanyForm extends Component {
  state = {
    formData: {},
    submitError: false
  };

  render() {
    const {
      handleSubmit,
      submitting,
      clientData,
      industries,
      isEditing,
      isEdited
    } = this.props;

    return (
      <form onSubmit={handleSubmit} onChange={this.handleChange}>
        <CompanyForm
          industries={industries}
          clientData={clientData}
          submitting={submitting}
          isEditing={isEditing}
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
    let client = nextProps.clientData;

    if (client) {
      if (client.successId) {
        if (renderError) {
          this.fillFields(client);
          renderError = false;
        }
      }
    }

    if (nextProps.submitFailed && Object.keys(this.state.formData).length > 0) {
      this.setState({ submitError: true });
    } else {
      this.setState({ submitError: false });
    }
  }

  fillFields = data => {
    let { company } = data;

    if (company) {
      for (let key in company) {
        this.props.dispatch(change("ClientCompanyForm", key, company[key]));
      }
      this.props.dispatch(
        change("ClientCompanyForm", "industry", company.industry_area_id)
      );
    }
  };
}

ClientCompanyForm = reduxForm({
  form: "ClientCompanyForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientCompanyForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientCompanyForm);
