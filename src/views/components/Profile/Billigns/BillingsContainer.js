import { connect } from "react-redux";

import { getUserData } from "@ducks/user/actions";
import { updateBillings } from "@ducks/profile/actions";
import { showSubmitErrorModal } from "@ducks/modals/actions";

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
    updateBillings,
    showSubmitErrorModal
  },
  (stateProps, dispatchProps, parentProps) => {
    return {
      ...stateProps,
      ...parentProps,
      ...dispatchProps
    };
  }
)(Billings);
