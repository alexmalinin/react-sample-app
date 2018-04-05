import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import ProjectForm from "./ProjectForm";

let renderError = true;

class ClientProjectForm extends Component {

  render() {
    const { handleSubmit, submitting, clientData } = this.props;
    // console.log(this.props, 'assa');

    return (
      <form onSubmit={handleSubmit}>
        <ProjectForm clientData={clientData} submitting={submitting}/>
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
    // console.log(data);

  }
}

ClientProjectForm = reduxForm({
  form: 'ClientProjectForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ClientProjectForm);

export default connect(
  state => {
    const { clientData } = state;
    return { clientData }
  })(ClientProjectForm);

