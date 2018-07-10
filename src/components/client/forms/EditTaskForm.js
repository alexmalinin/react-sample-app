import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Checkbox } from "react-semantic-redux-form/dist";
import { Form, Field, reduxForm, change } from "redux-form";
import axios from "axios";

import RenderDate from "../../forms/renders/RenderDate";
import RenderFile from "../../forms/renders/RenderFile";
import RenderText from "../../forms/renders/RenderText";
import RenderField from "../../forms/renders/RenderField";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import RenderSelectField from "../../forms/renders/RenderSelectField";
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";

import { minLength2, formatCurrency } from "../../../helpers/validate";
import { PORT } from "../../../constants/constants";
import { S_REDGUY } from "../../../constants/user";
import { getUserRole, oneOfRoles } from "../../../helpers/functions";

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
    this.props.setUpdated();
  };

  //TODO: apply thunk here

  handleSubmit = (name, value) => {
    const {
      epicTask: { id, epic_id }
    } = this.props;
    this.props.setUpdated();

    const token = localStorage.getItem("jwt_token");

    return axios({
      method: "PUT",
      url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}`,
      data: {
        task: {
          [name]: value
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  handleAssign = (type, specialist_id) => {
    const {
      epicTask: { id, epic_id }
    } = this.props;
    let payload = {};

    const token = localStorage.getItem("jwt_token");

    if (type === "assign") {
      payload = {
        method: "PUT",
        url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/assign`,
        data: {
          specialist_id
        },

        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    } else
      payload = {
        method: "DELETE",
        url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/remove/${specialist_id}`,

        headers: {
          Authorization: `Bearer ${token}`
        }
      };

    this.props.setUpdated();
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
    const token = localStorage.getItem("jwt_token");
    const {
      epicTask: { id, epic_id },
      epic: { project_id },
      formValues
    } = this.props;
    axios({
      method: "PUT",
      url: `${PORT}/api/v1/epics/${epic_id}/tasks/${id}/specialist_cost/${specId}`,
      data: {
        costs: {
          cost: formValues["EditTaskForm"].values["cost_spec_" + specId],
          project_id
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        this.setState({ totalCost: resp.data.cost });
        this.props.setUpdated();
      })
      .catch(error => console.error(error));
  };

  handleFees = (event, newVal, prevVal, name) => {
    const { change } = this.props;
    this.props.setUpdated();

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
    const {
      handleSubmit,
      projectTeam,
      specialistData,
      ownCosts,
      currentProjectTeam
    } = this.props;

    const {
      specialists,
      totalCost,
      dv_fee_loading,
      sale_fee_loading
    } = this.state;

    const disabled = getUserRole() === S_REDGUY ? false : true;

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
                    disabled={disabled}
                  />
                </Grid.Column>

                <Grid.Column>
                  <Field
                    name="state"
                    label="Status"
                    placeholder="Select state"
                    className="status inline-in-modal"
                    component={RenderSelectField}
                    options={taskStatuses}
                    handleSubmit={this.handleSubmit}
                    disabled={disabled}
                    search={false}
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
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    padded
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <div className="specialistsWrapper">
                    {oneOfRoles(S_REDGUY) && (
                      <div className="totalCostWrapper">
                        <div className="totalCosts">
                          <p className="label">Total costs</p>
                          <span className="total">
                            <i className="fas fa-dollar-sign" />
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
                    <div className="specialistsInnerWrapper">
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
                        allSpecialists={currentProjectTeam.filter(
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
                <Grid.Column computer={16}>
                  <Field
                    name="name"
                    label="Summary"
                    placeholder={
                      disabled ? "No summary" : "Type your summary here"
                    }
                    component={RenderField}
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    validate={[minLength2]}
                    disabled={disabled}
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="description"
                    component={RenderText}
                    label="Description"
                    placeholder={
                      disabled ? "No description" : "Type your description here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="user_story"
                    component={RenderText}
                    label="User Story"
                    placeholder={
                      disabled ? "No user story" : "Type your user story here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="deliverables"
                    component={RenderText}
                    label="Acceptance Criteria"
                    placeholder={
                      disabled
                        ? "No acceptance criterea"
                        : "Type your acceptance criterea here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="business_requirements"
                    component={RenderText}
                    label="Business Requirements"
                    placeholder={
                      disabled
                        ? "No business requirements"
                        : "Type your business requirements here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="business_rules"
                    component={RenderText}
                    label="Business Rules"
                    placeholder={
                      disabled
                        ? "No business rules"
                        : "Type your business rules here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>

                <Grid.Column computer={16}>
                  <Field
                    name="notes"
                    component={RenderText}
                    label="Solution Design"
                    placeholder={
                      disabled
                        ? "No solution design"
                        : "Type your solution design here"
                    }
                    className="transparent area"
                    onSelfSubmit={this.handleSubmit}
                    disabled={disabled}
                    autoHeight
                    large
                    padded
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { projectTeam, projectWithId, specialistData } = state;
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
    projectTeam,
    projectWithId,
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

export default connect(mapStateToProps)(EditTaskForm);
