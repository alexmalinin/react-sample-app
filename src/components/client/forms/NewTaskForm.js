import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { required, date } from "../../../helpers/validate";
import CostField from "../../forms/renders/CostField";
import { SubmitBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";
import { showProjectTeam } from "../../../actions/actions";

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleList: [],
      specialists: []
    };

    this.projectList = [];
  }

  componentWillMount() {
    const {
      project,
      epic,
      projectWithId,
      allEpics,
      specialistProjects
    } = this.props;

    if (project && epic && projectWithId) {
      this.props.dispatch(
        change("CreateTaskForm", "project", {
          value: projectWithId.id,
          label: projectWithId.name
        })
      );
      this.selectProject(projectWithId);
      this.props.dispatch(
        change("CreateTaskForm", "epic", {
          value: allEpics[epic - 1].id,
          label: allEpics[epic - 1].name
        })
      );
    }

    specialistProjects &&
      specialistProjects.forEach(project =>
        this.projectList.push({
          label: project.name,
          value: project.id,
          epics: project.epics
        })
      );
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

    e.epics.map(epic => moduleList.push({ label: epic.name, value: epic.id }));
    this.props.dispatch(change("CreateTaskForm", "epic", ""));
    this.props.showProjectTeam(e.value || e.id);

    this.setState({
      moduleList: moduleList,
      specialists: []
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
      this.setState({
        specialists: list.splice(this.state.specialists.indexOf(spec), 1)
      });
    }
  };

  removeSpecialist = key => {
    let specialists = this.state.specialists;
    specialists.splice(key, 1);
    this.setState({
      specialists: specialists
    });
  };

  handleEtaForm = date => {
    this.props.dispatch(change("CreateTaskForm", "eta", date));
  };

  componentDidUpdate() {
    let specIds = [];
    this.state.specialists.map(spec => specIds.push(spec.id));
    specIds = specIds.join(",");
    this.props.dispatch(change("CreateTaskForm", "specIds", specIds));
  }

  render() {
    const {
      handleSubmit,
      submitting,
      projectTeam,
      changeUserType
    } = this.props;
    const { specialists, moduleList } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8}>
              <Field
                name="project"
                component={RenderSelect}
                options={this.projectList}
                label="project"
                placeholder="Select"
                validate={[required]}
                isRequired
                onChange={this.selectProject}
                padded
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
                isRequired
                disabled={!moduleList.length}
                padded
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <InputField
                name="name"
                label="Summary"
                validate={[required]}
                isRequired
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
                isRequired
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
                component={RenderDate}
                type="date"
                label="Estimate"
                className="estimate"
                validate={[required, date]}
                isRequired
                handleEtaForm={this.handleEtaForm}
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
            <Grid.Column computer={9}>
              <div className="specialistsWrapper">
                {specialists.map((specialist, key) => (
                  <SpecialistTile
                    specialist={specialist}
                    key={key}
                    index={key}
                    remove={this.removeSpecialist}
                  />
                ))}
                {!!this.state.moduleList.length &&
                  projectTeam &&
                  projectTeam[0] && (
                    <AssignDropdown
                      label="Assign member"
                      specialists={specialists}
                      allSpecialists={projectTeam[0].specialists}
                      handleAssign={this.handleAssign}
                      userType={changeUserType}
                      closeOnChange={false}
                      renderToModal
                    />
                  )}
              </div>
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
  forceUnregisterOnUnmount: true,
  initialValues: { cost: "0.00" }
})(NewTaskForm);

export default connect(
  ({
    specialistProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics
  }) => ({
    specialistProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics
  }),
  { showProjectTeam }
)(NewTaskForm);
