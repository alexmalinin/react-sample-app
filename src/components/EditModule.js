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
    const { projectId, currentEpic, showProjectEpic } = this.props;

    if (projectId && currentEpic) {
      showProjectEpic(+projectId, +currentEpic);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (+this.props.currentEpic !== +nextProps.currentEpic) {
      this.props.showProjectEpic(nextProps.projectId, nextProps.currentEpic);
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
    const { projectId, currentEpic } = this.props;

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}/epics/${currentEpic}`,
      data: {
        epic: {
          [name]: value
        }
      }
    });
  };

  deleteEpic = () => {
    const { projectId, currentEpic, epicName, history } = this.props;

    this.props.showConfirmationModal({
      type: "delete",
      message: `Are you sure you want to delete ${
        epicName ? `${epicName} module?` : "this module?"
      }`,
      callback: () => {
        this.props.deleteProjectEpic(projectId, currentEpic, () =>
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
      epicName,
      eta,
      costs
    } = this.props;

    return (
      <StyledEpicPage edit>
        <form onSubmit={handleSubmit}>
          <EditEpicForm
            projectId={projectId}
            epicName={epicName}
            submitting={submitting}
            handleSubmit={this.handleSubmit}
            costs={costs}
            deleteEpic={this.deleteEpic}
            handleEtaForm={this.handleEtaForm}
            eta={eta}
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
  const { showEpic } = state;

  return {
    projectId: ownProps.projectId,
    currentEpic: ownProps.currentEpic,
    eta: showEpic && showEpic.eta,
    costs: showEpic && showEpic.cost,
    epicName: showEpic && showEpic.name,
    initialValues: showEpic
  };
};

export default connect(mapStateToProps, {
  showProjectEpic,
  deleteProjectEpic,
  showConfirmationModal
})(EditModule);
