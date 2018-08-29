import { reduxForm } from "redux-form";

import CreateModuleForm from "./CreateModuleForm";

import { createEpicFetch, epicCreated } from "@ducks/epics/actions";
import { displayError } from "@utilities";

const withForm = reduxForm({
  form: "CreateModuleForm",
  onSubmit: createEpicFetch,
  onSubmitSuccess: epicCreated,
  onSubmitFail: displayError
});

export default withForm(CreateModuleForm);
