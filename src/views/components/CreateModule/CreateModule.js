import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import CreateModuleForm from "./CreateModuleForm";

import { createEpicFetch, epicCreated } from "@ducks/epics/actions";
import { showSubmitErrorModal } from "@ducks/modals/actions";

const mapDispatchToProps = {
  showSubmitErrorModal
};

const withForm = reduxForm({
  form: "CreateModuleForm",
  onSubmit: createEpicFetch,
  onSubmitSuccess: epicCreated,
  onSubmitFail: (error, dispatch, submitError, props) => {
    if (error) props.showSubmitErrorModal();
  }
});

export default connect(null, mapDispatchToProps)(withForm(CreateModuleForm));
