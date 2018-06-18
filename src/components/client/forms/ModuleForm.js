import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { NavLink } from "react-router-dom";
import {
  required,
  date,
  maxLength80,
  minLength2
} from "../../../helpers/validate";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import RenderFile from "../../forms/renders/RenderFile";
import StyledModuleLink from "../../../styleComponents/StyledModuleLink";
import InputField from "../../forms/renders/InputField";
import RenderField from "../../forms/renders/RenderField";

class ModuleForm extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <StyledModuleLink className="moduleNumber">
              <NavLink to="#">Module number </NavLink>
            </StyledModuleLink>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Field
              name="name"
              component={RenderField}
              label="Module name"
              className="moduleName"
              validate={[required, minLength2, maxLength80]}
              isRequired
              padded
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Grid>
              {/* <Grid.Column computer={6}>
                <Field
                  name="status"
                  component={RenderSelect}
                  label="status"
                  small
                />
              </Grid.Column> */}
              <Grid.Column computer={6}>
                <Field
                  name="eta"
                  component={RenderDate}
                  type="date"
                  label="Estimate"
                  className="estimate"
                  validate={[required, date]}
                  isRequired
                  handleEtaForm={this.props.handleEtaForm}
                  padded
                  small
                />
              </Grid.Column>
            </Grid>
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
              isRequired
              padded
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Field
              name="attached_files"
              type="file"
              component={RenderFile}
              label="Attach files"
              className="area"
              padded
              indentTop
            />
          </Grid.Column>
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
          <Grid.Column computer={8}>
            <Field
              name="rules"
              component={RenderTextArea}
              label="Business Rules"
              className="area"
              padded
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ModuleForm;
