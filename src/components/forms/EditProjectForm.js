import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxForm,
  change,
  getFormValues,
  formValueSelector,
  Form,
  Field
} from "redux-form";
import { ContainerLarge } from "../../styleComponents/layout/Container";
import StyledProject from "../../styleComponents/StyledProject";
import BoardSubHeader from "../layout/BoardSubHeader";
import { Grid, Transition } from "semantic-ui-react";
import { updateCreatedProject, showProjectWithId } from "../../actions/actions";
import { IMAGE_PORT, PORT } from "../../constans/constans";
import RenderTextArea from "./renders/RenderTextArea";

class EditProjectForm extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    // if (nextProps.updateProject) {
    //   if (this.props.updateProject) {
    //     if (nextProps.updateProject !== this.props.updateProject) {
    //       this.props.showProjectWithId(nextProps.projectId);
    //     }
    //   } else this.props.showProjectWithId(nextProps.projectId);
    // }
  }

  render() {
    const { projectWithId, projectId } = this.props;
    const {} = this.state;
    const {
      logo = {},
      name = "",
      description,
      user_story,
      acceptance_criterea,
      business_requirements
    } =
      projectWithId || {};

    return (
      <StyledProject
        className={
          projectWithId && projectWithId.id === +projectId
            ? "loaded"
            : "loading"
        }
      >
        <i className="fa fa-spinner fa-3x fa-pulse preloader" />
        <Form model="user" onSubmit={this.submit}>
          <Grid>
            <Grid.Row>
              <Grid.Column computer={4}>
                <div className="projectAside">
                  <h1>hello</h1>
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
                    component={RenderTextArea}
                    className="transparent"
                  />
                  <Field
                    name="acceptance_criteria"
                    label="Acceptance criteria"
                    placeholder="Write some acceptance criterea"
                    component={RenderTextArea}
                    className="transparent"
                  />
                  <Field
                    name="business_requirements"
                    label="Business requirements"
                    component={RenderTextArea}
                    className="transparent"
                  />
                  <Field
                    name="business_rules"
                    label="Business rules"
                    component={RenderTextArea}
                    className="transparent"
                  />
                  <Field
                    name="solution_design"
                    label="Solution design"
                    component={RenderTextArea}
                    className="transparent"
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </StyledProject>
    );
  }

  fillFileds = () => {};

  submit = () => {};
}

EditProjectForm = reduxForm({
  form: "EditProjectForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EditProjectForm);

export default connect(
  ({ projectWithId, updateProject }) => ({ projectWithId, updateProject }),
  {
    updateCreatedProject,
    showProjectWithId
  }
)(EditProjectForm);
