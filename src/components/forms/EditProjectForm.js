import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, Form, Field } from "redux-form";
import StyledProject from "../../styleComponents/StyledProject";
import { Grid } from "semantic-ui-react";
import {
  getProjectTypes,
  getSkills,
  showProjectTeam,
  showCustomTeams
} from "../../actions/actions";
import { IMAGE_PORT, PORT } from "../../constants/constants";
import { CUSTOMER, S_REDGUY } from "../../constants/user";
import RenderText from "./renders/RenderText";
import { DvBlueButton } from "../../styleComponents/layout/DvButton";
import RenderSkillsArea from "./renders/RenderSkillsArea";
import {
  getUserRole,
  oneOfRoles,
  renameObjPropNames
} from "../../helpers/functions";
import RenderFile from "./renders/RenderFile";
import Axios from "axios";
import AssignTeamDropdown from "../layout/AssignTeamDropdown";
import MembersDropdown from "../layout/dropdowns/MembersDropdown";
import RenderImage from "../forms/renders/RenderImage";

class EditProjectForm extends Component {
  state = {
    fetch: true,
    team: []
  };

  componentWillMount() {
    const { projectId } = this.props;

    this.props.getProjectTypes();

    if (projectId) {
      this.props.showProjectTeam(projectId);
    }
  }

  getSkills = () => {
    const { skills, getSkills } = this.props;

    if (!skills || skills.length === 0) {
      getSkills();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.projectTeam &&
      nextProps.projectId &&
      nextProps.projectTeam.project_id === +nextProps.projectId
    ) {
      this.setState({ team: nextProps.projectTeam.specialists });
    }

    if (nextProps.submitSucceeded) {
      this.props.projectUpdate(this.props.projectId);
    }
  }

