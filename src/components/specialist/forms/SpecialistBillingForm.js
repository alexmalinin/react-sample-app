import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import RenderField from '../../forms/renders/RenderField';
import BillingForm from "./BillingForm";

let renderError = true;

class SpecialistBillingForm extends Component {

  render() {

    return (
      <form onSubmit={this.props.handleSubmit} handleFormField={this.props.handleFormField} swichTab={this.props.swichTab}>
        <BillingForm { ...this.props }/>
      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && nextProps.specialistData.specialist_billing) {
      if (renderError) {
        this.fillFields(nextProps.specialistData.specialist_billing);
        renderError = false;
      }
    }
  }

  fillFields = data => {
    // let { name, company_address, website, number_of_employers, country, city, segment} = data;

    for(var key in data) {
      this.props.dispatch(change('SpecialistBillingForm', key, data[key]));
    }
    // this.props.dispatch(change('SpecialistBillingForm', 'name',                   name));
    // this.props.dispatch(change('SpecialistBillingForm', 'company_address',        company_address));
  }

}

SpecialistBillingForm = reduxForm({
  form: 'SpecialistBillingForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(SpecialistBillingForm);

const selector = formValueSelector('SpecialistBillingForm');

export default connect(
  state => {
    const { specialistData } = state;
    return { specialistData }
  }
)(SpecialistBillingForm);
