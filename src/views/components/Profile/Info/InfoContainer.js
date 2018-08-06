import { connect } from "react-redux";
import { profileOperations } from "@ducks/profile";
import { modalsOperations } from "@ducks/modals";

import Info from "./Info";

export default connect(
  ({ profile: { info } }) => ({
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
  }),
  {
    showUserData: profileOperations.showUserData,
    updateUserProfile: profileOperations.updateUserProfile,
    showSubmitErrorModal: modalsOperations.showSubmitErrorModal
  },
  (stateProps, dispatchProps, parentProps) => {
    return {
      ...stateProps,
      ...parentProps,
      ...dispatchProps
    };
  }
)(Info);
