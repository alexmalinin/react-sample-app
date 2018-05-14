import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required, date } from "../../../helpers/validate";
import RenderDate from "../../forms/renders/RenderDate";
import { DvButton } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { StyledLabelArea } from "../../../styleComponents/forms/StyledTextArea";
import ModuleForm from "./ModuleForm";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderFile from "../../forms/renders/RenderFile";
import RenderField from "../../forms/renders/RenderField";

let renderError = true;

class EditEpicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: true
    };
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8}>
              <Field
                name="name"
                component={RenderField}
                label="Module name"
                className="moduleName"
                validate={[required]}
                padded
              />
            </Grid.Column>
            <Grid.Column computer={4}>
              <Field
                name="status"
                component={RenderSelect}
                label="status"
                small
              />
            </Grid.Column>
            <Grid.Column computer={4}>
              <Field
                name="eta"
                component={RenderDate}
                type="date"
                label="Estimate"
                className="estimate"
                validate={[required]}
                initData={this.props.epic.eta}
                handleEtaForm={this.handleEtaForm}
                padded
                small
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column computer={8}>
              <Field
                name="description"
                component={RenderTextArea}
                label="Brief / Description"
                className="area"
                validate={[required]}
                padded
              />
            </Grid.Column>
            <Grid.Column computer={8}>
              <Field
                name="file"
                type="file"
                component={RenderFile}
                label="Attach files"
                className="area"
                padded
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column computer={8}>
              <Field
                name="user_story"
                component={RenderTextArea}
                label="User Story"
                className="area"
                large
                padded
              />
            </Grid.Column>
            <Grid.Column computer={8}>
              <Field
                name="criteria"
                component={RenderTextArea}
                label="Acceptance criteria"
                className="area"
                large
                padded
              />
            </Grid.Column>
            {/* </Grid.Row>

            <Grid.Row> */}
            <Grid.Column computer={8}>
              <Field
                name="requirements"
                component={RenderTextArea}
                label="Business Requirements"
                className="area"
                large
                padded
              />
            </Grid.Column>
            <Grid.Column computer={8}>
              <Field
                name="solution"
                component={RenderTextArea}
                label="Solution design"
                className="area"
                large
                padded
              />
            </Grid.Column>
            {/* </Grid.Row>

            <Grid.Row> */}
            <Grid.Column computer={16}>
              <Field
                name="rules"
                component={RenderTextArea}
                label="Business Rules"
                className="area"
                padded
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={3} />
            <Grid.Column computer={10}>
              <DvButton
                type="submit"
                disabled={submitting}
                content="SAVE"
                primary
                xsindent="true"
                smallbtn="true"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.epic && this.state.fetch) {
      this.fillFields(nextProps.epic);
      this.setState({
        fetch: false
      });
    }
  }

  fillFields = data => {
    let {
      name,
      description,
      user_story,
      deliverables,
      business_requirements,
      notes,
      business_rules,
      eta
    } = data;

    this.props.dispatch(change("EditEpicForm", "name", name));
    this.props.dispatch(change("EditEpicForm", "description", description));
    this.props.dispatch(change("EditEpicForm", "user_story", user_story));
    this.props.dispatch(change("EditEpicForm", "criteria", deliverables));
    this.props.dispatch(
      change("EditEpicForm", "requirements", business_requirements)
    );
    this.props.dispatch(change("EditEpicForm", "eta", eta));
    this.props.dispatch(change("EditEpicForm", "solution", notes));
    this.props.dispatch(change("EditEpicForm", "rules", business_rules));
  };

  handleEtaForm = date => {
    this.props.dispatch(change("ClientModuleForm", "eta", date));
  };

  closeModal = ev => {
    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };

  componentWillUnmount() {
    renderError = true;
  }
}

export default reduxForm({
  form: "EditEpicForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(EditEpicForm);
