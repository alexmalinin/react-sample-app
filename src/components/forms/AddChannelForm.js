import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { Field } from 'react-redux-form';
import RenderField from "../forms/renders/RenderField";
import InputField from "./renders/InputField";
import { Input } from "semantic-ui-react";

class AddChannelForm extends Component {
  render() {
    const { handleSubmit, submitting, projects, team } = this.props;

    return (
      <form className="addChannel" onSubmit={handleSubmit}>
        <Field
          type="text"
          placeholder="#Add channel"
          component={RenderField}
          name={``}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "CreateChannelForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(AddChannelForm);
