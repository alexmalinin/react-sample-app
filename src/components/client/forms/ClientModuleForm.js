import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import ModuleForm from './ModuleForm';

let renderError = true;

class ClientModuleForm extends Component {

  render() {
    const { handleSubmit, submitting, clientData } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ModuleForm clientData={clientData} submitting={submitting}/>
      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;

    if (client) {
      if(client.successId) {
        if (renderError) {
          this.fillFields(client);
          renderError = false;
        }
      }
    }
  }

  fillFields = data => {
    let { project } = data;
    console.log(data);

  }
}

ClientModuleForm = reduxForm({
  form: 'ClientModuleForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ClientModuleForm);

export default connect(
  state => {
    const { clientData } = state;
    return { clientData }
  })(ClientModuleForm);

