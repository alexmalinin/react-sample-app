import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import Axios from "axios";
import EditEpicForm from "./forms/EditEpicForm";
import StyledEpicPage from "../styleComponents/StyledEpicPage";
import {
  showProjectEpic,
  deleteProjectEpic,
  showConfirmationModal
} from "../actions/actions";
import { PORT } from "../constants/constants";
import { run } from "../helpers/scrollToElement";

class EditModule extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    currentEpic: PropTypes.number.isRequired
  };

  componentWillMount() {
    this.clearFileds();
    run(0)();
  }

  componentDidMount() {
    const { projectId, epicId } = this.props;

    if (projectId && epicId) {
      this.updateEpic(+projectId, +epicId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (+this.props.currentEpic !== +nextProps.currentEpic) {
      this.updateEpic(nextProps.projectId, nextProps.epicId);
    }
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

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}/epics/${epicId}`,
      data: {
        epic: {
          [name]: value
        }
      }
    });
  };

  updateEpic = (project, epic) => {
    const { showProjectEpic } = this.props;

    showProjectEpic(project, epic);
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
      epicName,
      eta,
      costs
    } = this.props;

    return (
      <StyledEpicPage edit>
        <form onSubmit={handleSubmit}>
          <EditEpicForm
            projectId={projectId}
            epicId={epicId}
            epicName={epicName}
            submitting={submitting}
            handleSubmit={this.handleSubmit}
            costs={costs}
            deleteEpic={this.deleteEpic}
            handleEtaForm={this.handleEtaForm}
            eta={eta}
            updateEpic={this.updateEpic}
          />
        </form>
      </StyledEpicPage>
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

const mapStateToProps = (state, ownProps) => {
  const {
    showEpic,
    allEpics: { epics }
  } = state;
  const { currentEpic } = ownProps;
  const epic = epics && epics[currentEpic - 1];

  return {
    projectId: ownProps.projectId,
    currentEpic: ownProps.currentEpic,
    epicId: epic && epic.id,
    epicName: (showEpic && showEpic.name) || (epic && epic.name),
    eta: (showEpic && showEpic.eta) || (epic && epic.eta),
    costs: showEpic && showEpic.cost,
    initialValues: showEpic || epic
  };
};

export default connect(mapStateToProps, {
  showProjectEpic,
  deleteProjectEpic,
  showConfirmationModal
})(EditModule);
