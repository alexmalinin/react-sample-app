import { reduxForm } from "redux-form";

import CreateModuleForm from "./CreateModuleForm";

import { createEpicFetch, createEpic } from "@ducks/epics/actions";
import { displayError } from "@utilities";

const withForm = reduxForm({
  form: "CreateModuleForm",
  onSubmit: createEpicFetch,
  onSubmitSuccess: createEpic,
  onSubmitFail: displayError
});

export default withForm(CreateModuleForm);
