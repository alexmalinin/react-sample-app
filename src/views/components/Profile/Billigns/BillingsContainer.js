import { connect } from "react-redux";

import { getUserData } from "@ducks/user/actions";
import { profileOperations } from "@ducks/profile";
import { modalsOperations } from "@ducks/modals";

import Billings from "./Billings";

export default connect(
  ({ profile: { info, billings } }) => ({
    initialValues: {
      ...billings
    },
    defaultTab: billings.billing_type,
    avatar: info.avatar
  }),
  {
    getUserData,
    updateBillings: profileOperations.updateBillings,
    showSubmitErrorModal: modalsOperations.showSubmitErrorModal
  },
  (stateProps, dispatchProps, parentProps) => {
    return {
      ...stateProps,
      ...parentProps,
      ...dispatchProps
    };
  }
)(Billings);
