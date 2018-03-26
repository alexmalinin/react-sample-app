import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import RenderField from '../../forms/renders/RenderField';
import CompanyForm from "./CompanyForm";

let renderError = true;

class SpecialistCompanyForm extends Component {
  
  render() {

    return (
      <form onSubmit={this.props.handleSubmit} handleFormField={this.props.handleFormField}>
        <CompanyForm { ...this.props }/>
      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && nextProps.specialistData.company) {
      if (renderError) {
        this.fillFields(nextProps.specialistData.company);
        renderError = false;
      }
    }
  }

  fillFields = data => {
    let { name, company_address, website, number_of_employers, country, city, segment} = data;

    this.props.dispatch(change('SpecialistCompanyForm', 'name',                   name));
    this.props.dispatch(change('SpecialistCompanyForm', 'company_address',        company_address));
    this.props.dispatch(change('SpecialistCompanyForm', 'industry',               data.industry_area_id));
    this.props.dispatch(change('SpecialistCompanyForm', 'website',                data.website));
    this.props.dispatch(change('SpecialistCompanyForm', 'number_of_employers',    data.number_of_employers));
    this.props.dispatch(change('SpecialistCompanyForm', 'country',                data.country));
    this.props.dispatch(change('SpecialistCompanyForm', 'city',                   data.city));
    this.props.dispatch(change('SpecialistCompanyForm', 'segment',                 data.segment));
  }

}

SpecialistCompanyForm = reduxForm({
  form: 'SpecialistCompanyForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(SpecialistCompanyForm);

const selector = formValueSelector('SpecialistCompanyForm');

export default connect(
  state => {
    const { specialistData } = state;
    return { specialistData }
  }
)(SpecialistCompanyForm);
