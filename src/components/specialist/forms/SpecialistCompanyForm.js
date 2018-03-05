import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import {renderField} from '../../forms/renders/RenderField';
import CompanyForm from "./CompanyForm";

let renderError = true;

class SpecialistCompanyForm extends Component {

  render() {

    return (
      <form onSubmit={this.props.handleSubmit}>
        <CompanyForm { ...this.props }/>
      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData) {
      if (renderError) {
        this.fillFields(nextProps.specialistData);
        renderError = false
      }
    }
  }

  fillFields = data => {
    let { name, company_address, website, number_of_employers, country, city, segment} = data;

    this.props.dispatch(change('SpecialistCompanyForm', 'name',                   name));
    this.props.dispatch(change('SpecialistCompanyForm', 'company_address',        company_address));

  }


}

SpecialistCompanyForm = reduxForm({
  form: 'SpecialistCompanyForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(SpecialistCompanyForm);

const selector = formValueSelector('SpecialistCompanyForm');
SpecialistCompanyForm = connect(state => {
  const { specialistData } = state;
  return {specialistData}
})(SpecialistCompanyForm);

export default SpecialistCompanyForm;