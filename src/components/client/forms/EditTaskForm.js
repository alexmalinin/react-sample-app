import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm, change } from "redux-form";
import CostField from "../../forms/renders/CostField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import { Grid, Select } from "semantic-ui-react";
import { showProjectTeam, updateEpicTask } from "../../../actions/actions";
import RenderText from "../../forms/renders/RenderText";
import RenderField from "../../forms/renders/RenderField";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import RenderSelectField from "../../forms/renders/RenderSelectField";
import axios from "axios";
import { PORT, S_REDGUY } from "../../../constans/constans";
import { getUserRole, oneOfRoles } from "../../../helpers/functions";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";
import { maxLength80 } from "../../../helpers/validate";
import { formatCurrency } from "../../../helpers/validate";

class EditTaskForm extends Component {
  state = {
    specialists: this.props.epicTask.specialists,
    totalCost: this.props.epicTask.cost
  };

  handleEtaForm = date => {
    this.props.dispatch(change("EditTaskForm", "eta", date));
    this.handleSubmit("eta", date);
    this.props.setUpdated();
  };

  removeSpecialist = id => {
    this.handleAssign("remove", id);
  };

  //TODO: apply thunk here

  handleSubmit = (name, value) => {
    const { epic, epicTask } = this.props;
    return axios({
      method: "PUT",
      url: `${PORT}/api/v1/epics/${epic}/tasks/${epicTask.id}`,
      data: {
        task: {
          [name]: value
        }
      }
    });
  };

  handleAssign = (type, specialist_id) => {
    const {
      epicTask: { id, epic_id }
    } = this.props;
    let payload = {};

    if (type === "assign") {
      payload = {
        method: "PUT",
        url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/assign`,
        data: {
          specialist_id
        }
      };
    } else
      payload = {
        method: "DELETE",
        url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/remove/${specialist_id}`
      };

    axios(payload)
      .then(response => {
        this.setState({
          specialists: response.data.specialists,
          totalCost: response.data.cost
        });
      })
      .catch(error => console.log(error));
  };

  handleCost = specId => {
    const {
      epicTask: { id, epic_id },
      projectWithId,
      formValues
    } = this.props;
    axios({
      method: "PUT",
      url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/specialist_cost/${specId}`,
      data: {
        costs: {
          cost: formValues["EditTaskForm"].values["cost_spec_" + specId],
          project_id: projectWithId.id
        }
      }
    }).then(resp => {
      this.setState({ totalCost: resp.data.cost });
    });
  };

  render() {
    const {
      handleSubmit,
      projectTeam,
      epicTask: { attached_files, cost, specialist_tasks }
    } = this.props;
    const { specialists, totalCost } = this.state;

    const disabled = getUserRole() === S_REDGUY ? false : true;

    return (
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <h4 className="modalHeader">Epic </h4>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={10}>
              <Field
                name="name"
                label="Summary"
                className="transparent"
                component={RenderField}
                onKeyDown={e => console.log(e.keyCode)}
                onSelfSubmit={this.handleSubmit}
                validate={[maxLength80]}
                disabled={disabled}
              />
              <Field
                name="description"
                label="Description"
                className="transparent"
                component={RenderText}
                onSelfSubmit={this.handleSubmit}
                autoHeight
                disabled={disabled}
              />

              <Field
                name="user_story"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your user story here"
                label="User Story"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="deliverables"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your acceptance criterea here"
                label="Acceptance criteria"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="business_requirements"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your business requirements here"
                label="Business Requirements"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
              <Field
                name="business_rules"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your business rules here"
                label="Business Rules"
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />

              <Field
                name="notes"
                component={RenderText}
                autoHeight
                className="transparent"
                placeholder="Type your solution design here"
                label="Solution design"
                large
                onSelfSubmit={this.handleSubmit}
                disabled={disabled}
              />
            </Grid.Column>

            <Grid.Column computer={6}>
              <Grid padded="vertically" className="float">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Field
                      name="eta"
                      component={RenderDate}
                      type="date"
                      label="Estimate"
                      className="transparent clear estimate"
                      initData={this.props.epicTask.eta}
                      handleEtaForm={this.handleEtaForm}
                      disabled={disabled}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field
                      name="state"
                      label="Status"
                      placeholder="Select state"
                      className="transparent clear"
                      component={RenderSelectField}
                      options={taskStatuses}
                      selectOnBlur={false}
                      handleSubmit={this.handleSubmit}
                      fluid
                      disabled={disabled}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Field
                name="attached_files"
                type="text"
                label="Attach files"
                component={RenderFile}
                dropzone
                submitSucceeded={this.props.submitSucceeded}
                onSelfSubmit={this.handleSubmit}
                small
                disabled={disabled}
              />
              <div className="specialistsWrapper">
                {oneOfRoles(S_REDGUY) && (
                  <div className="totalCosts">
                    <p className="label">Total costs</p>
                    <span className="total">
                      ${<span>{formatCurrency(totalCost)}</span>}
                    </span>
                  </div>
                )}
                <div className="specialistsInnerWrapper">
                  {specialists.map((specialist, key) => (
                    <SpecialistTile
                      specialist={specialist}
                      // cost={specialist_tasks}
                      key={key}
                      index={key}
                      remove={this.removeSpecialist}
                      handleSubmit={this.handleCost}
                    />
                  ))}
                </div>
                {projectTeam && (
                  <AssignDropdown
                    label="Add assignee"
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
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    allProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics
  } = state;
  const { epicTask } = ownProps;
  const initialValues = { ...epicTask };

  initialValues.state = taskStatuses.find(
    status => status.enum === epicTask.state
  ).value;

  epicTask.specialist_tasks &&
    epicTask.specialist_tasks.forEach(
      ({ cost, specialist }) =>
        (initialValues["cost_spec_" + specialist.id] = cost)
    );

  return {
    allProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics,
    initialValues,
    formValues: state.form
  };
};

EditTaskForm = reduxForm({
  form: "EditTaskForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  touchOnChange: true
})(EditTaskForm);

export default connect(mapStateToProps, { showProjectTeam })(EditTaskForm);
