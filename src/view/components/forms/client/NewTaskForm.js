import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm, change, getFormValues } from "redux-form";
import { isEqual } from "lodash";
import { Grid } from "semantic-ui-react";

import { DvBlueButton } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";

import { required, maxLength80 } from "view/utils/validate";
// import { showProjectTeam } from "../../../actions/actions";
import { S_REDGUY } from "utilities/constants";
import RenderSelectField from "../../forms/renders/RenderSelectField";

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleList: [],
      specialists: [],
      fetchInitialValues: true,
      fetchSubmitError: true
    };

    this.projectList = [];
    this.initialValues = [];
  }

  componentWillMount() {
    const {
      project,
      epic,
      projectWithId: { project: projectData, loaded },
      allEpics,
      specialistProjects
    } = this.props;

    if (project && epic && epic !== "all" && loaded && allEpics.loaded) {
      this.props.dispatch(
        change("CreateTaskForm", "project", {
          value: projectData.id,
          label: projectData.name
        })
      );
      this.selectProject(projectData);
      this.props.dispatch(
        change("CreateTaskForm", "epic", {
          value: allEpics.epics[epic - 1].id,
          label: allEpics.epics[epic - 1].name
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
    const spec = this.props.projectTeam.specialists.find(
      spec => spec.id === +specId
    );
    if (type === "assign") {
      this.setState({
        specialists: [...this.state.specialists, spec]
      });
    } else {
      let list = this.state.specialists;
      list.splice(list.indexOf(spec), 1);
      this.setState({
        specialists: list
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
    const { handleSubmit, projectTeam, close } = this.props;
    const { specialists, moduleList } = this.state;

    return (
      <Grid as={Form} onSubmit={handleSubmit} padded>
        <Grid.Row className="fluid">
          <Grid.Column computer={5} className="wrapper aside">
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Field
                    name="eta"
                    component={RenderDate}
                    type="date"
                    label="ETA"
                    placeholder="Due date"
                    className="estimate inline-in-modal"
                    handleEtaForm={this.handleEtaForm}
                  />
                </Grid.Column>

                <Grid.Column>
                  <Field
                    name="state"
                    label="Status"
                    placeholder="Select state"
                    className="status inline-in-modal"
                    component={RenderSelectField}
                    options={[{ value: 0, text: "Backlog" }]}
                    disabled
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Field
                    name="attached_files"
                    type="text"
                    component={RenderFile}
                    dropzone
                    label="Attach files"
                    className="area"
                    padded
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <div className="specialistsWrapper">
                    {specialists.map((specialist, key) => (
                      <SpecialistTile
                        specialist={specialist}
                        key={key}
                        index={key}
                        remove={this.handleAssign}
                        hideCosts
                      />
                    ))}
                    {!!this.state.moduleList.length &&
                      projectTeam && (
                        <AssignDropdown
                          label="Assign member"
                          specialists={specialists}
                          allSpecialists={projectTeam.specialists.filter(
                            spec => spec.role !== S_REDGUY
                          )}
                          handleAssign={this.handleAssign}
                          userType={[S_REDGUY]}
                          closeOnChange
                          renderToModal
                        />
                      )}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column computer={11} className="wrapper main">
            <Grid>
              <Grid.Row>
                <Grid.Column computer={8}>
                  <Field
                    name="project"
                    component={RenderSelect}
                    options={this.projectList}
                    label="Project"
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
              <Grid.Row className="fluid">
                <Grid.Column computer={16}>
                  <InputField
                    name="name"
                    label="Summary"
                    placeholder="Type your summary here"
                    className="area"
                    validate={[required, maxLength80]}
                    isRequired
                    padded
                    // maxLength={80}
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="description"
                    component={RenderTextArea}
                    label="Description"
                    placeholder="Type your description here"
                    className="area"
                    validate={[required]}
                    isRequired
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="user_story"
                    component={RenderTextArea}
                    label="User Story"
                    placeholder="Type your user story here"
                    className="area"
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="deliverables"
                    component={RenderTextArea}
                    label="Acceptance Criteria"
                    placeholder="Type your acceptance criterea here"
                    className="area"
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="business_requirements"
                    component={RenderTextArea}
                    label="Business Requirements"
                    placeholder="Type your business requirements here"
                    className="area"
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="business_rules"
                    component={RenderTextArea}
                    label="Business Rules"
                    placeholder="Type your business rules here"
                    className="area"
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="notes"
                    component={RenderTextArea}
                    label="Solution Design"
                    placeholder="Type your solution design here"
                    className="area"
                    large
                    padded
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={4} floated="right" textAlign="right">
            <DvBlueButton
              type="button"
              className="dv-blue inverted transparent"
              onClick={close}
            >
              Cancel
            </DvBlueButton>
            <DvBlueButton className="dv-blue">Create</DvBlueButton>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formValues && this.state.fetchInitialValues) {
      this.initialValues = nextProps.formValues;
      this.setState({
        fetchInitialValues: false
      });
    }

    if (isEqual(this.initialValues, nextProps.formValues)) {
      this.props.handleChangeState("isEdited", false);
    } else {
      this.props.handleChangeState("isEdited", true);
    }
  }

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
  initialValues: { state: 0 }
})(NewTaskForm);

const mapStateToProps = state => {
  const {
    specialistProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics
  } = state;

  const formValues = getFormValues("CreateTaskForm")(state);

  return {
    specialistProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics,
    formValues
  };
};

export default connect(mapStateToProps, {
  /* showProjectTeam */
})(NewTaskForm);
