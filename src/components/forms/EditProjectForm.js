import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, Form, Field, initialize } from "redux-form";
import { TextArea } from "react-semantic-redux-form";
import StyledProject from "../../styleComponents/StyledProject";
import { Grid } from "semantic-ui-react";
import {
  showProjectWithId,
  getProjectTypes,
  getSkills
} from "../../actions/actions";
import { IMAGE_PORT, CUSTOMER, S_REDGUY } from "../../constans/constans";
import RenderTextArea from "./renders/RenderTextArea";
import RenderText from "./renders/RenderText";
import { DvBlueButton } from "../../styleComponents/layout/DvButton";
import RenderSkillsArea from "./renders/RenderSkillsArea";
import { renameObjPropNames, getUserRole } from "../../helpers/functions";
import RenderFile from "./renders/RenderFile";

class EditProjectForm extends Component {
  state = {
    fetch: true
  };

  componentWillMount() {
    this.props.getProjectTypes();
  }

  getSkills = () => {
    const { skills, getSkills } = this.props;

    if (!skills || skills.length === 0) {
      getSkills();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectWithId && nextProps.projectId) {
      if (nextProps.projectWithId.id !== +nextProps.projectId) {
      }
    }
  }

  render() {
    const {
      projectWithId,
      projectId,
      projectTypes,
      handleSubmit,
      submitting,
      dirty,
      skills,
      submitSucceeded
    } = this.props;
    const { logo = {}, name = "", customer = {}, project_type, state } =
      projectWithId || {};

    const hasPermission =
      getUserRole() === CUSTOMER || getUserRole() === S_REDGUY;

    console.log("dirty", dirty, "\n", "succeed", submitSucceeded);

    return (
      <StyledProject
        className={
          projectWithId && projectWithId.id === +projectId
            ? "loaded"
            : "loading"
        }
      >
        <i className="fa fa-spinner fa-3x fa-pulse preloader" />
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row stretched>
              <Grid.Column computer={4}>
                <div className="projectAside">
                  <div className="asideInfo">
                    <p>
                      <span className="label">Customer:</span>&nbsp;
                      {customer.first_name + " " + customer.last_name}
                    </p>
                  </div>
                  <div className="asideInfo">
                    <p>
                      <span className="label">Project type:</span>&nbsp;
                      {projectTypes && project_type
                        ? projectTypes[project_type - 1]
                        : "Any project type"}
                    </p>
                  </div>
                  <div className="asideInfo">
                    <p>
                      <span className="label">Attached files:</span>
                    </p>
                    <Field
                      name="file"
                      type="text"
                      component={RenderFile}
                      disabled={!hasPermission}
                      className="projectFiles"
                    />
                  </div>
                  <div className="asideInfo">
                    {hasPermission ? (
                      <RenderSkillsArea
                        options={skills}
                        label="Technologies:"
                        name="skills"
                        placeholder="Add few new technologies"
                        className="projectSkills"
                        onOpen={this.getSkills}
                      />
                    ) : (
                      <React.Fragment>
                        <p>
                          <span className="label">Technologies:</span>
                        </p>
                        <div className="skillsWrapper">
                          {projectWithId &&
                            projectWithId.skills.map((skill, key) => (
                              <div className="skill" key={key}>
                                {skill.label}
                              </div>
                            ))}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column computer={12}>
                <div className="projectMain">
                  <div className="title">
                    {logo.url ? (
                      <img src={IMAGE_PORT + logo.url} alt={name} />
                    ) : (
                      <span className="projectNoLogo">{name[0]}</span>
                    )}
                    <p>
                      {name} Project{" "}
                      <span className="status">
                        {state !== "discovery" && "On review"}
                      </span>
                    </p>
                  </div>
                  <Field
                    name="description"
                    placeholder="Type your description here"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="user_story"
                    label="User story"
                    placeholder="Write your story here"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="deliverables"
                    label="Acceptance criteria"
                    placeholder="Write some acceptance criterea"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_requirements"
                    label="Business requirements"
                    placeholder="Write some business requirements"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_rules"
                    label="Business rules"
                    placeholder="Write some business rules"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="further_notes"
                    label="Solution design"
                    placeholder="Write your solution design here"
                    disabled={!hasPermission}
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  {hasPermission && (
                    <div className="controls">
                      <DvBlueButton
                        loading={submitting}
                        role="button"
                        className="clear dv-blue"
                        disabled={state === "discovery" && !dirty}
                      >
                        {state === "discovery"
                          ? dirty
                            ? "Save"
                            : submitSucceeded
                              ? "Saved"
                              : "Up to date"
                          : "Submit"}
                      </DvBlueButton>
                    </div>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </StyledProject>
    );
  }
}

EditProjectForm = reduxForm({
  form: "EditProjectForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(EditProjectForm);

const mapStateToProps = (state, ownProps) => {
  const { projectWithId, updateProject, projectTypes, skills } = state;
  return {
    projectWithId,
    updateProject,
    projectTypes,
    skills,
    initialValues: projectWithId
  };
};

export default connect(mapStateToProps, {
  showProjectWithId,
  getProjectTypes,
  getSkills
})(EditProjectForm);
