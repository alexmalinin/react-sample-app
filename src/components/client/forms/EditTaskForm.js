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
import AssignDropdown from "../../layout/AssignDropdown";
import SpecialistTile from "../../layout/SpecialistTile";

class EditTaskForm extends Component {
  state = {
    specialists: this.props.epicTask.specialists
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
      .then(response =>
        this.setState({ specialists: response.data.specialists })
      )
      .catch(error => console.log(error));
  };

  render() {
    const {
      handleSubmit,
      projectTeam,
      epicTask: { attached_files }
    } = this.props;
    const { specialists } = this.state;

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
              />
              <Field
                name="description"
                label="Description"
                className="transparent"
                component={RenderText}
                onSelfSubmit={this.handleSubmit}
                autoHeight
              />
            </Grid.Column>

            <Grid.Column computer={6}>
              <Grid className="float">
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
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Field
                name="file"
                type="text"
                label="Attach files"
                component={RenderFile}
                dropzone
                submitSucceeded={this.props.submitSucceeded}
                small
              />
              <div className="specialistsWrapper">
                {projectTeam &&
                  projectTeam[0] && (
                    <AssignDropdown
                      label="Add assignee"
                      specialists={specialists}
                      allSpecialists={projectTeam[0].specialists}
                      handleAssign={this.handleAssign}
                      userType={[S_REDGUY]}
                      closeOnChange={false}
                      renderToModal
                    />
                  )}
                {specialists.map((specialist, key) => (
                  <SpecialistTile
                    specialist={specialist}
                    key={key}
                    index={key}
                    remove={this.removeSpecialist}
                  />
                ))}
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

  return {
    allProjects,
    projectTeam,
    changeUserType,
    projectWithId,
    allEpics,
    initialValues
  };
};

EditTaskForm = reduxForm({
  form: "EditTaskForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(EditTaskForm);

export default connect(mapStateToProps, { showProjectTeam })(EditTaskForm);
