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
import { checkObjectPropertiesForValues } from "../../../helpers/functions";

let renderError = true;

class ClientCompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      fetchFormValues: true,
      fetchSubmitError: true,
      submitError: false
    };

    this.initialFormValues = {};
  }

  componentWillMount() {
    if (this.props.clientData) {
      this.fillFields(this.props.clientData);
    }
  }

  componentWillUnmount() {
    this.props.reset();
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
          handleSelectChange={this.handleSelectChange}
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

  handleSelectChange = (e, name) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: e.value || null
      }
    });
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
    let client = nextProps.clientData;

    if (client) {
      if (client.successId) {
        if (renderError) {
          this.fillFields(client);
          renderError = false;
        }
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

ClientCompanyForm = connect(state => ({
  formValues: getFormValues("ClientCompanyForm")(state)
}))(ClientCompanyForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientCompanyForm);
