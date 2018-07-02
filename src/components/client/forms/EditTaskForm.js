import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm, change } from "redux-form";
import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import { Grid } from "semantic-ui-react";
import { showProjectTeam } from "../../../actions/actions";
import RenderText from "../../forms/renders/RenderText";
import RenderField from "../../forms/renders/RenderField";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import RenderSelectField from "../../forms/renders/RenderSelectField";
import axios from "axios";
import { PORT } from "../../../constants/constants";
import { S_REDGUY } from "../../../constants/user";
import { getUserRole, oneOfRoles } from "../../../helpers/functions";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";
import { maxLength80 } from "../../../helpers/validate";
import { formatCurrency } from "../../../helpers/validate";
import { Checkbox } from "react-semantic-redux-form/dist";

class EditTaskForm extends Component {
  state = {
    specialists: this.props.epicTask.specialists,
    totalCost: this.props.epicTask.cost,
    loadingFees: {
      dv_fee: false,
      sale_fee: false
    }
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
    debugger;
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
    debugger;
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
    debugger;
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
    })
      .then(resp => {
        this.setState({ totalCost: resp.data.cost });
      })
      .catch(error => console.error(error));
  };

  handleFees = (event, newVal, prevVal, name) => {
    const { change } = this.props;

    this.setState({
      loadingFees: {
        [name + "_loading"]: true
      }
    });

    this.handleSubmit(name, newVal)
      .then(resp => {
        change(name, resp.data[name]);
        this.setState({
          totalCost: resp.data.cost,
          loadingFees: {
            [name + "_loading"]: false
          }
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          [name + "_loading"]: false
        });
        change(name, prevVal);
      });
  };

  render() {
    const { handleSubmit, projectTeam, specialistData, ownCosts } = this.props;
    const {
      specialists,
      totalCost,
      dv_fee_loading,
      sale_fee_loading
    } = this.state;

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
                  <div className="totalCostWrapper">
                    <div className="totalCosts">
                      <p className="label">Total costs</p>
                      <span className="total">
                        <i className="icon-dollar-symbol" />
                        <span>{formatCurrency(totalCost)}</span>
                      </span>
                    </div>
                    <div className="fees">
                      <Field
                        name="dv_fee"
                        component={Checkbox}
                        label={<label>DV Fee 20%</label>}
                        disabled={dv_fee_loading}
                        onChange={this.handleFees}
                      />
                      <Field
                        name="sale_fee"
                        component={Checkbox}
                        label={<label>Sales Fee 30%</label>}
                        disabled={sale_fee_loading}
                        onChange={this.handleFees}
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`specialistsInnerWrapper ${
                    specialists.length > 3 ? "expanded" : ""
                  }`}
                >
                  {specialists.map((specialist, key) => (
                    <SpecialistTile
                      specialist={specialist}
                      key={key}
                      index={key}
                      specialistId={specialistData && specialistData.id}
                      ownCosts={ownCosts}
                      remove={this.removeSpecialist}
                      handleSubmit={this.handleCost}
                    />
                  ))}
                </div>
                {projectTeam && (
                  <AssignDropdown
                    label="Add assignee"
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
    allEpics,
    specialistData
  } = state;
  const { epicTask } = ownProps;
  const initialValues = { ...epicTask };
  let ownCosts = null;

  initialValues.state = taskStatuses.find(
    status => status.enum === epicTask.state
  ).value;

  epicTask.specialist_tasks &&
    epicTask.specialist_tasks.forEach(({ cost, specialist }) => {
      if (specialistData && specialistData.id === specialist.id) {
        ownCosts = cost;
      }
      initialValues["cost_spec_" + specialist.id] = cost;
    });

  return {
    specialistData,
    allProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics,
    initialValues,
    formValues: state.form,
    ownCosts
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
