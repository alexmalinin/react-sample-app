import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { getUserData } from "@ducks/user/actions";
import { updateUserProfile } from "@ducks/profile/actions";
import { showSubmitErrorModal } from "@ducks/modals/actions";

import Info from "./Info";

const mapStateToProps = ({ user, profile: { info } }) => ({
  avatar: info.avatar,
  userRole: user.role,
  initialValues: {
    first_name: info.first_name,
    last_name: info.last_name,
    email: info.email,
    city: info.address && info.address.city,
    country: info.address && info.address.country,
    phone_number: info.phone_number,
    description: info.description,
    professional_experience_info: info.professional_experience_info
  },
  educations: info.educations,
  work_experiences: info.work_experiences
});

const mapDispatchToProps = {
  getUserData,
  updateUserProfile,
  showSubmitErrorModal
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
