import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, reset } from "redux-form";
import Axios from "axios";
import EditEpicForm from "./forms/EditEpicForm";
import StyledEpicPage from "../styleComponents/StyledEpicPage";
import {
  deleteProjectEpic,
  showConfirmationModal,
  showProjectEpic
} from "../actions/actions";
import { PORT } from "../constants/constants";
import { run } from "../helpers/scrollToElement";

class EditModule extends Component {
  componentWillMount() {
    this.clearFileds();
    run(0)();
  }

  clearFileds = () => {
    this.props.dispatch(reset("EditModuleForm"));
  };

  handleEtaForm = date => {
    this.props.dispatch(change("EditModuleForm", "eta", date));
    this.handleSubmit("eta", date);
  };

  handleSubmit = (name, value) => {
    const { projectId, epicId } = this.props;
    const token = localStorage.getItem("jwt_token");

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}/epics/${epicId}`,
      data: {
        epic: {
          [name]: value
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  deleteEpic = () => {
    const { projectId, epicId, epicName, history } = this.props;

    this.props.showConfirmationModal({
      type: "delete",
      message: `Are you sure you want to delete ${
        epicName ? `${epicName} module?` : "this module?"
      }`,
      callback: () => {
        this.props.deleteProjectEpic(projectId, epicId, () =>
          history.push(`/dashboard/project/${projectId}`)
        );
      }
    });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      projectId,
      epicId,
      showEpic: {
        epic: { name, cost, eta },
        loaded
      }
    } = this.props;

    return (
      loaded && (
        <StyledEpicPage edit>
          <form onSubmit={handleSubmit}>
            <EditEpicForm
              projectId={projectId}
              epicId={epicId}
              epicName={name}
              submitting={submitting}
              handleSubmit={this.handleSubmit}
              cost={cost}
              deleteEpic={this.deleteEpic}
              handleEtaForm={this.handleEtaForm}
              eta={eta}
              updateEpic={this.updateEpic}
            />
          </form>
        </StyledEpicPage>
      )
    );
  }
}

EditModule = reduxForm({
  form: "EditModuleForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(EditModule);

const mapStateToProps = state => {
  return {
    showEpic: state.showEpic,
    initialValues: state.showEpic.epic
  };
};

export default connect(mapStateToProps, {
  deleteProjectEpic,
  showConfirmationModal,
  showProjectEpic
})(EditModule);
