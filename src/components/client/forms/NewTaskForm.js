import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import CostField from "../../forms/renders/CostField";
import { SubmitBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { AssignDropdown, PersonTile } from "../../layout/AssignDropdown";
import { showProjectTeam } from "../../../actions/actions";

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleList: [],
      specialists: []
    };
  }

  makeFloat = e =>
    setTimeout(() => {
      this.props.dispatch(
        change(
          "CreateTaskForm",
          "cost",
          parseFloat(e.target.value || 0).toFixed(2)
        )
      );
    }, 10);

  selectProject = e => {
    let moduleList = [];

    e.epics.map(epic =>
      moduleList.push({ label: epic.description, value: epic.id })
    );
    this.props.dispatch(change("CreateTaskForm", "epic", ""));
    this.props.showProjectTeam(e.value);

    this.setState({
      moduleList: moduleList
    });
  };

  handleAssign = (type, specId) => {
    const spec = this.props.projectTeam[0].specialists.find(
      spec => spec.id === +specId
    );
    if (type === "assign") {
      this.setState({
        specialists: [...this.state.specialists, spec]
      });
    } else if (type === "remove") {
      let list = this.state.specialists;
      console.log(list);
      this.setState({
        specialists: list.splice(this.state.specialists.indexOf(spec), 1)
      });
    }
  };

  render() {
    const {
      handleSubmit,
      submitting,
      handleFormField,
      allProjects,
      projectTeam,
      changeUserType
    } = this.props;
    const { specialists, moduleList } = this.state;

    let projectList = [];

    allProjects &&
      allProjects.map(project =>
        projectList.push({
          label: project.name,
          value: project.id,
          epics: project.epics
        })
      );

    console.log(projectTeam, specialists);

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8}>
              <Field
                name="project"
                component={RenderSelect}
                options={projectList}
                label="project"
                placeholder="Select"
                validate={[required]}
                onChange={this.selectProject}
                padded
                handleFormField={handleFormField}
              />
            </Grid.Column>
            <Grid.Column computer={8}>
              <Field
                name="epic"
                component={RenderSelect}
                options={moduleList}
                label="Module"
                placeholder="Select"
                validate={[required]}
                disabled={!moduleList.length}
                padded
                handleFormField={handleFormField}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <InputField
                name="name"
                label="Summary"
                validate={[required]}
                padded
              />
            </Grid.Column>

            <Grid.Column computer={16}>
              <Field
                name="description"
                component={RenderTextArea}
                label="Description"
                className="area"
                validate={[required]}
                large
                padded
              />
            </Grid.Column>

            <Grid.Column computer={16}>
              <Field
                name="file"
                type="text"
                component={RenderFile}
                dropzone
                label="Attach files"
                className="area"
                padded
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={5}>
              <Field
                name="eta"
                type="date"
                label="Estimate"
                component={RenderDate}
                validate={[required]}
                className="estimate"
                padded
              />
            </Grid.Column>

            <Grid.Column computer={3}>
              <CostField
                name="cost"
                label="Cost"
                onBlur={this.makeFloat}
                padded
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8}>
              {specialists.map((spec, key) => (
                <PersonTile
                  key={key}
                  specialist={spec}
                  handleRemove={this.handleAssign}
                  labeled
                  removeTitle="task"
                  userType={changeUserType}
                  renderToDashboard
                />
              ))}
              {!!this.state.moduleList.length && (
                <AssignDropdown
                  label="Add member"
                  specialists={specialists}
                  allSpecialists={projectTeam[0].specialists}
                  handleAssign={this.handleAssign}
                  userType={changeUserType}
                  renderToDashboard
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={2} floated="right">
              <SubmitBtn type="submit" disabled={submitting} primary>
                <span>Save</span>
              </SubmitBtn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {}

  closeModal = ev => {
    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };
}

NewTaskForm = reduxForm({
  form: "CreateTaskForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(NewTaskForm);

export default connect(
  ({ allProjects, projectTeam, changeUserType }) => ({
    allProjects,
    projectTeam,
    changeUserType
  }),
  { showProjectTeam }
)(NewTaskForm);
