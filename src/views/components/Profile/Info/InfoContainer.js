import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { profileOperations } from "@ducks/profile";
import { getUserData } from "@ducks/user/actions";
import { modalsOperations } from "@ducks/modals";

import Info from "./Info";

const mapStateToProps = ({ profile: { info } }) => ({
  initialValues: {
    first_name: info.first_name,
    last_name: info.last_name,
    email: info.email,
    city: info.address && info.address.city,
    country: info.address && info.address.country,
    phone_number: info.phone_number,
    description: info.description || null,
    professional_experience_info: null
  },
  avatar: info.avatar,
  educations: info.educations,
  experiences: info.work_experiences
});

const mapDispatchToProps = {
  getUserData,
  updateUserProfile: profileOperations.updateUserProfile,
  showSubmitErrorModal: modalsOperations.showSubmitErrorModal
};

const withForm = reduxForm({
  form: "InfoForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {},
  onSubmitFail: (error, dispatch, submitError, props) => {
    if (error) props.showSubmitErrorModal();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Info));
