import React, { Component } from 'react';
import { Field, reduxForm, change, reset } from 'redux-form';
import { connect } from 'react-redux';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import ModuleForm from './ModuleForm';

let renderError = true;

class ClientModuleForm extends Component {
  componentWillMount() {
    this.clearFileds();
  }

  clearFileds = () => {
    this.props.dispatch(reset('ClientModuleForm'));
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ModuleForm submitting={submitting}/>
      </form>
    )
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

