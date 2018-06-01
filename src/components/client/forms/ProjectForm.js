import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import { clientCategories } from "../../../helpers/selects/clientCategories";
import { SaveBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import RenderImage from "../../forms/renders/RenderImage";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { employeers } from "../../../helpers/selects/employeers";
import RenderFile from "../../forms/renders/RenderFile";
import RenderSkillsArea from "../../forms/renders/RenderSkillsArea";
import { renameObjPropNames } from "../../../helpers/functions";

class ProjectForm extends Component {
  render() {
    const { submitting, clientData, skills } = this.props;

    let { logo } = clientData || false;

    if (skills) {
      skills.forEach(skill => {
        renameObjPropNames(skill, "id", "value");
        renameObjPropNames(skill, "name", "label");
      });
      skills.sort((a, b) => {
        if (a.label < b.label) return -1;
        else if (a.label > b.label) return 1;
        else return 0;
      });
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={8} verticalAlign="bottom">
            <InputField
              name="name"
              label="Project name"
              validate={[required]}
              isRequired
              padded
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Field
              name="logo"
              component={RenderImage}
              projectLogo
              type="file"
              logo={logo}
              placeholder="Choose project logo"
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Field
              name="description"
              component={RenderTextArea}
              label="Brief / Description"
              className="area"
              padded
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Field
              name="file"
              type="text"
              component={RenderFile}
              label="Attach files"
              className="area"
              padded
              dropzone
              createProject
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
              validate={[required]}
              isRequired
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
          <Grid.Column computer={8}>
            <RenderSkillsArea
              options={skills}
              label="Technologies"
              name="skills"
              handleSelectChange={this.props.handleSelectChange}
              placeholder=""
              large
              padded
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProjectForm;
