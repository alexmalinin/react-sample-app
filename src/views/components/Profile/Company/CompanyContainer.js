import { connect } from "react-redux";

import { profileOperations } from "@ducks/profile";
import { industryOperations } from "@ducks/industries";
import { modalsOperations } from "@ducks/modals";

import Company from "./Company";

export default connect(
  ({ profile: { info, company }, industriesReducer: { industries } }) => ({
    initialValues: {
      name: company.name,
      company_address: company.company_address,
      website: company.website,
      number_of_employers: company.number_of_employers,
      country: company.country,
      city: company.city,
      segment: company.segment,
      industry: company.industry_area_id,
      registered_name: company.registered_name,
      tell_about: company.tell_about,
      abn_acn: company.tell_about
    },

    avatar: info.avatar,
    industries
  }),
  {
    showUserData: profileOperations.showUserData,
    updateCompany: profileOperations.updateCompany,
    showSubmitErrorModal: modalsOperations.showSubmitErrorModal,
    ...industryOperations
  },
  (stateProps, dispatchProps, parentProps) => {
    return {
      ...stateProps,
      ...parentProps,
      ...dispatchProps
    };
  }
)(Company);
