import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, Form, Field } from "redux-form";
import { TextArea } from "react-semantic-redux-form";
import StyledProject from "../../styleComponents/StyledProject";
import { Grid } from "semantic-ui-react";
import {
  updateCreatedProject,
  showProjectWithId,
  getProjectTypes
} from "../../actions/actions";
import { IMAGE_PORT } from "../../constans/constans";
import RenderTextArea from "./renders/RenderTextArea";
import RenderText from "./renders/RenderText";
import { DvBlueButton } from "../../styleComponents/layout/DvButton";
import RenderSkillsArea from "./renders/RenderSkillsArea";

class EditProjectForm extends Component {
  state = {
    fetch: true
  };

  componentWillMount() {
    this.props.getProjectTypes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectWithId) {
      if (this.state.fetch) {
        this.fillFields(nextProps.projectWithId);
        this.setState({ fetch: false });
      }

      if (+nextProps.projectId !== nextProps.projectWithId.id) {
        this.setState({ fetch: true });
      }
    }

    if (nextProps.updateProject) {
      if (this.props.updateProject) {
        if (
          this.props.updateProject.successId !==
          nextProps.updateProject.successId
        ) {
        }
      } else null; //set flash message
    }
  }

  render() {
    const {
      projectWithId,
      projectId,
      projectTypes,
      handleSubmit,
      submitting
    } = this.props;
    const { logo = {}, name = "", customer = {}, project_type, skills = [] } =
      projectWithId || {};
    let submitText = "submit";

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
            <Grid.Row>
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
                  </div>
                  <div className="asideInfo">
                    <p>
                      <span className="label">Technologies:</span>
                    </p>
                    <div className="skillsWrapper">
                      {skills.map((skill, key) => (
                        <div className="skill">{skill.name}</div>
                      ))}
                    </div>
                    <RenderSkillsArea
                      options={skills}
                      label="Technologies"
                      name="skills"
                      // handleSelectChange={this.props.handleSelectChange}
                      placeholder=""
                      large
                      padded
                    />
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
                    <p>{name} Project</p>
                  </div>
                  <Field
                    name="description"
                    placeholder="Type your description here"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="user_story"
                    label="User story"
                    placeholder="Write your story here"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="acceptance_criteria"
                    label="Acceptance criteria"
                    placeholder="Write some acceptance criterea"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_requirements"
                    label="Business requirements"
                    placeholder="Write some business requirements"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="business_rules"
                    label="Business rules"
                    placeholder="Write some business rules"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <Field
                    name="solution_design"
                    label="Solution design"
                    placeholder="Write your solution design here"
                    component={RenderText}
                    className="transparent"
                    autoHeight
                    unhiddable
                  />
                  <DvBlueButton
                    loading={submitting}
                    role="button"
                    className="clear dv-blue"
                  >
                    {submitText}
                  </DvBlueButton>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </StyledProject>
    );
  }

  fillFields = data => {
    const {
      description,
      user_story,
      deliverables,
      business_requirements,
      business_rules,
      further_notes
    } = data;
    const form = "EditProjectForm";

    const { dispatch } = this.props;

    dispatch(change(form, "description", description));
    dispatch(change(form, "user_story", user_story));
    dispatch(change(form, "acceptance_criteria", deliverables));
    dispatch(change(form, "business_requirements", business_requirements));
    dispatch(change(form, "business_rules", business_rules));
    dispatch(change(form, "solution_design", further_notes));
  };

  submit = values => {
    console.log(values);
  };
}

EditProjectForm = reduxForm({
  form: "EditProjectForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(EditProjectForm);

export default connect(
  ({ projectWithId, updateProject, projectTypes }) => ({
    projectWithId,
    updateProject,
    projectTypes
  }),
  {
    showProjectWithId,
    getProjectTypes
  }
)(EditProjectForm);
