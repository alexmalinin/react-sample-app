import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, change, Form, Field } from "redux-form";
import StyledProject from "../../styleComponents/StyledProject";
import { Grid, Dimmer } from "semantic-ui-react";
import {
  showAllProjects,
  getProjectTypes,
  getSkills,
  showProjectTeam,
  showCustomTeams
} from "../../actions/actions";
import { IMAGE_PORT, CUSTOMER, S_REDGUY, PORT } from "../../constans/constans";
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
      dirty,
      skills,
      submitSucceeded,
      handleAssignTeam
    } = this.props;

    const { team } = this.state;

    const { logo = {}, name = "", customer = {}, project_type, state } =
      projectWithId || {};

    const hasPermission =
      getUserRole() === CUSTOMER || getUserRole() === S_REDGUY;

    let stateText;

    switch (state) {
      case "brief_submissions":
        stateText = "Waiting for producer";
        break;
      case "review_by_admin":
        stateText = "On review";
        break;
      case "discovery":
        stateText = "";
        break;
      default:
        stateText = "";
        break;
    }

    // console.log("dirty", dirty, "\n", "succeed", submitSucceeded);

    return (
      <StyledProject
      // className={
      //   projectWithId && projectWithId.id === +projectId
      //     ? "loaded"
      //     : "loading"
      // }
      >
        {/* <i className="fa fa-spinner fa-3x fa-pulse preloader" /> */}
        {/* <Dimmer active={} /> */}
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
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
                  <div className="asideInfo">
                    <p>
                      <span className="label">Members:</span>
                    </p>
                    <div className="teamWrapper">
                      <MembersDropdown
                        members={team}
                        countToShow={3}
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
                    <div className="title">
                      <div className="projectLogo">
                        <Field
                          name="logo"
                          component={RenderImage}
                          projectLogo
                          type="file"
                          logo={logo}
                          projectId={projectId}
                          placeholder="Choose project logo"
                          onSelfSubmit={true}
                        />
                      </div>
                      <div className="projectStatus">
                        <p>
                          {name} Project{" "}
                          <span className="status">
                            {state === "draft" && "Drafted"}
                            {state === "reviewed_by_admin" && "On review"}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="title">
                      {logo.url ? (
                        <img src={IMAGE_PORT + logo.url} alt={name} />
                      ) : (
                        <span className="projectNoLogo">{name[0]}</span>
                      )}
                      <p>
                        {name} Project{" "}
                        <span className="status">
                          {state === "draft" && "Drafted"}
                          {state === "reviewed_by_admin" && "On review"}
                        </span>
                      </p>
                    </div>
                  )}

                  <Field
                    name="name"
                    label="name"
                    disabled={!hasPermission}
                    component={RenderText}
                    onSelfSubmit={this.handleSubmit}
                    projectId={projectId}
                    updateProjects
                    className="transparent"
                    autoHeight
                    unhiddable
                  />

                  <Field
                    name="description"
                    label="Description"
                    placeholder="Type your description here"
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
                    placeholder="Write your story here"
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
                    placeholder="Write some acceptance criterea"
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
                    placeholder="Write some business requirements"
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
                    placeholder="Write some business rules"
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
                    placeholder="Write your solution design here"
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
                          disabled={state === "discovery" && !dirty}
                          onClick={() =>
                            this.props.dispatch(
                              change(
                                "EditProjectForm",
                                "state",
                                "brief_submissions"
                              )
                            )
                          }
                        >
                          Publish
                        </DvBlueButton>
                      )}
                      {state === "reviewed_by_admin" && (
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

const mapStateToProps = (state, ownProps) => {
  const {
    projectWithId,
    updateProject,
    projectTypes,
    skills,
    allCustomTeams,
    projectTeam
  } = state;
  return {
    projectWithId,
    updateProject,
    projectTypes,
    skills,
    projectTeam,
    allCustomTeams,
    initialValues: projectWithId
  };
};

export default connect(mapStateToProps, {
  showAllProjects,
  getProjectTypes,
  getSkills,
  showProjectTeam,
  showCustomTeams
})(EditProjectForm);
