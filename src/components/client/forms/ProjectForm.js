import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, submit, change } from "redux-form";
import { NavLink } from "react-router-dom";
import { required, maxLength30 } from "../../../helpers/validate";
import RenderSelect from "../../forms/renders/RenderSelect";
import InputField from "../../forms/renders/InputField";
import RenderImage from "../../forms/renders/RenderImage";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import RenderFile from "../../forms/renders/RenderFile";
import RenderSkillsArea from "../../forms/renders/RenderSkillsArea";
import { renameObjPropNames, getUserRole } from "../../../helpers/functions";
import { S_REDGUY } from "../../../constants/user";
import { DvBlueButton } from "../../../styleComponents/layout/DvButton";

class ProjectForm extends Component {
  render() {
    const {
      submitting,
      clientData,
      skills,
      projectTypes,
      allClients
    } = this.props;

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
        <Grid.Row columns={1}>
          <Grid.Column>
            <div className="projectAside">
              <div className="asideInfo">
                <Field
                  name="attached_files"
                  type="text"
                  component={RenderFile}
                  label="Attach files"
                  dropzone
                  createProject
                />
              </div>

              <div className="asideInfo">
                <Field
                  name="logo"
                  component={RenderImage}
                  label="Logo"
                  projectLogo
                  createProject
                  type="file"
                  logo={logo}
                  placeholder="Choose project logo"
                />
              </div>

              <RenderSkillsArea
                options={skills}
                label="Technology"
                name="skills"
                handleSelectChange={this.props.handleSelectChange}
                placeholder="Choose technologies"
                large
              />
            </div>

            <div className="projectMain">
              <div className="title">Create project</div>

              <InputField
                name="name"
                label="Project name"
                placeholder="Type you project name here"
                validate={[required, maxLength30]}
                isRequired
              />

              {getUserRole() === S_REDGUY && (
                <Field
                  name="customer_id"
                  label="Customer"
                  placeholder="Choose a customer"
                  component={RenderSelect}
                  options={allClients}
                  validate={[required]}
                  isRequired
                />
              )}

              <Field
                name="project_type_id"
                component={RenderSelect}
                options={projectTypes}
                label="Project type"
                placeholder="Choose the project type"
              />

              <Field
                name="description"
                component={RenderTextArea}
                label="Brief / Description"
                placeholder="Type your description here"
              />

              <Field
                name="user_story"
                component={RenderTextArea}
                label="User story"
                placeholder="Type your user story here"
                large
                validate={[required]}
                isRequired
              />

              <Field
                name="criteria"
                component={RenderTextArea}
                label="Acceptance criteria"
                placeholder="Type your acceptance criteria here"
                large
              />

              <Field
                name="requirements"
                component={RenderTextArea}
                label="Business requirements"
                placeholder="Type your business requirements here"
                large
              />

              <Field
                name="solution"
                component={RenderTextArea}
                label="Solution design"
                placeholder="Type your solution design here"
                large
              />

              <Field
                name="rules"
                component={RenderTextArea}
                label="Business rules"
                placeholder="Type your business rules here"
              />

              <div className="controls">
                <DvBlueButton
                  // type="submit"
                  className="dv-blue inverted draft"
                  disabled={submitting}
                  onClick={() => {
                    this.props.dispatch(
                      change("ClientProjectForm", "state", "draft")
                    );

                    setTimeout(() => {
                      this.props.dispatch(submit("ClientProjectForm"));
                    }, 0);
                  }}
                >
                  Draft
                </DvBlueButton>

                <DvBlueButton
                  type="submit"
                  className="dv-blue"
                  disabled={submitting}
                >
                  Create
                </DvBlueButton>

                <NavLink exact to={`/dashboard/`}>
                  <DvBlueButton className="dv-blue inverted transparent">
                    Cancel
                  </DvBlueButton>
                </NavLink>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect()(ProjectForm);
