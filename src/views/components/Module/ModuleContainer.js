import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import ModuleFrom from "./ModuleForm";
import { updateEpicFetch, epicUpdated } from "@ducks/epics/actions";

import { displayError } from "@utilities";
import { oneOfRoles } from "@views/utils/functions";
import { S_REDGUY, CUSTOMER } from "@utilities";
import { deleteEpicFetch } from "@ducks/epics/actions";

const withForm = reduxForm({
  form: "EditModuleForm",
  onSubmit: updateEpicFetch,
  onSubmitSuccess: epicUpdated,
  onSubmitFail: displayError,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
});

const mapStateToProps = (state, props) => {
  const { num } = props.match.params;
  const epicId = state.epics.allIds[num - 1];

  return {
    initialValues: state.epics.byId[epicId],
    hasPermission: oneOfRoles(state.user.role, CUSTOMER, S_REDGUY)
  };
};

const mapDispatchToProps = {
  deleteEpicFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withForm(ModuleFrom)
);

// Axios({
//   method: "PUT",
//   url: `${PORT}/api/v1/projects/${projectId}/epics/${epicId}`,
//   data: {
//     epic: {
//       [name]: value
//     }
//   }
// });
