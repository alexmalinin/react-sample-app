import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change, getFormValues } from "redux-form";
import { isEqual } from "lodash";
import {
  required,
  date,
  maxLength260,
  maxLength80
} from "../../../helpers/validate";
import CostField from "../../forms/renders/CostField";
import { CancelBtn, SaveBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";
import { showProjectTeam } from "../../../actions/actions";
import { S_REDGUY } from "../../../constans/constans";

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
    const {
      handleSubmit,
      submitting,
      projectTeam,
      changeUserType
    } = this.props;
    const { specialists, moduleList } = this.state;

    return (
      <Fragment>
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
                  // component={RenderTextArea}
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
                  className="area"
                  large
                  padded
                />
              </Grid.Column>

              <Grid.Column computer={16}>
                <Field
                  name="notes"
                  component={RenderTextArea}
                  label="Notes"
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
                  className="area"
                  large
                  padded
                />
              </Grid.Column>

              <Grid.Column computer={16}>
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
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={9}>
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
                        allSpecialists={projectTeam.specialists}
                        handleAssign={this.handleAssign}
                        userType={[S_REDGUY]}
                        closeOnChange
                        renderToModal
                      />
                    )}
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={4} floated="right" textAlign="right">
                <CancelBtn
                  type="button"
                  onClick={this.closeModal}
                  primary
                  static="true"
                >
                  <span>Cancel</span>
                </CancelBtn>
                <SaveBtn
                  type="submit"
                  disabled={submitting}
                  updatebtn="true"
                  primary
                  static="true"
                >
                  <span>Save</span>
                </SaveBtn>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>
      </Fragment>
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
  initialValues: { cost: "0.00" }
})(NewTaskForm);

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, { showProjectTeam })(NewTaskForm);
