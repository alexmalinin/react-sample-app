import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderDate from "../../forms/renders/RenderDate";
import { Grid } from "semantic-ui-react";
import RenderFile from "../../forms/renders/RenderFile";
import RenderText from "../../forms/renders/RenderText";
import RenderField from "../../forms/renders/RenderField";
import axios from "axios";
import { PORT } from "../../../constants/constants";
import { S_REDGUY, CUSTOMER } from "../../../constants/user";
import { getUserRole, oneOfRoles } from "../../../helpers/functions";

class EditEpicForm extends Component {
  handleEtaForm = date => {
    this.props.dispatch(change("ClientModuleForm", "eta", date));
    this.handleSubmit("eta", date);
  };

  //TODO: apply thunk here
  handleSubmit = (name, value) => {
    const {
      epic: { id, project_id },
      setEdited
    } = this.props;

    setEdited();

    return axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${project_id}/epics/${id}`,
      data: {
        epic: {
          [name]: value
        }
      }
    });
  };

  render() {
    const {
      handleSubmit,
      number,
      epic: { eta }
    } = this.props;

    const disabled = !oneOfRoles(S_REDGUY, CUSTOMER);

    return (
      <Form onSubmit={handleSubmit} disabled={disabled}>
        <Grid>
          <Grid.Row>
            <h4 className="modalHeader">Module {number}</h4>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={10}>
              <Field
                name="name"
                label="Module name"
                className="transparent"
                placeholder="Choose name for your module"
                component={RenderField}
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="description"
                label="Brief / Description"
                className="transparent"
                placeholder="Type your description here"
                autoHeight
                component={RenderText}
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="user_story"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your user story here"
                label="User Story"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="deliverables"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your acceptance criterea here"
                label="Acceptance criteria"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="notes"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your solution design here"
                label="Solution design"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="business_requirements"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your business requirements here"
                label="Business Requirements"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="business_rules"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your business rules here"
                label="Business Rules"
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
            </Grid.Column>
            <Grid.Column computer={6}>
              <Grid padded="vertically" className="float">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Field
                      name="eta"
                      component={RenderDate}
                      type="date"
                      label="Estimate"
                      className="transparent clear estimate"
                      validate={[required]}
                      required
                      initData={eta}
                      handleEtaForm={this.handleEtaForm}
                      disabled={disabled}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field
                      name="cost"
                      placeholder="0"
                      component={RenderField}
                      label="Cost"
                      className="transparent"
                      disabled
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Field
                name="attached_files"
                type="file"
                component={RenderFile}
                label="Attach files"
                submitSucceeded={this.props.submitSucceeded}
                onSelfSubmit={this.handleSubmit}
                entity_type="Module"
                dropzone
                small
                disabled={disabled}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default reduxForm({
  form: "EditEpicForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(EditEpicForm);