  handleSubmit = (name, value) => {
    const { projectId } = this.props;

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}`,
      data: {
        project: {
          [name]: value
        }
      }
    });
  };

  //make normal search select instead of multiselect
  handleSkills = (e, name) => {
    let skillsIds = [];
    for (let key in e) {
      e[key].value && skillsIds.push(e[key].value);
    }

    this.setState({ updatingSkills: true });
    this.handleSubmit("skill_ids", skillsIds)
      .then(resp => {
        const skills = resp.data.skills;
        skills.forEach(skill => {
          renameObjPropNames(skill, "id", "value");
          renameObjPropNames(skill, "name", "label");
        });
        this.props.change("skills", skills);
        this.setState({ updatingSkills: false });
      })
      .catch(err => {
        console.log(err);
        this.props.change("skills", this.props.projectWithId.skills);
        this.setState({ updatingSkills: false });
      });
  };

  render() {
    const {
      projectWithId,
      projectId,
      projectTypes,
      handleSubmit,
      submitting,
      skills,
      handleAssignTeam,
      projectTypeId,
      projectName
    } = this.props;

    const { team } = this.state;

    const { logo = {}, name = "", customer = {}, project_type, state } =
      projectWithId || {};

    const hasPermission =
      getUserRole() === CUSTOMER || getUserRole() === S_REDGUY;

    let projectType = null;

    if (projectTypes && projectTypeId) {
      projectTypes.forEach(type => {
        if (type.value === projectTypeId) {
          projectType = type.label;
        }
      });
    }

    return (
      <StyledProject>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="projectAside">
                  <div className="asideInfo">
                    <div className="label">Customer</div>
                    <div className="text">
                      {customer.first_name + " " + customer.last_name}
                    </div>
                  </div>
                  <div className="asideInfo">
                    <div className="label">Project type</div>
                    <div className="text">
                      {projectType ? projectType : "Any project type"}
                    </div>
                  </div>
                  <div className="asideInfo">
                    <div className="label">Attached files:</div>
                    <Field
                      name="attached_files"
                      type="text"
                      component={RenderFile}
                      projectId={projectId}
                      disabled={!hasPermission}
                      onSelfSubmit={this.handleSubmit}
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
                        handleSelectChange={this.handleSkills}
                      />
                    ) : (
                      <React.Fragment>
                        <div className="label">Technologies:</div>
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
                  <div className="asideInfo">
                    <p>
                      <span className="label">Members:</span>
                    </p>
                    <div className="teamWrapper">
                      <MembersDropdown
                        members={team}
                        countToShow={5}
                        position="bottom left"
                        handleRemove={this.handleAssign}
                        removeText="project"
                      />
                      {getUserRole() === S_REDGUY && (
                        <AssignTeamDropdown
                          // label="Invite custom team"
                          specialists={team}
                          handleAssignTeam={handleAssignTeam}
                          userType={[S_REDGUY]}
                          closeOnChange={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="projectMain">
                  {oneOfRoles(CUSTOMER, S_REDGUY) ? (
                    <div className="projectHeader">
                      <div className="projectLogo">
                        <Field
                          name="logo"
                          component={RenderImage}
                          projectLogo
                          type="file"
                          logo={logo}
                          projectId={projectId}
                          projectName={projectName}
                          placeholder="Choose project logo"
                          onSelfSubmit={true}
                        />
                      </div>
                      <div className="projectStatus">
                        <p>{name} Project </p>
                      </div>
                    </div>
                  ) : (
                    <div className="projectHeader">
                      {logo.url ? (
                        <div className="projectLogo">
                          <div className="imgPreview">
                            <img src={IMAGE_PORT + logo.url} alt={name} />
                          </div>
                        </div>
                      ) : (
                        <div className="projectLogo">
                          <div className="imgPreview">
                            <span className="projectNoLogo">{name[0]}</span>
                          </div>
                        </div>
                      )}
                      <p>{name} Project </p>
                    </div>
                  )}

                  <Field
                    name="name"
                    label="Name"
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    projectId={projectId}
                    updateProject
                    updateProjects
                    placeholder={
                      hasPermission
                        ? "Type your project name here"
                        : "No project name"
                    }
                    className="transparent"
                    autoHeight
                    unhiddable
                  />

                  <Field
                    name="description"
                    label="Description"
                    placeholder={
                      hasPermission
                        ? "Type your description here"
                        : "No description"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="user_story"
                    label="User story"
                    placeholder={
                      hasPermission
                        ? "Type your user story here"
                        : "No user story"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="deliverables"
                    label="Acceptance criteria"
                    placeholder={
                      hasPermission
                        ? "Type your acceptance criterea here"
                        : "No acceptance criterea"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_requirements"
                    label="Business requirements"
                    placeholder={
                      hasPermission
                        ? "Type your business requirements here"
                        : "No business requirements"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_rules"
                    label="Business rules"
                    placeholder={
                      hasPermission
                        ? "Type your business rules here"
                        : "No business rules"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="further_notes"
                    label="Solution design"
                    placeholder={
                      hasPermission
                        ? "Type your solution design here"
                        : "No solution design"
                    }
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  {oneOfRoles(CUSTOMER, S_REDGUY) && (
                    <div className="controls">
                      {state === "draft" && (
                        <DvBlueButton
                          loading={submitting}
                          role="button"
                          className="clear dv-blue"
                          onClick={() => {
                            this.props.dispatch(
                              change(
                                "EditProjectForm",
                                "state",
                                "brief_submissions"
                              )
                            );
                          }}
                        >
                          Publish
                        </DvBlueButton>
                      )}
                      {state === "reviewed_by_admin" &&
                        getUserRole() === S_REDGUY && (
                          <DvBlueButton
                            loading={submitting}
                            role="button"
                            className="clear dv-blue"
                            fixed="true"
                          >
                            Submit
                          </DvBlueButton>
                        )}
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

const mapStateToProps = state => {
  return {
    projectWithId: state.projectWithId,
    updateProject: state.updateProject,
    projectTypes: state.projectTypes,
    skills: state.skills,
    projectTeam: state.projectTeam,
    allCustomTeams: state.allCustomTeams,
    initialValues: state.projectWithId,
    projectTypeId: state.projectWithId && state.projectWithId.project_type_id,
    projectName: state.projectWithId && state.projectWithId.name
  };
};

export default connect(mapStateToProps, {
  getProjectTypes,
  getSkills,
  showProjectTeam,
  showCustomTeams
})(EditProjectForm);
